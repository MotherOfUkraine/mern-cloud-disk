import {userAction, userState, userActionsTypes} from "../../types/userType"

const defaultState: userState = {
  currentUser: {
    id: '',
    email: '',
    diskSpace: 0,
    usedSpace: 0
  },
  isAuth: false
}

const userReducer = (state = defaultState, action: userAction): userState =>{
  switch (action.type) {
    case userActionsTypes.SET_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuth: true
      }
    case userActionsTypes.LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state,
        currentUser: {
          id: '',
          email: '',
          diskSpace: 0,
          usedSpace: 0
        },
        isAuth: false
      }
    default:
      return state
  }
}

export const setUser = (user: object) => ({type: userActionsTypes.SET_USER, payload: user})
export const logout = () => ({type: userActionsTypes.LOGOUT})

export default userReducer