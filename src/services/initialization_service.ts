

import { observable } from "mobx";

import { RouterService } from "./router_service";
import { ApiService } from "./api_service";
import { Service } from "./service";

interface ServiceProvider {
  apiService: ApiService;
  routerService: RouterService;
}

export class InitializationService extends Service {
  constructor(private readonly sp: ServiceProvider) {
    super();
  }

  @observable isAppInitialized = false;

  override async initialize() {
    const { apiService, routerService } = this.sp;

    apiService.initialize();
    routerService.initialize();

    this.isAppInitialized = true;
  }
}
