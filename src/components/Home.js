const { html } = require('@forgjs/noframework');
const EventHandler = require('../EventHandler');
const ProjectCard = require('./ProjectCard');
const Rooter = require('./Rooter');


const Home = () => {
  const DomElement = html`
    <main class="home">
    </main>
  `;

  let projects = [];
  const requestProjects = async () => {
    DomElement.innerHTML = '';
    const call = await fetch('/docs/mocks/getProjects.json');
    const resp = await call.json();
    projects = resp.items.map(ProjectCard);
    projects.forEach(p => DomElement.appendChild(p));
  };

  EventHandler.subscribe('filter-cards', async (filter) => {
    await requestProjects();
    projects.forEach((project) => {
      if (filter === 'Open' && !project.statics.isOpen) {
        project.classList.add('hide');
      } else {
        project.classList.remove('hide');
      }
    });
  });


  Rooter.onShow(DomElement, requestProjects);

  return DomElement;
};

module.exports = Home();
