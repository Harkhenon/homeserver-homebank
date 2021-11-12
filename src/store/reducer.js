const initialState = {
    visibility: true,
}

const GET_ACCOUNTS_WITH_TYPES = "GET_ACCOUNTS_WITH_TYPES";
const SET_CURRENT_ACCOUNT = "SET_CURRENT_ACCOUNT";
const CONTROL_FORM_INPUT = "CONTROL_FORM_INPUT";
const CONTROL_FORM_ERRORS = "CONTROL_FORM_ERRORS";

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_ACCOUNTS_WITH_TYPES: {
            return {
                ...state,
                accountsWithTypes: action.accountsWithTypes,
                hash: action.hash,
            }
        }
        case SET_CURRENT_ACCOUNT: {
            return {
                ...state,
                currentAccount: action.currentAccount,
            }
        }
        case CONTROL_FORM_INPUT: {
            return {
                ...state,
                [action.key]: action.value,
            }
        }
        case CONTROL_FORM_ERRORS: {
            return {
                ...state,
                form_errors: action.errors,
            }
        }
        default: {
            return state;
        }
    }
}

export const getAccountsWithTypes = (accountsWithTypes, hash) => ({
    type: GET_ACCOUNTS_WITH_TYPES,
    accountsWithTypes,
    hash
});

export const setCurrentAccount = (currentAccount) => ({
    type: SET_CURRENT_ACCOUNT,
    currentAccount
});

export const controlFormInput = (key, value) => ({
    type: CONTROL_FORM_INPUT,
    key,
    value
});

export const controlFormErrors = (errors) => ({
    type: CONTROL_FORM_ERRORS,
    errors
});

export default reducer;