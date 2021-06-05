export interface userState {
    currentUser: {
        id: string,
        email: string,
        diskSpace: number | null,
        useSpace: number | null
    },
    isAuth: boolean
}

export enum userActionsTypes {
    SET_USER = 'SET_USER',
    LOGOUT = 'LOGOUT',
}

interface setUserAction {
    type: userActionsTypes.SET_USER,
    payload: {
        id: string,
        email: string,
        diskSpace: number,
        useSpace: number
    }
}

interface logoutAction {
    type: userActionsTypes.LOGOUT
}

export type userAction = setUserAction | logoutAction