/* 
<h3>this.getAttribute("title")</h3>
<div>
  <figure>
    <img />
    <figcaption><slot></slot></figcaption>
  </figure>
</div>
*/
export default customElements.define(
  "my-presentation",
  class extends HTMLElement {
    connectedCallback() {
      // Création de la racine fantôme
      const shadowRoot = this.attachShadow({ mode: "open" });

      // Titre (H3)
      const title = this.getAttribute("title");
      if(title)
      {
        const elemTitle = document.createElement("h3");
        elemTitle.style.display = "block";
        elemTitle.style.padding = "0.2rem";
        elemTitle.style.textAlign = "center";
        elemTitle.style.color = "white";
        elemTitle.setAttribute("class", "n-padding-m n-border-radius");
        elemTitle.style.backgroundColor = "rgb(34 79 102)";
        elemTitle.innerText = this.getAttribute("title");
        shadowRoot.appendChild(elemTitle);
      }

      // figure
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const figcaption = document.createElement("figcaption");

      const figureDiv = document.createElement("div");
      // figureDiv.style.paddingLeft = "1.5rem";
      figureDiv.appendChild(figure);

      img.setAttribute("src", "/images/" + this.getAttribute("img"));

      // slot
      const elemSlot = document.createElement("slot");

      // Création du CSS à appliquer au dom fantôme
      const style = document.createElement("style");
      const width =
        this.getAttribute("img-width") ??
        this.getAttribute("img-size") ??
        "45px";
      const height =
        this.getAttribute("img-height") ??
        this.getAttribute("img-size") ??
        "45px";

      style.textContent =
        /*css*/ "h3{margin:0; margin-bottom:0.4rem;} figure {display: flex;  flex-direction: row;margin:0}" +
        "img {width:" + width +";height:" + height + "; border-radius: 10%;margin-right:0.5rem}" +
        "figcaption {flex: auto;height:" + height +  "}";

      // Attacher les éléments créés à l'élément racine fantôme
      shadowRoot.appendChild(figureDiv);

      figure.appendChild(img);
      figure.appendChild(figcaption);
      figcaption.appendChild(elemSlot);

      shadowRoot.appendChild(style);
    }
  }
);
