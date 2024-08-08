

import "../../pair-components/button";
import "../../pair-components/icon";
import "../../pair-components/icon_button";

import { MobxLitElement } from "@adobe/lit-mobx";
import { CSSResultGroup, html, nothing } from "lit";
import { customElement } from "lit/decorators.js";
import { core } from "../../core/core";
import { PromptHistoryService } from "../../services/prompt_history_service";
import { ToastService } from "../../services/toast_service";
import { PromptCall } from "../../shared/types";
import { styles } from "./history.scss";

/** Prompt history component */
@customElement("history-component")
export class HistoryComponent extends MobxLitElement {
  static override styles: CSSResultGroup = [styles];

  private readonly promptHistoryService = core.getService(PromptHistoryService);
  private readonly toastService = core.getService(ToastService);

  override render() {
    return html`
      <div class="history">
        <div class="stat">
          You have
          <b>${this.promptHistoryService.promptCalls.length} prompt calls</b>.
        </div>
        <div class="action-buttons">
          ${this.renderDownload()} ${this.renderClearHistory()}
        </div>
        ${this.promptHistoryService.promptCalls.map((call) =>
          this.renderPromptCall(call)
        )}
      </div>
    `;
  }

  private renderClearHistory() {
    if (this.promptHistoryService.promptCalls.length === 0) {
      return nothing;
    }

    const handleClearHistory = () => {
      this.promptHistoryService.clearPromptCalls();
      this.toastService.showToast("Prompt history cleared");
    };

    return html`
      <div class="row clear">
        <pr-button
          @click=${handleClearHistory}
          color="error"
          variant="outlined"
        >
          Clear History
        </pr-button>
      </div>
    `;
  }

  private renderDownload() {
    const handleExportHistory = () => {
      this.promptHistoryService.downloadPromptCalls();
    };

    return html`
      <pr-button
        @click=${handleExportHistory}
        variant="outlined"
        .disabled=${this.promptHistoryService.promptCalls.length === 0}
      >
        Download History
      </pr-button>
    `;
  }

  private renderPromptCall(call: PromptCall) {
    return html`
      <details class="call">
        <summary class="call--summary">
          <div class="call--header">
            <h3>${call.promptName}</h3>
            <div class="timestamp">
              ${new Date(call.timestamp).toLocaleDateString()} -
              ${new Date(call.timestamp).toLocaleTimeString()}
            </div>
          </div>
          <pr-icon color="neutral" size="medium" icon="expand_more"></pr-icon>
        </summary>
        <div class="row">
          <label>Prompt</label>
          <div class="markdown-wrapper">${call.prompt}</div>
        </div>
        <div class="row">
          <label>Response</label>
          <div class="markdown-wrapper">${call.response}</div>
        </div>
        ${call.processedResponse &&
        html`<div class="row">
          <label>Processed Response</label>
          <div class="response">${call.processedResponse}</div>
        </div>`}
        <div class="row">
          <label>Stop Tokens</label>
          <div class="stop-tokens">
            ${call.stopTokens.map((token) => html`<span>${token}</span>`)}
          </div>
        </div>
      </details>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "history-component": HistoryComponent;
  }
}
