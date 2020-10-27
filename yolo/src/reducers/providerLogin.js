/**
 * @fileoverview Reducer for provider login.
 */

import {
    PROVIDER_LOGIN, PROVIDER_LOGIN_LOADING_TOGGLE,
    PROVIDER_LOGIN_IS_FAILURE, PROVIDER_LOGIN_IS_SUCCESS
} from '../types/provider';

let defaultState = {
    isLoading: false,
    error: '',
    success: ''
}

const loginProviderReduer = (state=defaultState, action) => {
<<<<<<< HEAD
    console.log(action,989922);
=======
    // console.log(action,989922);
>>>>>>> a99d4e44db915ab24bd957a18280f4c4cbc5e7d1
    if(action.type === PROVIDER_LOGIN) {
        return {
            ...state,
            email: action.email,
            password: action.password
        }
    }
    if(action.type === PROVIDER_LOGIN_IS_FAILURE) {
        return {
            ...state,
            error: action.payload
        }
    }
    if(action.type === PROVIDER_LOGIN_IS_SUCCESS) {
<<<<<<< HEAD
        console.log(action.payload,989922);
=======
        // console.log(action.payload,989922);
>>>>>>> a99d4e44db915ab24bd957a18280f4c4cbc5e7d1
        return {
            ...state,
            success: action.payload
        }
    }
    if(action.type === PROVIDER_LOGIN_LOADING_TOGGLE) {
        return {
            ...state,
            isLoading: action.payload
        }
    }
    return state;
}

export default loginProviderReduer;