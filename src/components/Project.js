const { html } = require('@forgjs/noframework');
const Rooter = require('./Rooter');
const ProjectCard = require('./ProjectCard');

const Project = () => {
  const DomElement = html`
    <main class="project">
      
    </main>
  `;

  Rooter.onShow(DomElement, async () => {
    const call = await fetch('/doc/__mocks__/getProjects.json');
    const project = (await call.json())[0];
    DomElement.appendChild(ProjectCard(project));
  });

  return DomElement;
};

module.exports = Project();
