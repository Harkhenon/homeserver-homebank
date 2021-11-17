import { axiosConfigured } from "src/store";

export const getAccountsMiddleware = store => next => async action => {

    if(action.type === "GET_ACCOUNTS_WITH_TYPES") {

        console.info("Retrieving accounts data from backend");
        const response = await axiosConfigured.get('/api/bank/accounts');
        action.accountsWithTypes = response.data.accounts;
        return next(action);
        
    } else {
        next(action);
    }

}