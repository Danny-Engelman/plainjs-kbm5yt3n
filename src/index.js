class MyCounter extends HTMLElement {
  constructor() {
    super();
    this.count = 0;

    const style = `
      * {
        font-size: 200%;
      }

      span {
        width: 4rem;
        display: inline-block;
        text-align: center;
      }

      button {
        width: 4rem;
        height: 4rem;
        border: none;
        border-radius: 10px;
        background-color: seagreen;
        color: white;
      }
    `;

    const html = `
    <button id="dec" class="large btn">-</button>
    <span class="large value">${this.count}</span>
    <button id="inc" class="large btn">+</button>
    `;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
    <style>
      ${style}
    </style>
    ${html}
    `;

    this.buttonInc = this.shadowRoot.getElementById("inc");
    this.buttonDec = this.shadowRoot.getElementById("dec");
    this.spanValue = this.shadowRoot.querySelector("span");

    this.inc = this.inc.bind(this);
    this.dec = this.dec.bind(this);
  }

  inc() {
    this.count++;
    this.update();
  }

  dec() {
    this.count--;
    this.update();
  }

  update() {
    this.spanValue.innerText = this.count;
  }

  connectedCallback() {
    this.buttonInc.addEventListener("click", this.inc);
    this.buttonDec.addEventListener("click", this.dec);
  }

  disconnectedCallback() {
    this.buttonInc.removeEventListener("click", this.inc);
    this.buttonDec.removeEventListener("click", this.dec);
  }
}

customElements.define("my-counter", MyCounter);
