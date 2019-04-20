import { config as dotenvConfig } from 'dotenv';
import sdk from 'matrix-js-sdk';
dotenvConfig();

const client = sdk.createClient(process.env.BASE_URL);

client.publicRooms((err, data) => {
  console.log(`Public Rooms: ${JSON.stringify(data)}`);
});
