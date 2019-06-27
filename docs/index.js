(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// Selectors

/**
 *
 * @param {String} selector
 * @param {Node} element
 *
 * @return {Node}
 */

const $ = (selector, element = document) => element.querySelector(selector);

/**
 *
 * @param {String} selector
 * @param {Node} element
 *
 * @return {NodeList}
 */
const $$ = (selector, element = document) => {
  const ret = Array.from(element.querySelectorAll(selector));
  ret.addEventListener = (...params) => {
    ret.forEach(e => e.addEventListener(params));
  };
  return ret;
};


// templating

const allNodes = arr => Array.isArray(arr)
&& arr.reduce((acc, current) => acc && current instanceof Node, true);


/**
 *
 * @param {String} text
 *
 * @return {Node}
 */
const html = (text, ...stuff) => {
  let ht = '';
  text.forEach((part, index) => {
    if (allNodes(stuff[index])) {
      ht += part + stuff[index].map((e, i) => `<temp temp-id='${index}' arr-id="${i}"></temp>`).join('');
    } else if (!(stuff[index] instanceof Node)) {
      ht += stuff[index] ? part + stuff[index] : part;
    } else {
      ht += stuff[index] ? `${part}<temp temp-id='${index}'></temp>` : part;
    }
  });

  const template = document.createElement('template');
  template.innerHTML = ht.trim();
  const style = $('style', template.content);
  if (style) {
    html.style.textContent += style.textContent.trim();
  }
  const ret = template.content.firstChild;
  ret.statics = {};
  ret.events = {};
  $$('temp', ret).forEach((e) => {
    const id = parseInt(e.getAttribute('temp-id'), 10);
    const arrId = parseInt(e.getAttribute('arr-id'), 10);
    const target = stuff[id][arrId] ? stuff[id][arrId] : stuff[id];
    e.parentElement.replaceChild(target, e);
  });
  return ret;
};

html.style = document.createElement('style');
document.head.appendChild(html.style);

// EventManager

class EventManager {
  constructor() {
    this.events = {};
  }

  /**
   *
   * @param {String} eventName
   * @param {Function} callback
   */

  unsubscribe(eventName, callback) {
    this.events[eventName] = this.events[eventName].filter(e => e !== callback);
  }

  /**
   *
   * @param {String} eventName
   * @param {Function} callback
   */

  subscribe(eventName, callback) {
    this.events[eventName] = this.events[eventName] ? this.events[eventName] : [];
    this.events[eventName].push(callback);
  }

  /**
   *
   * @param {String} eventName
   */
  clearEvent(eventName) {
    delete this.events[eventName];
  }

  /**
   *
   * @param {String} eventName
   * @param {any} params
   */


  emit(eventName, ...params) {
    this.events[eventName] = this.events[eventName] ? this.events[eventName] : [];
    this.events[eventName].forEach((callback) => {
      callback(...params);
    });
  }
}

// event helpers

/**
 *
 * @param {Number} keyCode
 * @return {Function}
 *
 */

const only = keyCode => fn => (evt) => {
  if (evt.keyCode === keyCode) {
    fn(evt);
  }
};

const backspace = only(8);
const tab = only(9);
const enter = only(13);
const shift = only(16);
const ctrl = only(17);
const alt = only(18);
const esc = only(27);
const left = only(37);
const up = only(38);
const right = only(39);
const down = only(40);


const inOutQuad = (n) => {
  // eslint-disable-next-line
  n *= 2;
  if (n < 1) return 0.5 * n * n;
  // eslint-disable-next-line
  return -0.5 * (--n * (n - 2) - 1);
};

// other

/**
 *
 * @param {Node} element Element to scroll
 * @param {Number} to height to scroll to
 * @param {Number} duration duration in ms
 */

const smoothScrollTo = (element, to, duration) => {
  const start = element.scrollTop;
  const change = to - start;
  const startDate = +new Date();

  const easeInOutQuad = (t, b, c, d) => {
    // eslint-disable-next-line no-param-reassign
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    // eslint-disable-next-line no-param-reassign
    t -= 1;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };

  const animateScroll = () => {
    const currentDate = +new Date();
    const currentTime = currentDate - startDate;
    // eslint-disable-next-line no-param-reassign
    element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration), 10);
    if (currentTime < duration) {
      requestAnimationFrame(animateScroll);
    } else {
      // eslint-disable-next-line no-param-reassign
      element.scrollTop = to;
    }
  };
  animateScroll();
};

/**
 *
 * @param {Number} from
 * @param {Number} to
 * @param {Number} duration in ms
 * @param {Function} callback function to call on each frame
 * @param {*} easeFunction default inOutQuad
 */

const startAnimation = (
  from = 20,
  to = 300,
  duration = 1000,
  callback,
  easeFunction = inOutQuad,
) => {
  let stop = false;
  let start = null;
  const draw = (now) => {
    if (stop) return;
    if (now - start >= duration) stop = true;
    const p = (now - start) / duration;
    const val = easeFunction(p);
    const x = from + (to - from) * val;
    callback(x);
    requestAnimationFrame(draw);
  };
  const startAnim = (timeStamp) => {
    start = timeStamp;
    draw(timeStamp);
  };

  requestAnimationFrame(startAnim);
};

