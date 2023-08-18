import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { authProcess } from '../utils';

@customElement("login-component")
export class LoginComponent extends LitElement {
  
  render() {

    return html `
      <form id="form" @submit="${ this.getFormData }">
        <fieldset>
          <legend>Inicio de sesion</legend>
          <div>
            <label for="docType">Tipo de documento</label>
            <select id="docType" name="docType">
              <option value="NIT" selected>NIT</option>
              <option value="CC">Cedula de ciudadania</option>
            </select>
          </div>
          <div>
            <label for="docNumber">Número de documento</label>
            <input type="number" id="docNumber" name="docNumber" placeholder="Ingrese su numero de documento aquí..." />
          </div>
          <button type="submit">Login</button>
        </fieldset>
      </form>
    `;
  };

  private getFormData(e: any) {

    e.preventDefault();

    const form = this.shadowRoot?.getElementById("form")! as unknown;

    const formData = new FormData(form as HTMLFormElement);

    const docType = String(formData.get("docType")!);
    const docNumber = +formData.get("docNumber")!;

    authProcess({ docType, docNumber });

  };

};

declare global {
  interface HTMLElementTanNameMap {
    "login-component": LoginComponent
  }
};