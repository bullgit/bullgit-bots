var Gitter = require('node-gitter');
var request = require('request');

// get configuration infos from config.js file
// if non available, copy config.example.js and fill out the 
var config = require('./config.js');

var gitter = new Gitter(config.gitter.token);

function initBot() {
  // gitter room name from config gets joined, to recieve the room id on start
  gitter.rooms.join( config.gitter.room.name , function(err, room) {

    if (err) {
      console.log('Not possible to join the room: ', err);
      return;
    }
    
    config.gitter.room.id = room.id;
    
    // start the message listener
    listenToMessages();
    
    
  })
}
initBot();


function listenToMessages () {

  gitter.rooms.find(config.gitter.room.id).then(function(room) {

    var events = room.streaming().chatMessages();

    // The 'snapshot' event is emitted once, with the last messages in the room 
    events.on('snapshot', function(snapshot) {
      console.log(snapshot.length + ' messages in the snapshot');
    });

    // event gets called, when a new message gets written in the configured channel
    events.on('chatMessages', function(message) {

      // the bot only evaluates new messages, no updates or other changes
      if (message.operation === 'create') {

        var data = message.model;
        var text = data.text;
        
        // text contains the giphy command
        if (text.match(config.appear.regex)) {

          var feedcontent =  '🎥📞 : http://appear.in/' + makeid();

          send(feedcontent, room);

        }  if (text.match(config.appearbg.regex)) {

          var feedcontent =  '🎥📞 : http://appear.in/bullgit';

          send(feedcontent, room);

        } else {

            // ...
          }
          
        }
        
      });

  });

}

function send (message, room) {

  // switch, where the message should be sent
  switch (config.gitter.place) {
    case 'activity':  
    request.post(config.gitter.webhook).form({message: message});
    break;

    case 'chat':
    room.send(message);
    break;

    default:
    console.log(message);
    break;
  }
  
}

// Generate a custome room id 
function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 12; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


// To keep it awake ( on services like heroku )
setInterval(function() {
  try {
    initBot()
  }
  catch (e) {
    console.log(e);
  }
}, 60000* 60);