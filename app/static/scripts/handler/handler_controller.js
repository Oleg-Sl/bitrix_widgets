

export class HandlerController {
    constructor(selector, apiClient) {
        this.selector = selector;
        this.apiClient = apiClient;
        this.container = document.querySelector(selector);

    }

    initialization() {

    }
}
