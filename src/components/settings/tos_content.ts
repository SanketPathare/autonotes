
import "../../pair-components/dialog";

import { MobxLitElement } from "@adobe/lit-mobx";
import { CSSResultGroup, html } from "lit";
import { customElement } from "lit/decorators.js";

import { styles } from "./tos_content.scss";

/** TOS content. */
@customElement("tos-content")
export class TOSContent extends MobxLitElement {
  static override styles: CSSResultGroup = [styles];

  override render() {
    return html`
      <p>
        AutoNotes is a client-side experiment that optionally calls the
        Gemini API.
      </p>
      <p>
        All created notes and chat messages are kept in browser storage on
        your device and can be cleared
        at any time on the Settings page (see "Delete Data" section).
      </p>
      <p>
        Example projects (available on the next screen during setup, or under
        Settings) can be browsed without calling the Gemini model. However,
        in order to generate tags, summaries, and other model-based insights,
        you will need
        <a
          href="https://ai.google.dev/gemini-api/docs/api-key"
          target="_blank">
          an API key from AI Studio</a>
        to call Gemini
        (<a
          href="https://ai.google.dev/gemini-api/terms"
          target="_blank">see Gemini API Terms of Service</a>).
     
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "tos-content": TOSContent;
  }
}
