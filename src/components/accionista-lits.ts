import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// Components
import './accionista-item';
import './update-accionista-info';

// Actions
import { getAccionistas } from '../actions/accionistas.action';

// Types
import { IAccionista } from '../types';
import { CSSResultGroup } from 'lit';
import { sortByPercentage } from '../utils';

@customElement("accionista-list")
export class AccionistaList extends LitElement {
  
  static styles?: CSSResultGroup | undefined = css `
    .quit {
      position: absolute;
      top: 0;
      right: 1rem;
      cursor: pointer;
    }

    .pagination {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1rem;
    }

    .pagination span {
      cursor: pointer;
    }

  `;

  @property({ attribute: false})
  accionistas: IAccionista[] = [];

  @property({ attribute: false })
  currentDoc: string = "";

  @property({ attribute: false})
  nextPage: number = 3;

  @property({ attribute: false})
  prevPage: number = 0;

  constructor() {
    super();

    this.getAccionistasData();

    this.currentDoc = location.pathname.split("/")[1];
  };

  render() {
    
    return html `
      <p class="quit" @click="${ this.logout }">❌</p>
      <h3>Accionistas <span>(${ this.prevPage + 1 } of 3)</span></h3>   
      <div class="pagination">
        <span @click="${ this.handleprevPage }">⬅️</span>
        <span @click="${ this.handleNextPage }">➡️</span>
      </div>
      ${ sortByPercentage(this.accionistas).splice(this.prevPage, this.nextPage).map((accionista: IAccionista)=>{
          return html `
            <div id={${ accionista.Documento }} @click="${ this.handleSelectAccionista }">
              <accionista-item data='${ JSON.stringify(accionista) }'></accionista-item>
            </div>
          `;
        })
      }
      <Update-accionista-info></Update-accionista-info>
      <button>Continuar</button>
    `;
  };

  private handleNextPage() {
    this.nextPage += 3;
    this.prevPage += 3;
    console.log({
      nextPage: this.nextPage,
      prevPage: this.prevPage
    })
  };

  private handleprevPage() {
    this.nextPage -= 3;
    this.prevPage -= 3;
    console.log({
      nextPage: this.nextPage,
      prevPage: this.prevPage
    })
  };

  private async getAccionistasData() : Promise<void> {

    const authUser : IAccionista = JSON.parse(sessionStorage.getItem("auth")!);

    try {
      const { data } = await getAccionistas();

      this.accionistas = data.filter( (accionista: IAccionista)=> accionista.Documento !== +this.currentDoc);

    } catch (error) {
      console.log(error);
    };
  };

  private logout() : void {
    sessionStorage.clear();

    location.reload();
  };


  private handleSelectAccionista(doc: number | string) {
    
    sessionStorage.removeItem("docSelected");

    const docNumber = location.pathname.split("/")[1];

    sessionStorage.setItem("docSelected", docNumber);

  };

};

declare global {
  interface HTMLElementTanNameMap {
    "accionista-list": AccionistaList
  }
};