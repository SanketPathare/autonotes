

import { Service } from "./service";
import { Ref } from "lit/directives/ref.js";

export interface LitToast {
  show: (text: string, duration: number) => {};
}

/**
 * Manages showing a toast.
 */
export class ToastService extends Service {
  toastRef: Ref<LitToast> | undefined = undefined;

  setToast(toastElementRef: Ref<LitToast>) {
    this.toastRef = toastElementRef;
  }

  showToast(text: string, duration: number = 400) {
    if (this.toastRef && this.toastRef.value) {
      this.toastRef.value!.show(text, duration);
    }
  }
}
