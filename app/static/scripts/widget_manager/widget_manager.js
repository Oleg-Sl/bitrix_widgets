import { WidgetController } from './widget_controller.js';


export class App {
    constructor(apiClient) {
        // this.container = container;
        this.apiClient = apiClient;
        
        this.widgetControllerContainer = null;
        this.handlersContainer = null;
        
        this.createContainers();
        
        this.widgetController = new WidgetController(this.widgetControllerContainer, this.apiClient);
        // this.hanglersContainer
    }

    createContainers() {
        this.widgetControllerContainer = document.querySelector("#containerEventsManagement");

        this.widgetControllerContainer = document.createElement('div');
        this.widgetControllerContainer.id = "containerEventsController";

        this.hanglersContainer = document.createElement('div');
        this.hanglersContainer.id = "containerHandlers";

        document.body.append(this.widgetControllerContainer);
        document.body.append(this.hanglersContainer);
    }

    async initialization() {
        this.widgetController.initialization();

    }

}
