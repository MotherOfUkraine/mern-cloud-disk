import {appAction, appState, appTypes} from "../../types/appTypes"

const initialState: appState = {
    isLoader: false,
    fileView: 'list'
}

const appReducer = (state = initialState, action: appAction): appState => {
    switch (action.type) {
        case appTypes.SET_IS_LOADER: return {...state, isLoader: action.payload}
        case appTypes.SET_VIEW: return {...state, fileView: action.payload}
        default: return state
    }
}

export const setIsLoader = (isLoader: boolean) => ({type: appTypes.SET_IS_LOADER, payload: isLoader})
export const setView = (fileView: string) => ({type: appTypes.SET_VIEW, payload: fileView})

export default appReducer
