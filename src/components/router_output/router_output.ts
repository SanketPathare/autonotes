

import "../chat/chat";
import "../project/project";

import { MobxLitElement } from "@adobe/lit-mobx";
import { CSSResultGroup, html, nothing } from "lit";
import { customElement } from "lit/decorators.js";

import { core } from "../../core/core";
import { Pages, RouterService } from "../../services/router_service";

import { styles } from "./router_output.scss";

/** App info view component */
@customElement("router-output-component")
export class RouterOutput extends MobxLitElement {
  static override styles: CSSResultGroup = [styles];

  private readonly routerService = core.getService(RouterService);

  override render() {
    if (
      this.routerService.activePage === Pages.HOME ||
      this.routerService.activePage === Pages.CHAT ||
      this.routerService.activePage === Pages.NOTES ||
      this.routerService.activePage === Pages.NOTES_TAG_SELECTED ||
      this.routerService.activePage === Pages.HISTORY ||
      this.routerService.activePage === Pages.PROJECTS ||
      this.routerService.activePage === Pages.SETTINGS ||
      this.routerService.activePage === Pages.HIGHLIGHTS
    ) {
      return html`<project-component></project-component>`;
    }

    return nothing;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "router-output-component": RouterOutput;
  }
}
