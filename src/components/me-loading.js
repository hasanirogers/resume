import { LitElement, html } from '@polymer/lit-element';

class MeLoading extends LitElement {
  render() {
    return html `
      <style>
        :host {
          position: absolute;
        }

        .spinner {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 6px solid #EEEEEE;
          border-top-color: #BFBFBF;
          border-bottom-color: #BFBFBF;
          animation: spinner 2.5s infinite ease-in-out;
        }

        @keyframes spinner {
          0% {
              transform: rotate(0deg);
          }
          100% {
              transform: rotate(540deg);
          }
        }
      </style>
      <div class="spinner"></div>
    `
  }
}

customElements.define('me-loading', MeLoading)
