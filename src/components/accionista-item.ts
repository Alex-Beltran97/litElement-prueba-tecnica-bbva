import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// Types
import { IAccionista } from '../types';
import { CSSResultGroup } from 'lit';

@customElement("accionista-item")
export class AccionistaItem extends LitElement {
  
  static styles?: CSSResultGroup | undefined = css `
    :host {
      display: block;
      margin: 1em;
      padding: 1em;
      border: 1px solid black;  
      cursor: pointer;    
    }

    .item {
      font-size: 0.8em;
      display: block;
    }
    
    .item--name {
      color: steelblue;
    }

    .item--percentage {
      color: green;
    }
  `;

  @property({ type: Map })
  data: string = "";
  
  @property({ type: Boolean })
  clicked: boolean = false;
  
  render() {

    const data : IAccionista = JSON.parse(this.data);

    return html `
      <h2 class="item item--name">${ data.Nombre }</h2>
      <em class="item">CC. ${ data.Documento }</em>
      <em class="item item--percentage">Participación: ${ data.Porcentaje }</em>
    `;
  };
};

declare global {
  interface HTMLElementTanNameMap {
    "accionista-item": AccionistaItem
  }
};