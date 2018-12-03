import { LitElement, html } from '@polymer/lit-element';
import { iconGithub, iconCodepen, iconNpm, iconLinkedIn } from '../scripts/icons';

class MeSocial extends LitElement {
  static get properties() {
    return {
      main: {type: Boolean},
      header: {type: Boolean},
      fixed: {type: Boolean}
    }
  }

  constructor() {
    super();
  }

  render() {
    return html `
      <style>
        .social-media {
          list-style: none;
          margin: 0;
          padding: 0;

          display: flex;
          align-items: center;

        }

        a {
          color: var(--color-white);
        }

        li {
          flex: 0 0 auto;
        }

        li:not(:last-child) {
          margin-right: 1rem;
        }

        svg {
          width: 48px;
          height: 48px;
          transition: all ease 200ms;
        }

        svg:hover {
          fill: var(--colors-econdary);
          /* stroke: var(--color-white);
          stroke-width: 2px; */
        }

        :host([main]) .social-media {
          margin: 0 2rem;
          position: relative;
          top: 1rem;
        }

        :host([header]) .social-media {
          justify-content: space-around;
        }

        :host([header]) svg {
          width: 72px;
          height: 72px;
        }

        :host([fixed]) svg {
          width: 56px;
          fill: var(--color-white);
        }

        @media screen and (max-width: 767px) {
          :host([header]) {
            display: none;
          }
        }

        @media screen and (min-width: 768px) {
          :host([main]) {
            display: none;
          }
      }
      </style>
      <ul class="social-media">
        <li><a href="https://github.com/hasanirogers">${iconGithub}</a></li>
        <li><a href="https://codepen.io/hasanirogers">${iconCodepen}</a>
        </li>
        <li><a href="https://www.npmjs.com/~hasanirogers">${iconNpm}</a></li>
        <li><a href="https://www.linkedin.com/in/hasani-rogers-85523829">${iconLinkedIn}</a></li>
        <li><a href="https://twitter.com/hasanirogers"></a></li>
      </ul>
    `
  }
}

customElements.define('me-social', MeSocial);
