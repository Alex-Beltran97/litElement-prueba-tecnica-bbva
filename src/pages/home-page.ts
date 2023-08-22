import { CSSResultGroup, LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// Actions
import { getAccionistasData } from '../actions/accionistas.action';
import { Accionista } from '../types';

// Components
import '../components/accionista-card';

@customElement("home-page")
export class HomePage extends LitElement {
  
  static styles?: CSSResultGroup | undefined = css `
    :host {
      font-size: 0.8rem;
    }

    h1 {
      font-size: 1.2em;
    }
  `;

  @property({attribute: false})
  accionistas: Accionista[] | undefined = [];
  
  constructor() {
    super();

    this.getAccionistasData();
  };

  private header() {
    return html `
      <h1>
        ACCIONISTAS
        <span>(2 of 3)</span>
      </h1>  
    `;
  }

  private description() {
    return html `
    <strong>
      Esta es la informacion sobre los accionistas de tu empresa.
    </strong>
    `
  };
  
  public render() {

    return html `
      ${ this.header() }
      ${ this.description() }
      ${ this.accionistas?.map((accionista: Accionista)=>
        html `<accionista-card accionista="${ JSON.stringify(accionista) }"></accionista-card>`)
      }
    `;
  };

  private async getAccionistasData () {
    try {
      const data = await getAccionistasData();
      this.accionistas = data;
    } catch (err) {
      console.error(err);
    };
  };
};

declare global {
  interface HTMLElementTagNameMap {
    "home-page": HomePage
  }
};