// Date

/**
 *
 * @param {Date} d1
 * @param {Date} d2
 *
 * @return {Boolean}
 */
const sameDay = (d1, d2) => d1.getFullYear() === d2.getFullYear()
    && d1.getMonth() === d2.getMonth()
    && d1.getDate() === d2.getDate();

/**
 * @param {Date} d the Date
 * @return {Date[]} List with date objects for each day of the month
 */
const getDaysInMonth = (d = new Date()) => {
  const month = d.getMonth();
  const year = d.getFullYear();
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};


module.exports = {
  $,
  $$,
  html,
  EventManager,
  smoothScrollTo,
  only,
  KEYS: {
    backspace,
    tab,
    enter,
    shift,
    ctrl,
    alt,
    esc,
    left,
    up,
    right,
    down,
  },
  DATE: {
    sameDay,
    getDaysInMonth,
  },
  startAnimation,
  ANIMATION_FUNCTIONS: {
    inOutQuad,
  },
};

},{}],2:[function(require,module,exports){
const { html, $$, $ } = require('@forgjs/noframework');

const Nav = () => {
  const DomElement = html`
    <nav>

      <input placeholder="Search..." type="text">
      <button class="search"><i class="icofont-search"></i>Search</button>
      <ul>
        <li class="selected">New</li>
        <li>Best</li>
        <li>Based on your skils</li>
        <li>Open</li>
      </ul>
    </nav>
  `;

  $$('li', DomElement).forEach((link) => {
    link.addEventListener('click', () => {
      $('li.selected', DomElement).classList.remove('selected');
      link.classList.add('selected');
    });
  });
  return DomElement;
};

module.exports = Nav();

},{"@forgjs/noframework":1}],3:[function(require,module,exports){
const { html, $ } = require('@forgjs/noframework');

const Notification = ({ type, title, message }) => {
  const TypeToClass = {
    project: 'icofont-ui-message',
    message: 'icofont-chat',
  };


  const DomElement = html`
    <li class="notification">
      <header>
        <i class=" ${type} ${TypeToClass[type]} "></i>
        <h3>${title}</h3>
        <i class="close icofont-close"></i>
      </header>
      <p>${message}</p>
    </li>
  `;

  $('.close', DomElement).addEventListener('click', () => {
    DomElement.classList.add('removing');
    setTimeout(() => {
      DomElement.parentNode.removeChild(DomElement);
    }, 300);
  });

  return DomElement;
};

module.exports = Notification;

},{"@forgjs/noframework":1}],4:[function(require,module,exports){
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

},{"@forgjs/noframework":1}],5:[function(require,module,exports){
const { html } = require('@forgjs/noframework');
const Notification = require('./Notification');

const notifications = [{
  type: 'message',
  title: 'New message',
  message: 'Oussama: Lorem ipsum dolor, fez colre calresrgi',
}, {
  type: 'project',
  title: 'New message',
  message: 'Oussama: Lorem ipsum dolor, fez colre calresrgi',
},
{
  type: 'message',
  title: 'New message',
  message: 'Oussama: Lorem ipsum dolor, fez colre calresrgi',
},
{
  type: 'message',
  title: 'New message',
  message: 'Oussama: Lorem ipsum dolor, fez colre calresrgi',
}].map(Notification);

const Side = () => {
  const DomElement = html`
    <aside>
      <h1 class="logo">One Project.</h1>
      <section>
        <h2><i class="icofont-files-stack"></i>My projects</h2>
        <ul>
          <li>Project Point</li>
          <li>ForgJst</li>
          <li>HoloColor</li>
          <li>KSM22</li>
        </ul>
      </section>

      <section class="notifications">
        <h2><i class="icofont-alarm"></i>Notifications Feed</h2>
        <article>
          <ul>
            ${notifications}
          </ul>
        </article>
      </section>
    </aside>
  `;

  return DomElement;
};

module.exports = Side();

},{"./Notification":3,"@forgjs/noframework":1}],6:[function(require,module,exports){
const { html, $ } = require('@forgjs/noframework');
const Nav = require('./components/Navigation');
const Side = require('./components/Side');
const ProjectCard = require('./components/ProjectCard');


const projects = [{
  team: [{ name: 'PH', author: true }, { name: 'Koko' }, { name: 'Krikri' }],
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
  team: [{ name: 'Pierre Haricot' }, { name: 'Coco', author: true }, { name: 'Krikri' }],
  author: 'Krikri',
  name: 'Project Three',
  img: 'https://cdn.dribbble.com/users/426214/screenshots/6099634/building_analytics_website_2x.jpg',
  description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum quas perspiciatis veniam accusamus error nulla quasi sequi alias quibusdam praesentium? Atque itaque debitis vitae quaerat laborum magnam id delectus dolor.',
},
{
  team: [{ name: 'Pierre Haricot' }, { name: 'La porte', author: true }, { name: 'DEVELOPPER' }, { name: 'DEVELOPPER' }],
  author: 'Krikri',
  name: 'Project Three',
  isOpen: true,
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

},{"./components/Navigation":2,"./components/ProjectCard":4,"./components/Side":5,"@forgjs/noframework":1}]},{},[6]);
