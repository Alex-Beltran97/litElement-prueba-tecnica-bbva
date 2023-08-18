import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { IAccionista } from '../types';

// Utils
import { generarColorRGB, getNameInitials, isCompany } from '../utils';
import { getAccionistas } from '../actions/accionistas.action';

@customElement("accionista-detail")
export class AccionistaDetail extends LitElement {
  
  static styles?: CSSResultGroup | undefined = css `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .avatar {
      display: grid;
      align-items: center;
      width: 56px;
      height: 56px;
      background-color: green;
      color: white;
      border-radius: 50%
    }

  `;

  constructor() {
    super();

    this.getAccionista();
  };

  @property()
  mySubject : IAccionista = {
    NIT: "",
    Nombre: "",
    TipoDocumento: "",
    Documento: 0,
    Porcentaje: ""
  };

  render() {

    return html `
      <div class="entity-detail">
        ${ this.renderIcon(this.mySubject?.Nombre) }
        <h2>${ this.mySubject?.Nombre }</h2>
      </div>
      <form>
        <fieldset>
          <legend>INFORMACIÓN SOBRE EL MIEMBRO</legend>
          <div>
            <label for="docType">Tipo de documento</label>
            <select id="docType" name="docType">
              <option value="CC">Cédula de ciudadania</option>
              <option value="NIT">NIT</option>
            </select>
          </div>
          <div>
            <label for="docType">Numero de identificacion</label>
            <input type="number" value="${ this.mySubject.Documento }" />
          </div>
          <div>
            <label for="docType">Numero de identificacion</label>
            <input type="number" value="${ this.mySubject.Documento }" />
          </div>
          ${ this.renderNameForm(this.mySubject.Nombre) }
          <div>
            <label for="participationPercentage">Participación:</label>
            <input type="text" id="participationPercentage" name="participationPercentage" value="${ this.mySubject.Porcentaje }" />
          </div>
        </fieldset>
      </form>
    `;
  };

  private renderIcon(name: string) {

    return html `
      <p class="avatar">${ isCompany(name) ? "🏢" : getNameInitials(name) }</p>      
    `;
  };

  private renderNameForm(name: string) {

    const peopleName = name.split(" ");

    const formCompany = html `
      <div>
        <label for="companyName">Razón social</label>
        <input type="text" id="companyName" name="companyName" value="${ name }" />
      </div>
      `;
      
      const formPeople = html `
      <div>
        <label for="firstName">Nombre</label>
        <input type="text" id="firstName" name="firstName" value="${ peopleName[0] }" />
      </div>
      <div>
        <label for="lastName">Apellido</label>
        <input type="text" id="lastName" name="lastName" value="${ peopleName[1] }" />
      </div>
    `;

    return html `
      <div>${ isCompany(name) ? formCompany : formPeople }</div>      
    `;
  };

  private async getAccionista() {

    const url = new URL(location.href);
    const params = new URLSearchParams(url.search);

    const docNumber = params.get("selected");

    try {
      const { data } : { data: IAccionista[] } = await getAccionistas();
      this.mySubject = data.find( (accionista: IAccionista)=> accionista.Documento !== +docNumber!)!;

    } catch (err) {
      console.error(err);
    };
  };

};

declare global {
  interface HTMLElementTanNameMap {
    "accionista-detail": AccionistaDetail
  }
};