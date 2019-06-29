const { html } = require('@forgjs/noframework');

const ProjectArticle = (props) => {
  const {
    name, description, img,
  } = props;

  const DomElement = html`
  <article>
    <h1>${name}</h1>
    <img src="${img}">
    <p>${description}</p>
  </article>
  `;

  return DomElement;
};


module.exports = ProjectArticle;
