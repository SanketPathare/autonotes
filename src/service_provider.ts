
// Core services
import { Core } from "./core/core";

import { ApiService } from "./services/api_service";
import { ChatService } from "./services/chat_service";
import { IndexedDbService } from "./services/indexed_db_service";
import { InitializationService } from "./services/initialization_service";
import { LlmService } from "./services/llm_service";
import { NotebookService } from "./services/notebook_service";
import { PromptHistoryService } from "./services/prompt_history_service";
import { RouterService } from "./services/router_service";
import { ScrollService } from "./services/scroll_service";
import { SettingsService } from "./services/settings_service";
import { StorageService } from "./services/storage_service";
import { ToastService } from "./services/toast_service";

/**
 * Defines a map of services to their identifier
 */
export function makeServiceProvider(self: Core) {
  const serviceProvider = {
    get routerService() {
      return self.getService(RouterService);
    },
    get initializationService() {
      return self.getService(InitializationService);
    },
    get promptHistoryService() {
      return self.getService(PromptHistoryService);
    },
    get apiService() {
      return self.getService(ApiService);
    },
    get chatService() {
      return self.getService(ChatService);
    },
    get indexedDbService() {
      return self.getService(IndexedDbService);
    },
    get notebookService() {
      return self.getService(NotebookService);
    },
    get llmService() {
      return self.getService(LlmService);
    },
    get scrollService() {
      return self.getService(ScrollService);
    },
    get settingsService() {
      return self.getService(SettingsService);
    },
    get storageService() {
      return self.getService(StorageService);
    },
    get toastService() {
      return self.getService(ToastService);
    },
  };

  return serviceProvider;
}
