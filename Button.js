import { LitElement, html, css } from "https://cdn.skypack.dev/lit";
//import { logTest } from "https://tcskhemata.github.io/SBase/Test.js";

let logTest = await import("https://tcskhemata.github.io/SBase/Test.js");

class GithubButton extends LitElement {
  static get styles () {
    return css`
      * {
        margin: 0;
        padding: 0;
        /* --icon-color: purple; */
      }
      :host {
        /* button are inline element */
        display: inline-block;
        min-width: 16px;
        min-height: 16px;
      }
      
      button {
        /* reset */
        border: none;
        color: inherit;
        outline: inherit;
        line-height: 0;
        cursor: pointer;
        width: 100%;
        height: 100%;
      }
      button:focus,
      button:hover {
        animation: bigger 1.3s ease-in-out 1 forwards;
      }
      svg {
        display: inline-block;
        outline: none;
        fill: var(--icon-color, #000);
      }
      svg path {
        pointer-events: none;
      }
      @keyframes bigger {
        0% {
          opacity: 1;
          transform: scale(1);
        }
        50% {
          opacity: .9;
          transform: scale(1.05);
        }
        100% {
          opacity: 1;
          transform: scale()
        }
      }
    `
  }

  static get properties() {
    return {
      //background_color: String,
      //link_target: String,
      link: { type: String }      
    };
  }
  
  handleClick (event) {
    //logTest();
    //this.getAttribute("ext")?
    //import("https://tcskhemata.github.io/SBase/Test.js");
    logTest?
      console.log("Exists"):
      console.log("Failed")
    const githubBaseURL = 'https://github.com'
    const githubURL = new URL(this.link, githubBaseURL)
    this.getAttribute("link-target")?
      window.open(githubURL, "_blank") :
      window.open(githubURL, "_self")
  }

  render () {
    return html`
      <button id="btn"
        title="github link"
        aria-label="github link"
        style = "background : ${this.getAttribute("background-color")}"
        @click=${this.handleClick}>
        <svg version="1.1" viewBox="0 0 120 120"
          class="animation-move" role="img" aria-hidden="true" focusable="false" >
          <path d="m59.99541 11.390628c-27.521204 0-49.834951 22.313746-49.834951 49.841068 0 22.020024 14.279208 40.698954 34.084071 47.292414 2.493584 0.45588 3.402289-1.0831 3.402289-2.40486 0-1.181-0.04284-4.31711-0.0673-8.475118-13.863099 3.010658-16.788086-6.682191-16.788086-6.682191-2.267172-5.755129-5.534837-7.287994-5.534837-7.287994-4.525165-3.093268 0.342676-3.032075 0.342676-3.032075 5.002465 0.354916 7.633731 5.137089 7.633731 5.137089 4.445615 7.615371 11.666297 5.41551 14.505618 4.142713 0.452821-3.221771 1.737858-5.418571 3.163636-6.663834-11.066613-1.2575-22.702316-5.534837-22.702316-24.632933 0-5.439987 1.942854-9.888663 5.130968-13.373559-0.514014-1.260561-2.224336-6.327278 0.486479-13.189985 0 0 4.185548-1.34011 13.707058 5.10955 3.974435-1.104519 8.239535-1.658308 12.477097-1.676666 4.231443 0.01836 8.49654 0.572147 12.477095 1.676666 9.51539-6.44966 13.69176-5.10955 13.69176-5.10955 2.719996 6.862707 1.009672 11.929424 0.495657 13.189985 3.194234 3.484896 5.124851 7.933572 5.124851 13.373559 0 19.147049-11.654061 23.360134-22.75739 24.593159 1.789873 1.538983 3.383929 4.580238 3.383929 9.230846 0 6.660775-0.0612 12.036508-0.0612 13.670338 0 1.334 0.896465 2.88522 3.426764 2.39874 19.789567-6.6057 34.056531-25.272388 34.056531-47.286294 0-27.527322-22.316802-49.841068-49.844126-49.841068" />
        </svg>
      </button>
    `
  }
}

customElements.define('github-button', GithubButton)
