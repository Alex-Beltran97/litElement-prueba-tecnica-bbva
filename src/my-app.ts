import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// Components
import './components/accionista-lits';
import './components/accionsita-detail';
import './pages/login-component';
import './pages/accionista-view';

import { authProcess, isLogged } from './utils';
import { CSSResultGroup } from 'lit';

@customElement("my-app")
export class MyApp extends LitElement {
  
  @property({ attribute: false })
  isLogged: boolean = false;

  constructor() {
    super();

    this.validateAuth();
  };

  async validateAuth() {
    this.isLogged = await isLogged();
  }

  render() {   

    if(this.isLogged) {
      return html `
        <accionista-view></accionista-view>
      `;
    };

    return html `
      ${ this.loginView() }
    `;
    
  }; 

  private loginView() {
    return html `
      <h1>Accionistas Vitual App</h1>
      <hr/>
      <login-component></login-component>
    `;
  }

};

declare global {
  interface HTMLElementTanNameMap {
    "my-app": MyApp
  }
};
