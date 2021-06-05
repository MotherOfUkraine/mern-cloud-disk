export interface appState {
    isLoader: boolean,
    fileView: string
}

export enum appTypes {
    SET_IS_LOADER = 'SET_IS_LOADER',
    SET_VIEW = 'SET_VIEW'
}

interface setIsLoaderAction {
    type: appTypes.SET_IS_LOADER,
    payload: boolean
}

interface setViewAction {
    type: appTypes.SET_VIEW,
    payload: string
}

export type appAction = setIsLoaderAction | setViewAction