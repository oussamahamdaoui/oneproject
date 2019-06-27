const { html, $ } = require('@forgjs/noframework');
const Nav = require('./components/Navigation');
const Side = require('./components/Side');
const ProjectCard = require('./components/ProjectCard');


const projects = [{
  tags: ['Javascript', 'HTML'],
  isOpen: true,
  author: 'Oussama',
  name: 'Project One',
  img: 'https://cdn.dribbble.com/users/4859/screenshots/6515872/b-landing-dr.png',
  description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum quas perspiciatis veniam accusamus error nulla quasi sequi alias quibusdam praesentium? Atque itaque debitis vitae quaerat laborum magnam id delectus dolor.',
}, {
  tags: ['C#', 'C++'],
  author: 'Coco',
  name: 'Project Two',
  img: 'https://cdn.dribbble.com/users/25514/screenshots/6373241/scoot_urgent_mobile_support.png',
  description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum quas perspiciatis veniam accusamus error nulla quasi sequi alias quibusdam praesentium? Atque itaque debitis vitae quaerat laborum magnam id delectus dolor.',
},
{
  author: 'Krikri',
  name: 'Project Three',
  img: 'https://cdn.dribbble.com/users/426214/screenshots/6099634/building_analytics_website_2x.jpg',
  description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum quas perspiciatis veniam accusamus error nulla quasi sequi alias quibusdam praesentium? Atque itaque debitis vitae quaerat laborum magnam id delectus dolor.',
},
{
  author: 'Krikri',
  name: 'Project Three',
  img: 'https://cdn.dribbble.com/users/25514/screenshots/6373241/scoot_urgent_mobile_support.png',
  description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum quas perspiciatis veniam accusamus error nulla quasi sequi alias quibusdam praesentium? Atque itaque debitis vitae quaerat laborum magnam id delectus dolor.',
}];


const app = html`
<div class="app">
  ${Nav}
  <main>
    ${projects.map(ProjectCard)}
  </main>
  ${Side}
</div>
`;


$('body').appendChild(app);
