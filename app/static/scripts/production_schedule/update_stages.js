import { BitrixClient } from '../bitrix_api.js';


export class ProductionScheduleManager {
    constructor(apiClient) {
        this.apiClient = apiClient;
        this.smartTypeId = 179;
    }

    async update_stages(smartId) {
        let result = await this.apiClient.runBP(
            this.smartTypeId,
            [
                'crm',
                'Bitrix\\Crm\\Integration\\BizProc\\Document\\Dynamic',
                `DYNAMIC_${this.smartTypeId}_${smartId}`
            ]
        );
        console.log('Update Stages BP started:', result);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    BX24.init(async function() {
        const apiClient = new BitrixClient();
        const productionScheduleManager = new ProductionScheduleManager(apiClient);
        await productionScheduleManager.update_stages(smartId);
    });
});
