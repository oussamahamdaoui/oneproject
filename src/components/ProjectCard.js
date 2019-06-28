const { html, $$ } = require('@forgjs/noframework');
const { formatDate } = require('../utils');

const ProjectCard = ({
  name, description, img, team = [], tags = [], isOpen, date = new Date(),
}) => {
  const DomElement = html`
    <article>
      <img src="${img}">
      <h1>${isOpen ? '<i class="icofont-unlocked"></i>' : '<i class="icofont-lock"></i>'} ${name}</h1>
      <p class="team">
        ${team.map(e => html`<strong class='${e.author ? 'author' : ''}'>@${e.name}</strong>`)}
      </p>
      <div class="creationDate">${formatDate(date, 'D/M/Y h:m')}</div>
      <p>
        ${description}
      </p>
      <p class="tags">
        ${tags.map(tag => html`<strong>${tag}</strong>`)}
      </p>
      <ul>
        <li class="join"><i class="icofont-hand-power"></i> Join</li>
        <li class="like"><i class="icofont-heart"></i> Like</li>
        <li class="save"><i class="icofont-book-mark"></i> Save</li>
      </ul>
    </article>
  `;

  $$('ul>li', DomElement).forEach(e => e.addEventListener('click', () => e.classList.toggle('selected')));

  DomElement.statics.isOpen = isOpen;
  DomElement.statics.date = date;

  return DomElement;
};


module.exports = ProjectCard;
