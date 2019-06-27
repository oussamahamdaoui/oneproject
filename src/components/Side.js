const { html } = require('@forgjs/noframework');

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
          
        </article>
      </section>
    </aside>
  `;

  return DomElement;
};

module.exports = Side();
