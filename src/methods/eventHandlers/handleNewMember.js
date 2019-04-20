// const {
//   messages
// } = require('./constants');

function handleNewMember(
  event,
  room,
  toStartOfTimeline,
  client,
  privateRooms
) {
  // if (
  //   event.event.membership === 'join' &&
  //   (!event.event.unsigned.prev_content ||
  //     event.event.unsigned.prev_content.membership === 'invite')
  // ) {
  //   const user = event.getSender();
  //   const room = event.getRoomId();

  //   let roomMessages = messages[room];

  //   if (roomMessages && checkUser(user)) {
  //     handleWelcome(
  //       room,
  //       user,
  //       client,
  //       privateRooms,
  //       roomMessages.externalMsg,
  //       roomMessages.internalMsg
  //     );
  //   }
  // }
};

// function handleWelcome(
//   room,
//   user,
//   client,
//   privateRooms,
//   externalMsg,
//   internalMsg
// ) {
//   if (typeof externalMsg === 'string') {
//     sendMessage(externalMsg, user, client, room);
//   }
//   if (typeof internalMsg === 'string') {
//     sendInternalMessage(internalMsg, user, client, privateRooms);
//   } else if (typeof internalMsg === 'object') {
//     if (
//       !privateRooms[user] ||
//       (privateRooms[user] && !privateRooms[user].welcoming)
//     ) {
//       sendNextQuestion(-1, internalMsg, user, privateRooms, client, room);
//     }
//   }
// }

export default handleNewMember;
