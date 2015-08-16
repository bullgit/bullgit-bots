var config = {

  // gitter settings for retrieving and sending messages
  gitter: {
    // gitter token, can be retrieved from https://developer.gitter.im/apps
    token: 'YOUR_GITTER_TOKEN',
      room: {
      // name of the gitter room, you want to retrieve and sendthe messages
      name: 'ROOM_NAME'
    },
    
    // custom webhook to send the gifs to the activity feed
    webhook: 'WEBHOOK_URL',
    
    // place, where gif should be sent
    // possibilities: activity, chat
    // if "chat" the message will be send from the user from whom the token is
    place: 'chat'

  },

  // Trigger the official bullgit room
  appearbg : {
      regex: /^\/bgappear/
  },

  // Trigger a custom room
  appear: {
      regex: /^\/appear/
  }
  
}

module.exports = config;

  
