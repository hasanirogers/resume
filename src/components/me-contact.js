import { LitElement, html } from '@polymer/lit-element';

import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-icons/communication-icons.js';
import '@polymer/paper-button/paper-button.js';

import './me-loading.js';

class MeContact extends LitElement {
  // static get properties() {
  //   return {
  //     fixed: { type: Boolean }
  //   }
  // }

  constructor() {
    super();

    this._host = this;
    this._isValid = false;
  }

  render() {
    return html `
      <style>
        label {
            font-size: 0;
            text-indent: -9999;
            visibility: hidden;
        }

        section {
            max-width: 960px;
            margin: 0 auto;
            padding-bottom: 1rem;
        }

        section > :first-child {
            margin-left: 2rem;
        }

        paper-input {
            width: 90%;
            text-align: left;
            --primary-text-color: #6e6c69;
        }

        iron-icon {
            color: $colorwhite;
            margin-right: 1rem;
            margin-bottom: 4px;
            transition: all 300ms ease;
        }

        iron-icon:hover {
            fill: var(--color-secondary);
        }

        textarea {
            color: #6e6c69;
            line-height: 1.5;
            width: 70%;
            height: 100%;
            height: 184px;
            margin: 1rem 2rem;
            padding: 1rem;
            border: 0;
            border-bottom: 1px solid #6e6c69;
            background: rgba(255, 255, 255, 0.05);
        }

        paper-button {
            letter-spacing: 1px;
            width: 80%;
            font-weight: bold;
            padding: 1.5rem;
            text-transform: unset;
            margin-bottom: 2rem;
            position: relative;
            border-radius: 4px;
            background: var(--color-secondary);
            transition: all 300ms ease;
        }

        paper-button:hover {
            background: #1d76c4;
        }

        me-loading {
          display: none;
        }

        .contact {
          color: var(--color-white);
          background: var(--color-black);
          text-align: center;
          padding-top: 2rem;
        }

        .contact__validation-message {
            font-weight: bold;
            color: var(--color-error);
            opacity: 0;
            transition: all 300ms ease;
        }

        .contact--loading paper-button span {
          visibility: hidden;
        }

        .contact--loading me-loading {
          display: block;
        }

        .contact--success paper-button {
          color: var(--color-white);
          background: var(--color-success);
        }

        .contact--error paper-button {
          color: var(--color-white);
          background: var(--color-error);
        }

        .contact--error .contact__validation-message {
          opacity: 1;
        }

        @media (min-width: 767px) {
          section {
            display: grid;
            grid-template-columns: 1fr 2fr;
          }

          textarea {
            width: 80%;
          }

          paper-input {
            width: 100%;
          }

          paper-button {
            width: 40%;
            margin: 1rem auto 2rem auto;
          }
        }
      </style>
      <form id="contact" class="contact" name="contact" method="post" action="contact">
        <section>
          <div>
            <p>
              <paper-input
                id="user" name="user"
                label="Your name"
                allowed-pattern="[\ a-zA-z]"
                error-message="Please enter your name."
                auto-validate
                required>
                <iron-icon icon="communication:contacts" slot="prefix"></iron-icon>
              </paper-input>
            </p>

            <p>
              <paper-input
                type="tel"
                id="phone"
                name="phone"
                label="Your phone number"
                allowed-pattern="[\-.0-9]"
                error-message="Enter a valid phone number."
                placeholder="ex: 555-555-5555"
                auto-validate
                required>
                <iron-icon icon="communication:phonelink-ring" slot="prefix"></iron-icon>
              </paper-input>
            </p>

            <p>
              <paper-input
                type="email"
                id="email"
                name="email"
                label="Your email"
                error-message="Enter a valid email address."
                auto-validate
                required>
                <iron-icon icon="communication:mail-outline" slot="prefix"></iron-icon>
              </paper-input>
            </p>
          </div>
          <div>
            <label for="message"><p>Message</p></label>
            <textarea id="message" name="message" placeholder="Message me maybe?" required></textarea>
          </div>
        </section>
        <p class="contact__validation-message"></p>
        <paper-button @click="${() => this._handleContact()}">
          <span>Send me your questions.</span>
          <me-loading></me-loading>
        </paper-button>
      </form>
    `
  }

  _handleContact() {
    this._validateForm();
    if (this._isValid) this._makeRequest();
  }

  _validateForm() {
    const form = this.shadowRoot.querySelector('form');
    const requiredFields = this.shadowRoot.querySelectorAll('[required]');
    const validationMsg = this.shadowRoot.querySelector('.contact__validation-message');

    Array.from(requiredFields).forEach(element => {
      this._validateElement(element);
    });

    if(!this._isValid) {
      validationMsg.innerHTML = 'Whoops. Looks like there\'s a problem with the fields. Please fill them all out correctly.';
      form.classList.add('contact--error');
    }
  }

  _validateElement(element) {
    const field = element.getAttribute('name');

    if (typeof element.value != 'undefined') {
      if (element.value.length > 2) {
        // specific fields

        // email field
        if (field == 'email') {
          if (element.value.indexOf('@') > 0) {
            this._isValid = true;
          }

        // phone field
        } else if (field == 'phone') {
          // todo: check for alpha characters

        // all others
        } else {
          this._isValid = true;
        }

      } else {
        this._isValid = false;
        element.classList.add('error');
      }
    }
  }

  _makeRequest() {
    const form = this.shadowRoot.querySelector('form');
    const submitBtn = form.querySelector('paper-button');
    const url = window.location.href + form.getAttribute('action');

    const formData = {
      user: form.querySelector('#user').value,
      phone: form.querySelector('#phone').value,
      email: form.querySelector('#email').value,
      message: form.querySelector('#message').value
    }

    const config = {
        method: 'POST',
        body: JSON.stringify(formData),
        headers:{
          'Content-Type': 'application/json'
        }
    }

    form.classList.add('contact--loading');
    submitBtn.setAttribute('disabled', true);
    submitBtn.setAttribute('aria-disabled', true);

    fetch(url, config)
      .then(response => response.text())
      .then(text => {
        try {
          const response = JSON.parse(text);

          if (response.code == 200) {
            this._contactSuccess(form);
          } else {
            this._contactError(form);
            console.log('We reached the server but an weren\'t successful in sending mail.', response);
          }
        } catch (error) {
          this._contactError(form);
          console.log('The data sent back from the server was not JSON. Likely a 404 happened.', error);
        }
      })
      .catch(error => {
        this._contactError(form);
        console.error('We hit some kind of network problem.', error);
      });
  }

  _contactSuccess(form) {
    const submitBtnMsg = form.querySelector('paper-button span');

    form.classList.remove('contact--loading');
    form.classList.remove('contact--error');
    form.classList.add('contact--success');
    submitBtnMsg.innerHTML = "Sweet. I got your message. I'll follow up soon."
    // change button to green then fade it out
  }

  _contactError(form) {
    const submitBtn = form.querySelector('paper-button');
    const validationMsg = form.querySelector('.contact__validation-message');

    form.classList.remove('contact--loading');
    form.classList.add('contact--error');
    submitBtn.removeAttribute('disabled');
    submitBtn.removeAttribute('aria-disabled');

    validationMsg.innerHTML = "Uh oh. I didn't get your email. Is your internet down? Did you enter a valid email? Try sending it again."
  }
}

customElements.define('me-contact', MeContact);
