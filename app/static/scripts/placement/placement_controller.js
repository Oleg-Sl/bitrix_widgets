

export class PlacementController {
    constructor(selector, apiClient) {
        this.selector = selector;
        this.apiClient = apiClient;
        this.container = document.querySelector(selector);

        this.availableEvents = null;
        this.registeredEvents = null;

    }

    async initialization() {
        const eventsData = await this.getEvents();
        console.log('eventsData = ', eventsData);
        this.availableEvents = eventsData?.availableEvents;
        this.registeredEvents = eventsData?.registeredEvents;

    }

    async getEvents() {
        return await this.apiClient.callBatch({
            availableEvents: 'events',
            registeredEvents: 'event.get'
        });
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
