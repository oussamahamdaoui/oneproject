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
