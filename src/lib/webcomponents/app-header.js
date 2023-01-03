const template = document.createElement("template");

export default customElements.define(
    "app-header",
    class extends HTMLElement {
      constructor() {
        super();


        template.innerHTML = /*html*/ `
        <nord-header slot="header">
          <h1 class="n-typescale-l">Dashboard</h1>
          <nord-button variant="primary" slot="end">
            <nord-icon slot="start" size="s" name="interface-add-small"></nord-icon>
            Create new
          </nord-button>
          <nord-tooltip id="export" position="block-end"> Export data as Spreadsheet </nord-tooltip>
        </nord-header>`;

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.append(template.content.cloneNode(true));
      }
    }
  );