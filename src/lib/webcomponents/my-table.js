// @ts-nocheck
import { renderedHTML as html } from "/src/lib/utils/rederer";
import l from "/src/lib/utils/translate";

let selectedRow = undefined;

var showSelectedRow = () => {
  return selectedRow;
};

const templateTable = document.createElement("template");
const createNodeTable = () => {
  // <tr id="thead-tr" class="n-row-selected">

  // </tr>
  templateTable.innerHTML = /*html*/ `
    <style> *{font-size: var(--n-font-size-s);} .n-row-selected { background-color: #cedeae !important}</style>
    <nord-card padding="none" class="n-container">
      <h2 slot="header"><slot name="header-title">Table</slot></h2>
      <div slot="header-end" id="actions" style="visibility: hidden">
        <span id="message" aria-live="polite" aria-atomic="true">0 items selected</span>
        <slot name="header-actions"></slot>
      </div>
      <nord-table density="condensed" striped>
        <table>
          <thead id="thead"></thead>
          <tbody id="tbody"></tbody>
        </table>
      </nord-table>
      <pre id="json"></pre>
    </nord-card>`;
  return templateTable.content.cloneNode(true);
};

const createNodeError = () => {
  const templateError = document.createElement("template");
  templateError.innerHTML = /*html*/ `
    <nord-card >
      <h2 slot="header"><slot></slot></h2>
      <nord-banner id="message" variant="warning"  style="widht:100%"></nord-banner>
      
      <nord-empty-state>
        <h2>Quelque-chose ne va pas</h2>
        <p>
          Nous n'avons pas pu nous connecter au service. Cliquez sur Réessayer pour
          réessayer ou sur Afficher le journal pour savoir ce qui s'est passé.
        </p>
        <nord-stack justify-content="center" gap="s" direction="horizontal">
          <nord-button>Afficher le journal</nord-button>
          <nord-button variant="primary">Recommencez</nord-button>
        </nord-stack>
      </nord-empty-state>
    </nord-card>
    `;
  return templateError.content.cloneNode(true);
};

const createNodeLoading = () => {
  const templateLoading = document.createElement("template");
  templateLoading.innerHTML = /*html*/ `
    <nord-card class="n-container">
      <h2 slot="header"><slot></slot></h2>
      <nord-spinner slot="header-end" size="xl"></nord-spinner>
      <app-skeleton />
      <a href="/">Home</a>
    </nord-card>`;
  return templateLoading.content.cloneNode(true);
};

// Posibilité de charger les données directement avec une url
// Pratique pour faire un affichage rapide ou autre
const doAjax = async (url, xAuthToken) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/vnd.api+json, application/json;charset=utf-8",
      "X-Auth-Token": xAuthToken ?? "",
      Location: "http://localhost:8081",
      "include-Links": "true",
    },
  }).catch((error) => {
    console.log("Erreur sur l'appel à api distante" + error);
    return Promise.reject({
      status: "ERR_CONNECT",
      statusText: "Le serveur ne répond pas",
      body: "",
    });
  });

  if (response.ok) {
    // Get JSON value from the response body
    return Promise.resolve(await response.json());
  } else {
    return Promise.reject({
      status: response.status,
      statusText: response.statusText,
      body: await response.text(),
    });
  }
};

