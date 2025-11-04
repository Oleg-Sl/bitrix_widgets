

export class PlacementTemplate {
    static createTable(awailablePlacements, registredPlacements) {
        console.log('awailablePlacements = ', awailablePlacements);
        console.log('registredPlacements = ', registredPlacements);
        return `
            ${this.createStyles()}
            <div class="bx24_events__table_events_container">
                ${this.createPlacementsTable(registredPlacements)}
            </div>
            <div>
                ${this.registerPlacementsTable(awailablePlacements)}
            </div>
        `;
    }

    static registerPlacementsTable(awailablePlacements) {
        console.log('awailablePlacements = ', awailablePlacements);
        return `
            <h4>Регистрация виджета</h4>
            <div class="border border-1 rounded p-3">
                <div class="bx24_events__type_event">
                    <label for="name_placementt" class="form-label">Идентификатор места встройки виджета</label>
                    <select class="form-select chosen-select" aria-label="Default select example" id="name_placement" style="display: none;">
                        ${this.getOptionsHTML(awailablePlacements)}
                    </select>   
                </div>
                <div class="bx24_events__handler_event">
                    <label for="url_placement" class="form-label">URL обработчика места встройки виджета</label>
                    <input class="form-control" type="text" placeholder="..." aria-label="input example" id="url_placement">
                </div>
                <div class="bx24_events__handler_event">
                    <label for="title_placement" class="form-label">Название виджета</label>
                    <input class="form-control" type="text" placeholder="..." aria-label="input example" id="title_placement">
                </div>
                <div class="bx24_events__handler_event">
                    <label for="description_placement" class="form-label">Описание виджета</label>
                    <input class="form-control" type="text" placeholder="..." aria-label="input example" id="description_placement">
                </div>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-2 register-placement">
                    <button class="btn btn-primary me-md-2" type="button">Зарегистрировать</button>
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
                        <th scope="col">Место встройки</th>
                        <th scope="col">URL обработчика</th>
                        <th scope="col">Название</th>
                        <th scope="col">Описание</th>
                        <th scope="col">Опции</th>
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

    static generatePlacementsTbodyHTML(placements) {
        let content = '';
        for (let placement of placements) {
            content += this.getPlacementsTbodyHTML(placement.placement, placement.handler, placement.title, placement.description, placement.options);
        }
        return content;
    }
    
    static getPlacementsTbodyHTML(placement, handler, title, description, options) {
        return `
            <tr data-placement="${placement}" data-handler="${handler}" data-title="${title}" data-connector="${description}">
                <td scope="row">${placement}</td>
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
