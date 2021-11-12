import { axiosConfigured } from "src/store";

export const getAccountsMiddleware = store => next => action => {

    if(action.type === "GET_ACCOUNTS_WITH_TYPES") {

        console.info("Retrieving accounts data from backend");
        axiosConfigured.get('/api/bank/accounts')
            .then((result) => {
                const { hash, accounts } = result.data;
                action.accountsWithTypes = accounts;
                action.hash = hash;
                return next(action);
            })
            .catch((error) => {
                action.accountsWithTypes = error;
                return next(action);
            });
    }

    next(action);
}