export default customElements.define(
  "my-table",
  class extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      const loadingNode = createNodeLoading();

      // Créer une racine fantôme
      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(loadingNode);

      // TABLE
      const tableNode = createNodeTable();

      // TABLE HEADER (creation du slot theadercolumn)
      const tableHead = tableNode.getElementById("thead");
      const slotHeader = document.createElement("slot");
      slotHeader.name = "theadercolumn";
      tableHead.appendChild(slotHeader);

      // TABLE BODY (creation du slot tbodycolumn)
      const tableBody = tableNode.getElementById("tbody");
      const slotBody = document.createElement("slot");
      slotBody.name = "tbodycolumn";
      tableBody.appendChild(slotBody);

      // REPLACE loadingNode => tableNode
      this.shadowRoot.replaceChildren(loadingNode, tableNode);

      // RENDER
      const render = () => {
        const toggleAll = shadowRoot.querySelector("thead nord-checkbox");
        const checkboxes =
          this.querySelectorAll("tr nord-checkbox") ??
          shadowRoot.querySelectorAll("tbody nord-checkbox");

        let count = 0;
        checkboxes.forEach((checkbox) => {
          checkbox
            .closest("tr")
            .classList.toggle("n-row-selected", checkbox.checked);
          if (checkbox.checked) count++;
        });

        toggleAll.indeterminate = count > 0 && count < checkboxes.length;
        toggleAll.checked = count === checkboxes.length;

        let tableMessage = shadowRoot.querySelector("#message");
        let tableActions = shadowRoot.querySelector("#actions");

        tableMessage.innerHTML = `${count} ${
          count === 1 ? "item" : "items"
        } selected`;
        tableActions.setAttribute(
          "style",
          "visibility:" + (count === 0 ? "hidden" : "visible")
        );
      };

      const renderCheckbox = () => {
        tableBody.addEventListener("change", () => {
          render();
        });

        let checkboxes =
          this.querySelectorAll("tr td nord-checkbox") ??
          tableBody.querySelectorAll("nord-checkbox");

        console.log(this.shadowRoot);

        let toggleAll =
          this.querySelectorAll("tr th nord-checkbox") ??
          tableHead.querySelector("nord-checkbox");

        console.log(toggleAll);

        this.querySelectorAll("tr")?.forEach((element) => {
          element.addEventListener("click", () => {
            const checkbox = element.querySelector("nord-checkbox");
            checkbox.checked = !checkbox.checked;

            element.classList.toggle("n-row-selected", checkbox.checked);
            render();
          });
        });

        toggleAll.addEventListener("change", () => {
          checkboxes.forEach((checkbox) => {
            checkbox.checked = toggleAll.checked;
          });

          render();
        });
      };

      if (this.getAttribute("url")) {
        const header = tableHead.querySelector("#thead-tr");
        let ligne;
        const templateLine = document.createElement("template");
        templateLine.innerHTML = /*html*/ `
                <tr class="n-row-selected">
                  <td>
                  <div class="n-table-actions">
                    <nord-checkbox class="checkbox" size="s" label="Select row" hide-label />
                  </div>
                  </td>
                </tr>`;

        // tableHead - création de la checkbox
        const checkboxTh = document.createElement("th");
        checkboxTh.innerHTML = /*html*/ `
          <div class="n-table-actions">
              <nord-checkbox size="s" label="Toggle all" hide-label />
          </div>`;
        header.appendChild(checkboxTh);

        // tableHead - création de la colonne #Id
        const idTh = document.createElement("th");
        idTh.innerText = "#id";
        header.appendChild(idTh);

        doAjax(this.getAttribute("url"), this.getAttribute("token"))
          .then((json) => {
            // MODE DEBUG
            if (this.getAttribute("debug") === "true") {
              tableNode.getElementById("json").innerText = JSON.stringify(
                json,
                null,
                2
              );

              // Afficher le json
              if (this.getAttribute("json")) {
                const productSheetResponse = { ...json };
                tableNode.getElementById("json").innerText = JSON.stringify(
                  productSheetResponse.data
                    ? productSheetResponse.data
                    : productSheetResponse,
                  null,
                  2
                );
              }
            }

            // Détection du node data (document json:api)
            let buildHeader = true;
            const data = json?.data || json;
            data.forEach((item) => {
              ligne = templateLine.content.cloneNode(true);

              // Ajout de l'identifiant de item
              const idTd = document.createElement("td");
              idTd.setAttribute("class", "identifier");
              idTd.innerText = item.id;
              // @ts-ignore
              const tr = ligne.querySelector("tr");
              tr.addEventListener("click", (event) => {
                tr.classList.toggle("n-row-selected");
                const checkbox = tr.querySelector("nord-checkbox");

                checkbox.checked = tr.classList.contains("n-row-selected");
                render();
              });

              // Ajout de identifiant
              tr.appendChild(idTd);

              Object.entries(item.attributes ? item.attributes : item).forEach(
                ([key, value]) => {
                  if (buildHeader) {
                    const th = document.createElement("th");
                    th.innerText = l(key);
                    header.appendChild(th);
                  }

                  const td = document.createElement("td");
                  td.scope = "row";
                  td.innerHTML = html(key, value);
                  tr.appendChild(td);
                }
              );

              // tableBody.appendChild(ligne);
              buildHeader = false;
            });

            renderCheckbox();
          })
          .catch((error) => {
            console.log("Erreur sur l'appel à api distante" + error);
            const nodeError = createNodeError();
            nodeError.getElementById(
              "message"
            ).innerHTML = `${error.status} ${error.statusText} ${error.body}`;
            this.shadowRoot.replaceChildren(loadingNode, nodeError);
          });
      } else {
        shadowRoot.querySelectorAll("tr").forEach((tr) => {
          tr.addEventListener("click", (event) => {
            tr.classList.toggle("n-row-selected");
            const checkbox = tr.querySelector("nord-checkbox");

            checkbox.checked = tr.classList.contains("n-row-selected");
            render();
          });
        });

        renderCheckbox();
      }
    }
  }
);
