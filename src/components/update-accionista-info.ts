import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement("update-accionista-info")
export class UpdateAccionistaInfo extends LitElement {
  
  static styles?: CSSResultGroup | undefined = css `
    :host {
      display: block;
      background-color: steelblue;
      color: white;
      font-weight: 300;
      text-align: center;
      margin: 1em;
      padding: 0.5em;
      font-size: 0.8em;
    }
  `;

  render() {

    return html `
      <h2>❕</h2>
      <p>Recuerda que si deseas actualizar la información de los accionistas, deberas dirigirte a tu oficina o canal web.</p>
    `;
  };

};

declare global {
  interface HTMLElementTanNameMap {
    "update-accionista-info": UpdateAccionistaInfo
  }
};