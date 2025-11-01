import { WidgetManager } from './widget_manager/widget_manager.js';
import { BitrixClient } from './bitrix_api.js';


document.addEventListener("DOMContentLoaded", () => {
    BX24.ready(function() {
        const apiClient = new BitrixClient();
        const widgetManager = new WidgetManager(apiClient);

        widgetManager.initialization();
    })
})
