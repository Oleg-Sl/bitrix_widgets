import { PlacementController } from './placement/placement_controller.js';
import { HandlerController } from './handler/handler_controller.js';


export class WigetManager {
    constructor(apiClient) {
        this.apiClient = apiClient;

        this.createContainers();
        this.placementController = new PlacementController('#containerPlacements', this.apiClient);
        this.hanglerController = new HandlerController('#containerHandlers', this.apiClient);
    }

    async initialization() {
        this.placementController.initialization();
        this.hanglerController.initialization();
    }

    createContainers() {
        const contentHTML = `
            <div>
                <div id="containerPlacements"></div>
                <div id="containerHandlers"></div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', contentHTML);
    }
}
