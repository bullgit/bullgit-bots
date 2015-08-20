var Gitter = require('node-gitter');
var request = require('request');

var config = require('./config.js');

var gitter = new Gitter(config.gitter.token);


function initBot() {
    gitter.rooms.join( config.gitter.room.name , function(err, room) {

      if (err) {
        console.log('Not possible to join the room: ', err);
        return;
      }

      config.gitter.room.id = room.id;

  listenToMessages();

  })
}
initBot()

function listenToMessages () {

  gitter.rooms.find(config.gitter.room.id).then(function(room) {

    var events = room.streaming().chatMessages();

    events.on('snapshot', function(snapshot) {
      console.log(snapshot.length + ' messages in the snapshot');
    });

    events.on('chatMessages', function(message) {

      if (message.operation === 'create') {

        var data = message.model;
        var text = data.text;

        if (text.match(config.wiki.regex)) {

          var feedcontent =  'https://'+'github.com/bullgit/wiki/wiki/'+text.replace('/wiki ','').replace(/ /g,"_");

          send(feedcontent, room);

        } else {

          }

        }

      });

});

}

// Send function
function send (message, room) {

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

