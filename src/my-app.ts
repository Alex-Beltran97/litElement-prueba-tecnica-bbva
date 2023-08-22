import { CSSResultGroup, LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// Pages
import './pages/home-page';
import './pages/about-us-page';
import './pages/contact-us-page';
import './pages/not-found';
import { getAccionistasData } from './actions/accionistas.action';

@customElement("my-app")
class MyApp extends LitElement {
  
  static styles?: CSSResultGroup | undefined = css `
    h1 {
      text-align:center;
    }

    ul {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2em;
      border: 1px solid black;
      padding: 1rem;
    }

    li {
      list-style: none;
    }
    
    a {
      text-decoration: none;
    }

    a:visited {
      color: crimson;
    }

    a:hover {
      text-decoration: underline;
    }
  `;

  constructor() {
    super();


  };

  @property({ attribute: false })
  paths = [
    {
      path: "/",
      component: html `<home-page></home-page>`
    },
    {
      path: "/home",
      component: html `<home-page></home-page>`
    },
    {
      path: "/aboutUs",
      component: html `<about-us-page></about-us-page>`
    },
    {
      path: "/contactUs",
      component: html `<contact-us-page></contact-us-page>`
    }
  ];


  currentPage() {

    const { pathname } = location;

    for(let path of this.paths) {
      if (path.path !== pathname){
        continue;
      } else {
        return path.component;
      };
    };

    return html `<not-found></not-found>`;

  };

  render() {

    return html `
      ${ this.currentPage() }
    `;
  };
};

declare global {
  interface HTMLElementTagNameMap {
    "my-app": MyApp
  }
};