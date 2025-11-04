import { BitrixClient } from './bitrix_api.js';
import { WigetManager } from './widget_manager.js';


document.addEventListener("DOMContentLoaded", () => {
    BX24.ready(function() {
        const apiClient = new BitrixClient();
        const widgetManager = new WigetManager(apiClient);

        widgetManager.initialization();
    })
})
