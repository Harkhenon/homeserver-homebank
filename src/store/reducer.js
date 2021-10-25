const initialState = {
    visibility: true,
}

const GET_ACCOUNTS_WITH_TYPES = "GET_ACCOUNTS_WITH_TYPES";
const SET_CURRENT_ACCOUNT = "SET_CURRENT_ACCOUNT";

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_ACCOUNTS_WITH_TYPES: {
            return {
                ...state,
                accountsWithTypes: action.accountsWithTypes,
            }
        }
        case SET_CURRENT_ACCOUNT: {
            return {
                ...state,
                currentAccount: action.currentAccount,
            }
        }
        default: {
            return state;
        }
    }
}

export const getAccountsWithTypes = (accountsWithTypes) => ({
    type: GET_ACCOUNTS_WITH_TYPES,
    accountsWithTypes,
});

export const setCurrentAccount = (currentAccount) => ({
    type: SET_CURRENT_ACCOUNT,
    currentAccount
});

export default reducer;