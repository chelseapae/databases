var Messages = {


  _data: {},

  items: function() {
    return _.chain(Object.values(Messages._data)).sortBy('createdAt');
  },

  add: function(message, callback = ()=>{}) {
    Messages._data[message.message_id] = message;
    callback(Messages.items());
  },

  update: function(messages, callback = ()=>{}) {

    var length = Object.keys(Messages._data).length;
    //messages = JSON.parse(messages)
    for (let message of messages) {
      console.log('INSIDEFORLOOP', message)
      Messages._data[message.message_id] = Messages._conform(message);
    }
    console.log('MESSAGES', Messages)
    // only invoke the callback if something changed
    if (Object.keys(Messages._data).length !== length) {
      callback(Messages.items());
    }
  },

  _conform: function(message) {
    console.log('MESSAGE', message);
    // ensure each message object conforms to expected shape
    message.text = message.text || '';
    message.username = message.username || '';
    message.roomname = message.roomname || '';
    return message;
  }

};
