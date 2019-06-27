const { html, $ } = require('@forgjs/noframework');

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

  $('.close', DomElement).addEventListener('click', () => {
    DomElement.classList.add('removing');
    setTimeout(() => {
      DomElement.parentNode.removeChild(DomElement);
    }, 300);
  });

  return DomElement;
};

module.exports = Notification;
