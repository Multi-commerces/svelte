const template = document.createElement("template");


template.innerHTML = /*html*/ `
<div class="skeleton-overview" aria-busy="true">
  <header>
 
    <nord-skeleton></nord-skeleton>
    <nord-skeleton></nord-skeleton>
   
  </header>
  
  <nord-skeleton></nord-skeleton>
  <nord-skeleton></nord-skeleton>
  <nord-skeleton></nord-skeleton>
  <nord-skeleton></nord-skeleton>
  <nord-skeleton></nord-skeleton>
  <nord-visually-hidden>Loading</nord-visually-hidden>
</div>

<style>
  .skeleton-overview header {
    display: flex;
    align-items: center;
    margin-block-end: var(--n-space-s);
  }
  .skeleton-overview header nord-skeleton:last-child {
    flex: 0 0 auto;
    inline-size: 30%;
  }
  .skeleton-overview nord-skeleton {
    margin-bottom: var(--n-space-m);
  }
  .skeleton-overview nord-skeleton:nth-child(1) {
    inline-size: 3rem;
    block-size: 3rem;
    margin-inline-end: var(--n-space-m);
  }
  .skeleton-overview nord-skeleton:nth-child(3) {
    inline-size: 90%;
  }
  .skeleton-overview nord-skeleton:nth-child(4) {
    inline-size: 80%;
  }
</style>
`;

class AppSkeleton extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    // @ts-ignore
    shadowRoot.append(template.content.cloneNode(true));
  }

  connectedCallback() {}
}

export default customElements.define("app-skeleton", AppSkeleton);
