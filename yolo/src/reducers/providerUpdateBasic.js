
    import { 
        PROVIDER_UPDATE_IS_ERROR, 
        PROVIDER_UPDATE_IS_LOADING, 
        PROVIDER_UPDATE_IS_SUCCESS 
    } from '../types/provider';
    
    let defaultState = {
        isLoading: false,
        success: '',
        error: ''
    }
    
    const updateProviderReducer = (state=defaultState, action) => {
        console.log(action.type,action.payload)
        if(action.type ===PROVIDER_UPDATE_IS_LOADING) {
            return {
                ...state,
                isLoading: action.payload
            }
        }
        if(action.type === PROVIDER_UPDATE_IS_ERROR) {
            return {
                ...state,
                error: action.payload
    
            }
        }
        if(action.type ===  PROVIDER_UPDATE_IS_SUCCESS) {
            console.log(action.payload)
            return {
                ...state,
                success: action.payload
            }
        }
        return state;
    }
    
    export default updateProviderReducer;
