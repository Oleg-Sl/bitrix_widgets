import { BitrixClient } from '../bitrix_api.js';


export class ProductionScheduleManager {
    constructor(apiClient) {
        this.apiClient = apiClient;
        this.bpId = 1885;
        this.smartTypeId = 179;
    }

    async update_stages(smartId) {
        let result = await this.apiClient.runSmartProcessBP(
            this.bpId,
            this.smartTypeId,
            smartId
        );
        console.log('Update Stages BP started:', result);
        this.apiClient.closeApplication();
    }
}


document.addEventListener("DOMContentLoaded", () => {
    BX24.init(async function() {
        const apiClient = new BitrixClient();
        const productionScheduleManager = new ProductionScheduleManager(apiClient);
        await productionScheduleManager.update_stages(smartId);
    });
});
