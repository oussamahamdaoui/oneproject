const { html, $ } = require('@forgjs/noframework');
const { Howl } = require('howler');
const EventHandler = require('../EventHandler');
const Notification = require('./Notification.component');

let notifications = [{
  type: 'message',
  title: 'New message',
  message: 'Oussama: Lorem ipsum dolor, fez colre calresrgi',
}, {
  type: 'project',
  title: 'New message',
  message: 'Oussama: Lorem ipsum dolor, fez colre calresrgi',
},
{
  type: 'message',
  title: 'New message',
  message: 'Oussama: Lorem ipsum dolor, fez colre calresrgi',
},
{
  type: 'message',
  title: 'New message',
  message: 'Oussama: Lorem ipsum dolor, fez colre calresrgi',
}].map(Notification);

const Notifications = () => {
  const DomElement = html`
      <section class="notifications">
      <h2><i class="icofont-alarm"></i>Notifications Feed <span>${notifications.length}</span></h2>
      <article>
        <ul>
          ${notifications}
        </ul>
      </article>
    </section>
  `;

  EventHandler.subscribe('notification-in', (type, title, message) => {
    const sound = new Howl({
      src: ['sounds/pop.wav'],
      volume: 0.1,
    });
    sound.play();
    const notification = Notification({ type, title, message });
    notifications.push(notification);
    $('ul', DomElement).prepend(notification);
    $('h2 > span', DomElement).innerHTML = notifications.length;
  });
  EventHandler.subscribe('notification-out', (notification) => {
    notifications = notifications.filter(e => e !== notification);
    $('h2 > span', DomElement).innerHTML = notifications.length;
  });


  return DomElement;
};

window.EventHandler = EventHandler;

module.exports = Notifications();
