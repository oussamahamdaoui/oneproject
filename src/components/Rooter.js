const { EventManager } = require('@forgjs/noframework');

class Rooter {
  constructor() {
    this.pages = [];
    this.listener = new EventManager();
    this.RooterDomElements = [];

    window.onhashchange = () => {
      this.goTo(window.location.hash);
    };
  }

  onShow(element, fn) {
    this.listener.subscribe('rooter-change', (url, ele) => {
      if (ele === element) {
        fn(url);
      }
    });
  }

  goTo(url) {
    const nurl = url.replace('#', '');
    this.pages.forEach((e) => {
      if (e.func && e.func(nurl)) {
        this.listener.emit('rooter-change', nurl, e.element);
        // eslint-disable-next-line
        e.element.statics._show();
      } else {
        // eslint-disable-next-line
        e.element.statics._hide();
      }
    });
  }

  go(url) {
    this.pages = this.pages;
    window.location.hash = `#${url}`;
  }

  set(func, element) {
    // eslint-disable-next-line
    element.statics._hide = () => {
      // eslint-disable-next-line
      element.style.display = 'none';
    };

    // eslint-disable-next-line
    element.statics._show = () => {
      // eslint-disable-next-line
      element.style.display = null;
    };

    this.pages.push({
      func, element,
    });
    this.RooterDomElements.push(element);
    this.goTo(window.location.hash);
  }
}

module.exports = new Rooter();
