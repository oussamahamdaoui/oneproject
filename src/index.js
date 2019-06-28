const { html, $ } = require('@forgjs/noframework');
const Nav = require('./components/Navigation');
const Side = require('./components/Side');
const { RooterDomElements } = require('./rooter');


const app = html`
<div class="app">
  ${Nav}
  ${RooterDomElements}
  ${Side}
</div>
`;


$('body').appendChild(app);
