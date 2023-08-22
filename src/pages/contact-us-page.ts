import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement("contact-us-page")
export class ContactUsPage extends LitElement {
  render() {

    return html `
      <h1>Contact Us Page</h1>      
    `;
  };
};

declare global {
  interface HTMLElementTagNameMap {
    "contact-us-page": ContactUsPage
  }
};