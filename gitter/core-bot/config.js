var config = {
  // gitter settings for retrieving and sending messages
  gitter: { 
    // gitter token, can be retrieved from https://developer.gitter.im/apps
    token: '4d6a0c2f35cd4b465703a06419ace4367181e901',

    room: {
      // name of the gitter room, you want to retrieve and sendthe messages
      // name: 'bullgit'
      name: 'bullgit'
    },
    
    // custom webhook to send the gifs to the activity feed
    webhook: 'https://webhooks.gitter.im/e/4f820443a563f50f7694',
    
    // place, where gif should be sent
    // possibilities: activity, chat
    // if "chat" the message will be send from the user from whom the token is
    place: 'chat'

  },

  // Detect if the @/core trigger was told
  core : {
      regex: /^\@\/core/
  }
}
  

module.exports = config;

