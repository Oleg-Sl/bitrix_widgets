import { WidgetController } from './widget_controller.js';


export class WigetManager {
    constructor(apiClient) {
        this.apiClient = apiClient;
        
        this.widgetControllerContainer = null;
        this.handlersContainer = null;
        
        this.createContainers();
        this.widgetController = new WidgetController(this.widgetControllerContainer, this.apiClient);
        // this.hanglerController = new HandlerController(this.handlersContainer, this.apiClient);
    }

    async initialization() {

        this.widgetController.initialization();
        // this.hanglerController.initialization();
    }

    createContainers() {
        this.widgetControllerContainer = document.querySelector("#containerEventsManagement");

        this.widgetControllerContainer = document.createElement('div');
        this.hanglersContainer = document.createElement('div');

        this.widgetControllerContainer.id = "containerEventsController";
        this.hanglersContainer.id = "containerHandlers";

        document.body.append(this.widgetControllerContainer);
        document.body.append(this.hanglersContainer);
    }
}
