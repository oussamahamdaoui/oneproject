const { html } = require('@forgjs/noframework');
const Notification = require('./Notification');

const notifications = [{
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

const Side = () => {
  const DomElement = html`
    <aside>
      <h1 class="logo">One Project.</h1>
      <section>
        <h2><i class="icofont-files-stack"></i>My projects</h2>
        <ul>
          <li>Project Point</li>
          <li>ForgJst</li>
          <li>HoloColor</li>
          <li>KSM22</li>
        </ul>
      </section>

      <section class="notifications">
        <h2><i class="icofont-alarm"></i>Notifications Feed</h2>
        <article>
          <ul>
            ${notifications}
          </ul>
        </article>
      </section>
    </aside>
  `;

  return DomElement;
};

module.exports = Side();
