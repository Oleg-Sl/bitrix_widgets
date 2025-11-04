

export class PlacementTemplate {
    static createPlacementsTable(placements) {
        return `
            ${this.createStyles()}
            <div class="bx24_events__table_events_container">
                ${this.createPlacementsTable(registeredEvents)}
            </div>
        `;
    }

    static createAvailableEventsTable(availableEvents) {
        return `
            <h4>Регистрация событий</h4>
            <div class="border border-1 rounded p-3">
                <div class="bx24_events__type_event">
                    <label for="registry_event__selectTypeEvent" class="form-label">Тип события</label>
                    <select class="form-select bx24_events__registry_event_select" aria-label="Default select example" id="registry_event__selectTypeEvent">
                        <option value="online" selected>Онлайн</option>
                        <option value="offline">Оффлайн</option>
                    </select>    
                </div>
                <div class="bx24_events__name_event">
                    <label for="name_event__selectTypeEvent" class="form-label">Название события</label>
                    <select class="form-select" aria-label="Default select example" id="name_event__selectTypeEvent">
                        ${this.getOptionsHTML(availableEvents)}
                    </select>    
                </div>
                <div class="bx24_events__handler_event">
                    <label for="name_event__handlerEvent" class="form-label">URL обработчика</label>
                    <input class="form-control" type="text" placeholder="..." aria-label="input example" id="name_event__handlerEvent">
                </div>
                <div class="bx24_events__source_event">
                    <label for="name_event__sourceKey" class="form-label">Ключ источника</label>
                    <input class="form-control" type="text" placeholder="..." aria-label="input example" id="name_event__sourceKey">
                </div>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-2 bx24_events__add_event">
                    <button class="btn btn-primary me-md-2" type="button">Добавить</button>
                </div>
            </div>
        `;
    }

    static createPlacementsTable(placements) {
        let content = `
            <table class="table table-hover table-bordered caption-top bx24_events__table_events">
                <caption>Список установленных обработчиков событий</caption>
                <thead>
                    <tr>
                        <th scope="col">Событие</th>
                        <th scope="col">Тип события</th>
                        <th scope="col">URL обработчика</th>
                        <th scope="col">Коннектор</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    ${this.generatePlacementsTbodyHTML(placements)}
                </tbody>
            </table>
        `;
        return content;
    }
        //     {
        //     "placement": "CRM_DEAL_LIST_TOOLBAR",
        //     "userId": 0,
        //     "handler": "https://myapp.com/?handler=1",
        //     "options": [],
        //     "title": "Add invoice",
        //     "description": "",
        //     "langAll": {
        //         "ru": {
        //             "TITLE": "Add invoice",
        //             "DESCRIPTION": "",
        //             "GROUP_NAME": "Documents"
        //         }
        //     }
        // },

    static generatePlacementsTbodyHTML(placements) {
        let content = '';
        for (let placement of placements) {
            content += this.getPlacementsTbodyHTML(placement.placement, placement.handler, placement.title, placement.description, placement.options);
        }
        return content
    }
    
    static getPlacementsTbodyHTML(placement, handler, title, description, options) {
        return `
            <tr data-placement="${placement}" data-handler="${handler}" data-title="${title}" data-connector="${description}">
                <td scope="row">${placement}</td>
                <td>${typeEventRus}</th>
                <td>${handler || ""}</td>
                <td>${title || ""}</td>
                <td>${description || ""}</td>
                <td>${options}</td>
                <td>
                    <div class="table-cell-settings bx24_events__table_events_remove_row">
                        <i class="bi bi-trash bx24_events__table_events_remove_row_i" title="Удалить"></i>
                    </div>
                </td>
            </tr>
        `;
    }

    static createStyles() {
        return `
            <style type="text/css">
                .bx24_events__table_events_remove_row {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .bx24_events__table_events_remove_row i {
                    display: inline-block;
                    margin: 2px;
                    color: #797979;
                    font-size: 18px;
                    cursor: pointer;
                }
                .bx24_events__table_events_remove_row i::before {
                    font-weight: 700 !important;
                }
                .bx24_events__table_events_remove_row i:hover {
                    color: #000000;
                }
            </style>
        `;
    }

    static getOptionsHTML(eventsList) {
        let contentHTML = '';
        for (let event of eventsList) {
            contentHTML += `<option value="${event}">${event}</option>`;
        }
        return contentHTML;
    }
}
