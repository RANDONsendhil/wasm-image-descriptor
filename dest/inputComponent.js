"use strict";
const template = `
<style></style>
<input type="text" placeholder="enter your text">`;
class InputWebCo extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = template;
    }
    connectedCallback(params) { }
}
customElements.define("input-webco", InputWebCo);
