

import { makeObservable, observable } from "mobx";

interface SpeechSynthesisStoppedCallback {
  (): void;
}

export class Synthesizer {
  private utterance: SpeechSynthesisUtterance | null = null;
  private synth: SpeechSynthesis | null = null;
  private speechStoppedCallback: SpeechSynthesisStoppedCallback;

  @observable
  public isSpeaking = false;

  constructor(speechStoppedCallback: SpeechSynthesisStoppedCallback) {
    if (!("speechSynthesis" in window)) {
      throw new Error("Couldn't find speechSynthesis in window");
    }

    makeObservable(this);
    this.synth = window.speechSynthesis;
  }

  setUtterance(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.onstart = () => {
      console.log("Speech synthesis started");
      this.isSpeaking = true;
    };

    utterance.onend = () => {
      console.log("Speech synthesis stopped");
      this.isSpeaking = false;
    };

    this.utterance = utterance;
  }

  startSpeaking() {
    if (this.utterance) {
      this.isSpeaking = true;
      this.synth.speak(this.utterance);
    } else {
      console.log("Speech synthesis failed: No utterance defined");
    }
  }

  stopSpeaking() {
    this.isSpeaking = false;
    this.synth.cancel();
  }
}
