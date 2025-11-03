

export class BitrixClient {

    callMethodPromise(method, params) {
        return new Promise((resolve, reject) => {
            BX24.callMethod(
                method,
                params,
                (result) => {
                    resolve(result);
                }
            );
        });
    }

    async callMethod(method, params) {
        return await this.callMethodPromise(method, params).answer;
    }

    async runBP(templateId, documentId, params = {}) {
        return await this.callMethodPromise(
            'bizproc.workflow.start',
            {
                TEMPLATE_ID: templateId,
                DOCUMENT_ID: documentId,
                PARAMETERS: params
            }
        );
    }

    async runSmartProcessBP(bpId, entityTypeId, entityId, params = {}) {
        return await this.runBP(
            bpId,
            ['crm', 'Bitrix\\Crm\\Integration\\BizProc\\Document\\Dynamic', `DYNAMIC_${entityTypeId}_${entityId}`],
            params
        )
    }

    async closeApplication() {
        BX24.closeApplication();
    }
} 
