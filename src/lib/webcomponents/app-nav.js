const template = document.getElementById("app-nav") ?? document.createElement("template");


template.innerHTML = /*html*/ `
<nord-navigation slot="nav" role="navigation">
  <nord-button slot="header" expand variant="switch">
    <nord-avatar slot="start" name="Bath Clinic" variant="square">B</nord-avatar>
    Bath Clinic
  </nord-button>
  <nord-nav-group>
    <nord-nav-item active icon="navigation-dashboard">Dashboard</nord-nav-item>
    <nord-nav-item href="#" onclick="openData('categories')">Catégories</nord-nav-item>
    <nord-nav-item href="#" onload="jours()" onclick="document.getElementById('main').setAttribute('page','products')">Produits</nord-nav-item>
    <nord-nav-item href="#" onclick="openData('categories/hyyyy.html')">Commandes</nord-nav-item>
    <nord-nav-item href="./index_test.html" onclick="return false">Clients</nord-nav-item>
  </nord-nav-group>
</nord-navigation>
`;

class AppNav extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    // @ts-ignore
    shadowRoot.append(template.content.cloneNode(true));
  }

  connectedCallback() {}
}

export default customElements.define("app-nav", AppNav);
