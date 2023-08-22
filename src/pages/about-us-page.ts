import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement("about-us-page")
export class AboutUsPage extends LitElement {
  render() {

    return html `
      <h1>About Us Page</h1>      
    `;
  };
};

declare global {
  interface HTMLElementTagNameMap {
    "about-us-page": AboutUsPage
  }
};