const { html } = require('@forgjs/noframework');

const ProjectCard = ({
  name, description, img, author, tags = [], isOpen,
}) => {
  const DomElement = html`
    <article>
      <img src="${img}">
      <h1>${isOpen ? '' : '<i class="icofont-shield-alt"></i>'} ${name}</h1>
      <p>
        <strong>@${author}</strong>
        ${description}
      </p>

      <p class="tags">
        ${tags.map(tag => html`<strong>${tag}</strong>`)}
      </p>
      
      <ul>
        <li><i class="icofont-hand-power"></i> Join</li>
        <li><i class="icofont-heart"></i> Like</li>
        <li><i class="icofont-book-mark"></i> Save</li>
      </ul>

    </article>
  `;

  return DomElement;
};


module.exports = ProjectCard;
