const templateFooter = document.createElement("template");
templateFooter.innerHTML = /*html*/ `
<footer>
  <nord-select label="Interface theme">
    <option value="light">Thème lumière</option>
    <option value="dark">Thème sombre</option>
    <option value="auto">Auto (préférence système)</option>
  </nord-select>
</footer>
`;

// Detect operating system dark mode
const darkMode = window.matchMedia("(prefers-color-scheme: dark)");
const stylesheetLight = "./theme-light-min.css";
const stylesheetDark = "./node_modules/@nordhealth/themes/lib/nord-dark.css";

const preloadLink = document.createElement("link");
preloadLink.as = "style";
preloadLink.rel = "preload";
preloadLink.setAttribute("oncload", "this.rel='stylesheet'");

class AppFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.appendChild(templateFooter.content.cloneNode(true));

    // Composant de selection du thème
    const menu = this.shadowRoot.querySelector("nord-select");

    // Mode enregistré dans localStorage
    const currentMode = localStorage.getItem("mode");
    // Application du theme en fonction du mode
    if (currentMode === "dark") {
      preloadLink.href = stylesheetDark;
      document.head.appendChild(preloadLink);
    } else {
      preloadLink.href = stylesheetLight;
      document.head.appendChild(preloadLink);
    }

    // EventListener du menu de sélection du mode (darl/light)
    menu.addEventListener("change", (event) => {
      let mode;
      preloadLink.rel = "stylesheet";
      // @ts-ignore
      if (event.target.value === "dark") {
        mode = "dark";
        document.head.removeChild(preloadLink);
        preloadLink.href = stylesheetDark;
        document.head.appendChild(preloadLink);

        let element = document.querySelectorAll(
          "nord-navigation, nord-header, nord-stack"
        );
        // @ts-ignore
        element.forEach((element) => (element.style.fontFamily = "Lato"));
      } else {
        mode = "light";
        document.head.removeChild(preloadLink);
        preloadLink.href = stylesheetLight;
        document.head.appendChild(preloadLink);

        let element = document.querySelectorAll(
          "nord-navigation, nord-header, nord-stack"
        );
        // @ts-ignore
        element.forEach((element) => (element.style.fontFamily = "Roboto"));
      }

      // Enregistrement du choix dans localStorage
      localStorage.setItem("mode", mode);
    });
  }
}

export default customElements.define("app-footer", AppFooter);