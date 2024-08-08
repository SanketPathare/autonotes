

import "../../pair-components/icon";

import { MobxLitElement } from "@adobe/lit-mobx";
import { CSSResultGroup, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styles } from "./tag_label.scss";
import { removeLeadingHash } from "../../shared/utils";

/** Tag label component */
@customElement("tag-label")
export class TagLabel extends MobxLitElement {
  static override styles: CSSResultGroup = [styles];

  @property({ type: String }) label = "";
  @property({ type: Boolean }) faded = false;
  @property({ type: Boolean }) selected = false;
  @property({ type: Object }) onLabelClicked: () => void = () => {};
  @property({ type: Boolean }) pinned = false;

  @property({ type: Boolean }) isHovered = false;
  @property({ type: Object }) onPinClicked: () => void = () => {};

  override render() {
    const tagName = removeLeadingHash(this.label);

    const labelItemClasses = (tag: string) => {
      return classMap({
        "nav-item": true,
        "label-item": true,
        selected: this.selected,
        faded: this.faded,
      });
    };

    const handleMouseEnter = (event: MouseEvent) => {
      this.isHovered = true;
    };

    const handleMouseLeave = (event: MouseEvent) => {
      this.isHovered = false;
    };

    const handleLabelClicked = (event: MouseEvent) => {
      console.log((event.target as HTMLElement).className);
      if ((event.target as HTMLElement).className.includes("pin-icon")) return;

      this.onLabelClicked();
    };

    return html`
      <div
        class=${labelItemClasses(tagName)}
        @mouseenter=${handleMouseEnter}
        @mouseleave=${handleMouseLeave}
        role="button"
        @click=${handleLabelClicked}
      >
        <div class="content">
          <div class="left">
            <div class="tag-marker">#</div>
            <div class="tag-name">${tagName}</div>
          </div>
          ${this.renderPinIcon()}
        </div>
      </div>
    `;
  }

  private renderPinIcon() {
    if (!this.isHovered && !this.pinned) {
      return nothing;
    }

    const handlePinClicked = (event: MouseEvent) => {
      this.onPinClicked();
      event.stopPropagation();
      event.preventDefault();

      this.requestUpdate();
    };

    const iconClasses = classMap({
      "pin-icon": true,
      pinned: this.pinned,
    });
    return html`
      <pr-icon
        class=${iconClasses}
        icon="keep"
        @click=${handlePinClicked}
      ></pr-icon>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "tag-label": TagLabel;
  }
}
