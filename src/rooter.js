const rooter = require('./components/Rooter');
const Home = require('./components/Home');
const Project = require('./components/Project');

rooter.set(
  url => url === '',
  Home,
);

rooter.set(
  url => /project\?q=/.test(url),
  Project,
);

module.exports = rooter;
