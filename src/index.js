
import { config as dotenvConfig } from 'dotenv';
import sdk from 'matrix-js-sdk';

import Bot from './methods';

dotenvConfig();

const client = sdk.createClient(process.env.BASE_URL);

client.publicRooms((err, data) => {
  if (err) return console.log('Error loading public rooms', err);

  console.log(`Public Rooms: ${JSON.stringify(data)}`);
});

client.login(
  'm.login.password',
  {
    user: process.env.MATRIX_USERNAME,
    password: process.env.MATRIX_PASSWORD,
  },
  (err, data) => {
    if (err) { console.log('Error logging into matrix:', err); }
    console.log(`Logged in ${data.user_id} on device ${data.device_id}`);

    client.startClient(0);
    console.log('Started client');

    /**
     * Event listeners for message events emitted from a room's timeline
     */
    client.on('Room.timeline', function(event, room, toStartOfTimeline) {
      if (event.getType() !== 'm.room.message') {
        return; // only use messages
      }

      console.log('Received event: ', event.event);
      console.log('Received event sender: ', event.sender);

      const options = {};

      const bot = new Bot(options);

      bot.handleNewMember(
        event,
        room,
        toStartOfTimeline,
        client,
        privateRooms
      );
    });

    /**
     * Wait until sync state is 'PREPARED' before sending messages to the room.
     */
    client.once('sync', function(state, prevState, res) {
      if(state === 'PREPARED') {
        console.log('Detected that client sync state is prepared.');

        const content = {
          'body': 'message text',
          'msgtype': 'm.text'
        };

        // Hard-code the room id where a bot has been setup for testing in Matrix Riot
        const roomId = '!KPhFUARUOOHcIXayFS:matrix.parity.io';

        client.sendEvent(roomId, 'm.room.message', content, '', (err, res) => {
          if (err) { console.log(err) };

          console.log(`Sent message with event id ${res.event_id}`);
        });
      } else {
        console.log('Unable to establish client sync state', state);
        process.exit(1);
      }
    });
  }
);
