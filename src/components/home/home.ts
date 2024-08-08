

import "../../pair-components/button";
import "../../pair-components/icon_button";
import "../insights/insights_tags";

import { MobxLitElement } from "@adobe/lit-mobx";
import { CSSResultGroup, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { styles } from "./home.scss";

/** Home page component */
@customElement("home-component")
export class HomeComponent extends MobxLitElement {
  static override styles: CSSResultGroup = [styles];

  override render() {
    return html`
      <tag-insights></tag-insights>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "home-component": HomeComponent;
  }
}
