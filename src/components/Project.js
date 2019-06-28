const { html } = require('@forgjs/noframework');
const Rooter = require('./Rooter');

const Project = () => {
  const DomElement = html`
    <main class="project">
      
    </main>
  `;

  Rooter.onShow(DomElement, async () => {
    const call = await fetch('/src/__mocks__/getProjects.json');
    const projects = await call.json();
  });

  return DomElement;
};

module.exports = Project();
