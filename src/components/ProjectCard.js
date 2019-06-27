const { html, $$ } = require('@forgjs/noframework');

const ProjectCard = ({
  name, description, img, team = [], tags = [], isOpen,
}) => {
  const DomElement = html`
    <article>
      <img src="${img}">
      <h1>${isOpen ? '' : '<i class="icofont-shield-alt"></i>'} ${name}</h1>
      <p class="team">
        ${team.map(e => html`<strong class='${e.author ? 'author' : ''}'>@${e.name}</strong>`)}
      </p>
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

  return DomElement;
};


module.exports = ProjectCard;
