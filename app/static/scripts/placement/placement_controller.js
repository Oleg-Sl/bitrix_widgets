import { PlacementTemplate } from './placement_template.js';


export class PlacementController {
    constructor(selector, apiClient) {
        this.template = PlacementTemplate;
        this.selector = selector;
        this.apiClient = apiClient;
        this.container = document.querySelector(selector);

        this.registredPlacements = null;
        this.awailablePlacements = null;

        this.tablePlacements = null;
        this.buttonCreateWidget = null;
        this.buttonSpinnerCreateWidget = null;
        this.inputPlacementName = null;
        this.inputPlacementUrl = null;
        this.inputPlacementTitle = null;
        this.inputPlacementDescribe = null;
        this.alertPlacement = null;
    }

    async initialization() {
        this.placementsData = await this.getPlacements();
        this.registredPlacements = this.placementsData?.result?.registredPlacements;
        this.awailablePlacements = this.placementsData?.result?.awailablePlacements;

        console.log('this.registredPlacements = ', this.registredPlacements);
        this.render();

        this.tablePlacements = document.querySelector('#tablePlacements');
        this.buttonCreateWidget = document.querySelector('#buttonCreateWidget');
        this.buttonSpinnerCreateWidget = document.querySelector('#buttonSpinnerCreateWidget');
        this.inputPlacementName = document.querySelector('#name_placement');
        this.inputPlacementUrl = document.querySelector('#url_placement');
        this.inputPlacementTitle = document.querySelector('#title_placement');
        this.inputPlacementDescribe = document.querySelector('#description_placement');
        this.alertPlacement = document.querySelector('#placementAlert');

        this.initHandlers();
        this.apiClient.fitWindow();
    }

    initHandlers() {
        if (this.buttonCreateWidget) {
            this.buttonCreateWidget.addEventListener('click', this.registerWidget.bind(this));
        }
        this.container.addEventListener('click', this.unregisterWidget.bind(this));
    }

    render() {
        const contentHTML = this.template.createTable(this.awailablePlacements, this.registredPlacements);
        this.container.innerHTML = contentHTML;
        $(".chosen-select").chosen({
            search_contains: true
        });
    }

    async registerWidget() {
        this.hideAlert();
        const placementName = this.inputPlacementName.value;
        const placementUrl = this.inputPlacementUrl.value;
        const placementTitle = this.inputPlacementTitle.value;
        const placementDescribe = this.inputPlacementDescribe.value;

        this.buttonCreateWidget.diabled = true;
        this.buttonSpinnerCreateWidget.classList.remove('d-none');
        try {
            const result = await this.registerPlacements(placementName, placementUrl, placementTitle, placementDescribe);
            this.addRowWidget(placementName, placementUrl, placementTitle, placementDescribe);
            console.log('The widget has been successfully registered.');
        } catch(error) {
            console.error('Widget registration error: ', error);
            this.showAlert(error);
        } finally {
            this.buttonCreateWidget.disabled = false;
            this.buttonSpinnerCreateWidget.classList.add('d-none');
            this.apiClient.fitWindow();
        }
    }

    async unregisterWidget(event) {
        this.hideAlert();
        const target = event.target;
        if (!target.classList.contains('placement_remove')) {
            return;
        }

        const row = target.closest('tr');
        const placementName = row.dataset.placement;
        const placementUrl = row.dataset.handler;
        try {
            const result = await this.unregisterPlacements(placementName, placementUrl);
            this.removeRowWidget(row);
        } catch(error) {
            console.error('Widget unregistration error: ', error);
            this.showAlert(error);
        } finally {
            this.buttonCreateWidget.disabled = false;
            this.buttonSpinnerCreateWidget.classList.add('d-none');
            this.apiClient.fitWindow();
        }
    }

    showAlert(message) {
        this.alertPlacement.innerHTML = message;
        this.alertPlacement.classList.remove('d-none');
    }

    hideAlert() {
        this.alertPlacement.innerHTML = '';
        this.alertPlacement.classList.add('d-none');
    }

    async getPlacements() {
        return await this.apiClient.callBatch(
            {
                registredPlacements: 'placement.get',
                awailablePlacements: 'placement.list'
            }
        );
    }

    async registerPlacements(placementName, placementUrl, placementTitle, placementDescribe) {
        return await this.apiClient.callMethod(
            "placement.bind",
            { 
                "PLACEMENT": placementName,
                "HANDLER": placementUrl,
                "OPTIONS": {},
                "TITLE": placementTitle,
                "DESCRIPTION": placementDescribe,
            }
        );
    }

    async unregisterPlacements(placementName, placementUrl) {
        return await this.apiClient.callMethod(
            "placement.unbind",
            { 
                "PLACEMENT": placementName,
                "HANDLER": placementUrl
            }
        );
    }

