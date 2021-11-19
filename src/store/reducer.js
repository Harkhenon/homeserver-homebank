import { stateToStorage } from 'src/utility/stateToStorage';

const initialState = {
    visibility: false,
    loading: false,
    lang: "fr"
}

const TOGGLE_VISIBILITY = "TOGGLE_VISIBILITY";
const GET_ACCOUNTS_WITH_TYPES = "GET_ACCOUNTS_WITH_TYPES";
const SET_CURRENT_ACCOUNT = "SET_CURRENT_ACCOUNT";
const SET_CURRENT_MOOVE_TYPE = "SET_CURRENT_MOOVE_TYPE";
const SET_CURRENT_MOOVE_ID = "SET_CURRENT_MOOVE_ID";
const CONTROL_FORM_INPUT = "CONTROL_FORM_INPUT";
const CONTROL_FORM_ERRORS = "CONTROL_FORM_ERRORS";
const TOGGLE_LOADING = "TOGGLE_LOADING";
const SELECT_LANG = "SELECT_LANG";

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_ACCOUNTS_WITH_TYPES: {
            stateToStorage({
                ...state,
                accountsWithTypes: action.accountsWithTypes,
            });
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
        case SET_CURRENT_MOOVE_TYPE: {
            return {
                ...state,
                currentMoove: action.currentMoove,
            }
        }
        case SET_CURRENT_MOOVE_ID: {
            return {
                ...state,
                currentMooveId: action.currentMooveId,
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
        case TOGGLE_VISIBILITY: {
            return {
                ...state,
                visibility: !state.visibility,
            }
        }
        case TOGGLE_LOADING: {
            return {
                ...state,
                loading: !state.loading,
            }
        }
        case SELECT_LANG: {
            return {
                ...state,
                lang: action.lang,
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
    currentAccount,
});

export const setCurrentMoove = (currentMoove) => ({
    type: SET_CURRENT_MOOVE_TYPE,
    currentMoove
});

export const setCurrentMooveId = (currentMooveId) => ({
    type: SET_CURRENT_MOOVE_ID,
    currentMooveId
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

export const toggleVisibility = () => ({
    type: TOGGLE_VISIBILITY,
})

export const toggleLoading = () => ({
    type: TOGGLE_LOADING,
})

export const selectLang = (lang) => ({
    type: SELECT_LANG,
    lang
}); 

export default reducer;