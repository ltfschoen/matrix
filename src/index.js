
import EventEmitter from 'events';
import { config as dotenvConfig } from 'dotenv';
import sdk from 'matrix-js-sdk';

import {
  handleNewMember
} from './methods/eventHandlers';

dotenvConfig();

let hasCalledInitBot = false;

class BotApp extends EventEmitter {
  constructor (options) {
    super();

    if (hasCalledInitBot) {
      this.emit(
        'error',
        new Error('Unable to initialise BotApp more than once')
      );
    }

    this.options = options;
  }

  run() {
    this.matrix = sdk.createClient(process.env.BASE_URL);

    this.matrix.publicRooms((err, data) => {
      if (err) return console.log('Error loading public rooms', err);

      console.log(`Public Rooms: ${JSON.stringify(data)}`);
    });

    this.matrix.login(
      'm.login.password',
      {
        user: process.env.MATRIX_USERNAME,
        password: process.env.MATRIX_PASSWORD,
      },
      (err, data) => {
        const { matrix } = this;
        const that = this;
        if (err) { console.log('Error logging into matrix:', err); }
        console.log(`Logged in ${data.user_id} on device ${data.device_id}`);
    
        this.matrix.startClient(0);
        console.log('Started Matrix client');
    
        /**
         * Event listeners for message events emitted from a room's timeline
         */
        matrix.on('Room.timeline', function(event, room, toStartOfTimeline) {
          if (event.getType() !== 'm.room.message') {
            return; // only use messages
          }
    
          console.log('Received event: ', event.event);
          console.log('Received event sender: ', event.sender);
    
          const privateRooms = {};
    
          that.handleNewMember();

          // bot.handleNewMember(
          //   event,
          //   room,
          //   toStartOfTimeline,
          //   this.matrix,
          //   privateRooms
          // );
        });
    
        /**
         * Wait until sync state is 'PREPARED' before sending messages to the room.
         */
        matrix.once('sync', function(state, prevState, res) {
          if (state === 'PREPARED') {
            console.log('Detected that client sync state is prepared.');
    
            const content = {
              'body': 'message text',
              'msgtype': 'm.text'
            };
    
            // Hard-code the room id where a bot has been setup for testing in Matrix Riot
            const roomId = '!KPhFUARUOOHcIXayFS:matrix.parity.io';
    
            matrix.sendEvent(roomId, 'm.room.message', content, '', (err, res) => {
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
  }
  
  handleNewMember() {
    return;
    // handleNewMember(this);
  }
}

var botApp = new BotApp();

botApp.run();