    addRowWidget(placement, handler, title, description) {
        const rowHTML = this.template.getPlacementsRowTbodyHTML(placement, handler, title, description);
        this.tablePlacements.querySelector('tbody').insertAdjacentHTML('beforeend', rowHTML);
    }

    removeRowWidget(row) {
        row.remove();
    }
}


// export class WidgetController {
//     constructor(container, apiClient) {
//         this.container = container;
//         this.apiClient = apiClient;

//         this.availableEvents = [];
//         this.registeredEvents = [];

//     }

//     async initialization() {
//         this.availableEvents = await this.apiClient.callMethod("events", {});
//         this.registeredEvents = await this.apiClient.callMethod("event.get", {});
//         console.log('this.availableEvents = ', this.availableEvents);
//         console.log('this.registeredEvents = ', this.registeredEvents);

//         this.render(this.availableEvents, this.registeredEvents);

//         this.elemSelectTypeEvent = this.container.querySelector(".bx24_events__type_event select");
//         this.elemSelectNameEvent = this.container.querySelector(".bx24_events__name_event select");
//         this.elemInputHandlerEvent = this.container.querySelector(".bx24_events__handler_event input");
//         this.elemInputSourceEvent = this.container.querySelector(".bx24_events__source_event input");
//         this.btnAddEvent = this.container.querySelector(".bx24_events__add_event button");
//         this.setOfflineEvent(this.elemSelectTypeEvent.value)

//         // this.initHandler();
//         BX24.fitWindow();
//     }

//     initHandler() {
//         // Удаление зарегистрированного события
//         this.container.addEventListener("click", async (e) => {
//             let elemRemoveEvent = e.target.classList.contains("bx24_events__table_events_remove_row_i");
//             let elemTr = e.target.closest("tr");
//             if (elemRemoveEvent && elemTr) {
//                 let isRemoveEvent = confirm(`Удалить событие \"${elemTr.dataset.event}\"?`);
//                 if (!isRemoveEvent) return;
//                 let parameters = {
//                     event: elemTr.dataset.event,
//                     event_type: elemTr.dataset.type
//                 };
//                 if (elemTr.dataset.type == "online") {
//                     parameters.handler = elemTr.dataset.handler;
//                 }
//                 let resDel = await this.apiClient.callMethod("event.unbind", parameters);
//                 if (resDel && resDel.count) {
//                     elemTr.remove();
//                 }
//             }
//         })

//         // Изменение типа события
//         this.elemSelectTypeEvent.addEventListener("change", (e) => {
//             this.setOfflineEvent(e.target.value);
//         })

//         // Кнопка содания события
//         this.btnAddEvent.addEventListener("click", (e) => {
//             this.addEvent();
//         })
//     }

//     // Регистрирование события
//     async addEvent() {
//         let isOffline = 0;
//         let parameters = {
//             event: this.elemSelectNameEvent.value,
//             event_type: this.elemSelectTypeEvent.value,
//         };
//         if (this.elemSelectTypeEvent.value == "online") {
//             parameters.handler = this.elemInputHandlerEvent.value;
//         } else {
//             isOffline = 1
//             parameters.auth_connector = this.elemInputSourceEvent.value;
//         }
//         console.log("Параметры создаваемого события: ", parameters);
//         let resAddEvent = await this.apiClient.callMethod("event.bind", parameters);
//         console.log("Результат создания события: ", resAddEvent);
//         if (resAddEvent) {
//             this.addRecordEventToTable(parameters.event, isOffline, parameters.handler, parameters.auth_connector);
//         }
//     }

//     addRecordEventToTable(eventName, isOffline, eventHandler, eventConnector) {
//         this.tBody = this.container.querySelector(".bx24_events__table_events tbody");
//         let contentHTML = getRowEventHTML(eventName, isOffline, eventHandler, eventConnector);
//         this.tBody.insertAdjacentHTML("beforeend", contentHTML);
//     }

//     setOfflineEvent(eventType) {
//         if (eventType == "offline") {
//             this.elemInputHandlerEvent.setAttribute("disabled", "");
//             this.elemInputSourceEvent.removeAttribute("disabled");
//         } else {
//             this.elemInputHandlerEvent.removeAttribute("disabled");
//             this.elemInputSourceEvent.setAttribute("disabled", "");
//         }
//     }

//     render(availableEvents, registeredEvents) {
//         const contentRegistredTableHTML = WidgetManagerTemplate.createTable(availableEvents);
//         const contentHTML = WidgetManagerTemplate.createAppHTML(contentRegistredTableHTML, registeredEvents);
//         this.container.innerHTML = contentHTML;
//     }
// }
