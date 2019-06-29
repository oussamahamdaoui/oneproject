const { EventManager } = require('@forgjs/noframework');

const EventHandler = new EventManager();
window.EventHandler = EventHandler;

module.exports = EventHandler;
