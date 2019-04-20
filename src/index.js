import { config as dotenvConfig } from 'dotenv';
import sdk from 'matrix-js-sdk';
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
  }
);