

import "../../pair-components/icon";
import "../../pair-components/icon_button";

import { MobxLitElement } from "@adobe/lit-mobx";
import { CSSResultGroup, html, nothing } from "lit";
import { customElement } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import { core } from "../../core/core";
import {
  NAV_ITEMS,
  NavItem,
  Pages,
  RouterService,
} from "../../services/router_service";

import { styles } from "./tabnav.scss";

/** Tab navigation view component */
@customElement("tabnav-component")
export class TabNav extends MobxLitElement {
  static override styles: CSSResultGroup = [styles];
  private readonly routerService = core.getService(RouterService);

  override render() {
    const handleNotesClicked = (e: Event) => {
      this.routerService.navigateToNotesPage();
    };

    const handleSettingsClicked = (e: Event) => {
      this.routerService.navigateToSettingsPage();
    };

    const params = this.routerService.getActiveRouteParams();
    const tag = params["id"] as string | undefined;
    if (tag !== undefined) {
      return html`
        <pr-icon-button
          icon="arrow_back"
          color="neutral"
          size="small"
          variant="default"
          @click=${handleNotesClicked}
        >
        </pr-icon-button>
        <div class="title">#${tag}</div>
      `;
    }

    if (this.routerService.activePage === Pages.HISTORY) {
      return html`
        <pr-icon-button
          icon="arrow_back"
          color="neutral"
          size="small"
          variant="default"
          @click=${handleSettingsClicked}
        >
        </pr-icon-button>
        <div class="title">History</div>
      `;
    }

    if (this.routerService.activePage === Pages.PROJECTS) {
      return html`
        <pr-icon-button
          icon="arrow_back"
          color="neutral"
          size="small"
          variant="default"
          @click=${handleSettingsClicked}
        >
        </pr-icon-button>
        <div class="title">Projects</div>
      `;
    }

    return html`
      <div class="tabs">
        ${NAV_ITEMS.filter((navItem) => navItem.showInTabnav).map((navItem) =>
          this.renderTab(navItem)
        )}
      </div>
    `;
  }

  private renderTab(navItem: NavItem) {
    const tabClasses = classMap({
      tab: true,
      selected: this.routerService.activePage === navItem.page,
    });

    const handleNavItemClicked = (e: Event) => {
      if (navItem.page === Pages.HOME) {
        this.routerService.navigateToHomePage();
      } else if (navItem.page === Pages.NOTES) {
        this.routerService.navigateToNotesPage();
      } else if (navItem.page === Pages.CHAT) {
        this.routerService.navigateToChatPage();
      } else if (navItem.page === Pages.HIGHLIGHTS) {
        this.routerService.navigateToHighlightsPage();
      } else if (navItem.page === Pages.SETTINGS) {
        this.routerService.navigateToSettingsPage();
      }
    };

    return html`
      <div class=${tabClasses} role="button" @click=${handleNavItemClicked}>
        <pr-icon icon=${navItem.icon}></pr-icon>
        ${navItem.isPrimaryPage
          ? html`<div class="tab-label">${navItem.title}</div>`
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "tabnav-component": TabNav;
  }
}
