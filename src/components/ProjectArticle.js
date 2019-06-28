const { html } = require('@forgjs/noframework');

const ProjectArticle = (props) => {
  const {
    name, description, img, team = [], tags = [], isOpen, date = new Date(),
  } = props;

  const DomElement = html`
  <article>
    <h1>${name}</h1>
    <img src="${img}">
    <p>${description}</p>
  </article>
  `;
};


module.exports = ProjectArticle;
