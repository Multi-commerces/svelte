/* 
<article>
  <h4>this.getAttribute("title")</h4>
  <div>
    <img/>
    <ul>
        <slot></slot>
    </ul>
  </div>
</article>
*/
export default customElements.define(
  "my-experience",
  class extends HTMLElement {
    connectedCallback() {
      // <article></article>
      const elemArticle = document.createElement("article");

      // <h4></h4>
      const elemTitle = document.createElement("h4");
      elemTitle.style.padding = "0.2rem";
      elemTitle.innerText = this.getAttribute("title") ?? "";
      elemTitle.style.color = "white";
      elemTitle.style.backgroundColor = "#556677";
      elemArticle.appendChild(elemTitle);

      // <div></div>
      const div = document.createElement("div");
      div.style.marginTop = "0.4rem";
      elemArticle.appendChild(div);

      const width =
        this.getAttribute("img-width") ??
        this.getAttribute("img-size") ??
        "40px";
      const height =
        this.getAttribute("img-height") ??
        this.getAttribute("img-size") ??
        "40px";

      // <img></img>
      if (this.getAttribute("img")) { 
        const elemImg = document.createElement("img");
        elemImg.setAttribute(
          "src",
          "/images/" + this.getAttribute("img")
        );
        div.appendChild(elemImg);
      }

      //<ul><slot></slot></ul>
      const elemUl = document.createElement("ul");
      div.appendChild(elemUl);

      const elemSlot = document.createElement("slot");
      elemUl.appendChild(elemSlot);

      // Création du CSS à appliquer au dom fantôme
      const style = document.createElement("style");
      style.textContent = "div {display: flex;flex-direction: row;} " +
        /*css*/ "img {width:" + width + ";height:" + height + "; border-radius: 10%}" +
        "ul{margin:0;flex: auto;} h4 {margin:0;}";

      // Créer une racine fantôme
      const shadowRoot = this.attachShadow({ mode: "open" });
      // Attacher les éléments créés à l'élément racine fantôme
      shadowRoot.appendChild(elemArticle);
      shadowRoot.appendChild(style);
    }
  }
);
