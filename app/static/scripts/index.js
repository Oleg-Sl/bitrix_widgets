import WidgetManager from './widget_manager/widget_manager.js';
import Bitrix24 from './bitrix24.js';


document.addEventListener("DOMContentLoaded", () => {
    BX24.ready(function() {
        const container = document.querySelector("#containerEventsManagement");
        const apiClient = new Bitrix24();
        const widgetManager = new WidgetManager(container, apiClient);

        widgetManager.initialization();
    })
})
