

export class BitrixClient {

    // callMethodPromise(method, params) {
    //     return new Promise((resolve, reject) => {
    //         BX24.callMethod(
    //             method,
    //             params,
    //             (result) => {
    //                 resolve(result);
    //             }
    //         );
    //     });
    // }

    async callMethodPromise(method, params = {}) {
        return new Promise((resolve, reject) => {
            let callback = result => {
                if (result.status != 200 || result.error()) {
                    console.log(`${result.error()} (callMethod ${method}: ${JSON.stringify(params)})`);
                    return reject(result.error());
                }
                return resolve(result.data());
            };
            BX24.callMethod(method, params, callback);
        });
    }

    async callMethod(method, params) {
        return await this.callMethodPromise(method, params);
    }

    async callBatch(cmd) {
        return await this.callMethodPromise('batch', {
            halt: 0,
            cmd: cmd
        });
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

    async fitWindow() {
        BX24.fitWindow();
    }


} 
