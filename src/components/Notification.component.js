const { html, $ } = require('@forgjs/noframework');
const { Howl } = require('howler');
const EventHandler = require('../EventHandler');

const Notification = ({ type, title, message }) => {
  const TypeToClass = {
    project: 'icofont-ui-message',
    message: 'icofont-chat',
  };


  const DomElement = html`
    <li class="notification">
      <header>
        <i class=" ${type} ${TypeToClass[type]} "></i>
        <h3>${title}</h3>
        <i class="close icofont-close"></i>
      </header>
      <p>${message}</p>
    </li>
  `;


  $('.close', DomElement).addEventListener('click', (e) => {
    DomElement.classList.add('removing');
    EventHandler.emit('notification-out', DomElement, e);
    const sound = new Howl({
      src: ['sounds/remove-notification.wav'],
      volume: 0.1,
    });
    sound.play();
    setTimeout(() => {
      DomElement.parentNode.removeChild(DomElement);
    }, 300);
  });

  return DomElement;
};

module.exports = Notification;
