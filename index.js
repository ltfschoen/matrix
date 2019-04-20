require('dotenv').config();

const sdk = require('matrix-js-sdk');
const client = sdk.createClient(process.env.BASE_URL);

client.publicRooms((err, data) => {
  console.log(`Public Rooms: ${JSON.stringify(data)}`);
});
