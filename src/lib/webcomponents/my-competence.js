let blockData;

/* 
<article>
  <h4>2015 - 1an | ACOSS, Intégration Technique</h4>
  <img
      style="border-radius: 10%;float:left;"
      src="/src/assets/acoss.jpeg"
      width="40px"
      height="40px"
    />
  <ul style="margin-left: 40px;height-min:80px">
      <slot></slot>
  </ul>
  
</article>
*/

export default customElements.define(
  "my-experience",
  class extends HTMLElement {
    connectedCallback() {
      const elemArticle = document.createElement("article");

      // <h4></h4>
      const elemTitle = document.createElement("h4");
      elemTitle.innerText = this.getAttribute("title") ?? "";
      elemArticle.appendChild(elemTitle);

      // <img></img>
      if (this.getAttribute("img")) { 
        const elemImg = document.createElement("img");
        elemImg.setAttribute(
          "src", "/images/" + this.getAttribute("img")
        );
        elemArticle.appendChild(elemImg);
      }

      //<ul><slot></slot></ul>
      const elemUl = document.createElement("ul");
      const elemSlot = document.createElement("slot");

      // Création du CSS à appliquer au dom fantôme
      const style = document.createElement("style");
      style.textContent =
        /*css*/ "img {width:40px; border-radius: 10%;float:left;}" +
        "ul, h4 {margin:0;}";

      // Créer une racine fantôme
      const shadowRoot = this.attachShadow({ mode: "open" });
      // Attacher les éléments créés à l'élément racine fantôme
      shadowRoot.appendChild(elemArticle);
      shadowRoot.appendChild(style);
      elemArticle.appendChild(elemUl);
      elemUl.appendChild(elemSlot);
    }
  }
);
