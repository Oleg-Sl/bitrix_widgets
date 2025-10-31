function callMethodPromise(method, params) {
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


async function runBP(templateId, documentId, params = {}) {
    const result = await callMethodPromise(
        'bizproc.workflow.start',
        {
            TEMPLATE_ID: templateId,
            DOCUMENT_ID: documentId,
            PARAMETERS: params
        }
    );
    return result;
}

async function runSmartProcessBP(bpId, entityTypeId, entityId, params = {}) {
    return await runBP(
        bpId,
        ['crm', 'Bitrix\\Crm\\Integration\\BizProc\\Document\\Dynamic', `DYNAMIC_${entityTypeId}_${entityId}`],
        params
    )
}

async function closeApplication() {
    BX24.closeApplication();
}

export { callMethodPromise, runBP, runSmartProcessBP, closeApplication };
