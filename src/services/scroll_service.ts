

import { Ref } from "lit/directives/ref";
import { Service } from "./service";

export const CHAT_SCROLL_KEY = "chat_scroll";
export const NOTES_SCROLL_KEY = "notes_scroll";

/**
 * LLM service
 *
 * Handles LLM interactions, calling LLM + updating NotebookService.
 */
export class ScrollService extends Service {
  scrollElements = new Map<string, Ref<Element>>();

  registerScrollElement(key: string, elementRef: Ref<Element>) {
    this.scrollElements.set(key, elementRef);
  }

  scrollElementToBottom(key: string) {
    const elementRef = this.scrollElements.get(key);

    window.setTimeout(() => {
      if (elementRef && elementRef.value) {
        elementRef.value.scrollTop = elementRef.value.scrollHeight;
      }
    });
  }
}
