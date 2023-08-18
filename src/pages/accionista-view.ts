import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { IAccionista } from '../types';

@customElement("accionista-view")
export class AccionistaView extends LitElement {
  
  static styles?: CSSResultGroup | undefined = css `
    h1 {
      text-align: center;
    }
  `;

  @property({ attribute: false })
  authUser : IAccionista = {
    NIT: "",
    TipoDocumento: "",
    Nombre: "",
    Documento: 0,
    Porcentaje: ""
  };

  constructor() {
    super();

    this.authUser = JSON.parse(sessionStorage.getItem("auth")!);
  };

  render() {

    return html `
      <accionista-list accionistas="${ this.authUser }"></accionista-list>
    `;
  };

};

declare global {
  interface HTMLElementTanNameMap {
    "accionista-view": AccionistaView
  }
};