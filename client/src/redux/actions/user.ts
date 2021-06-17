import axios from 'axios'
import {setUser} from "../reducers/userReducer";
import {setIsLoader} from "../reducers/appReducer";

export const registration = async (email: string, password: string) => {
        try {
            const res = await axios.post(`http://localhost:5000/api/auth/registration`, {
                email,
                password
            })
            alert(res.data.message)
        } catch (e) {
            alert(e.response.data.message)
        }
}

export const login =  (email: string, password: string) => {
    return async (dispatch: any) => {
        try {
            dispatch(setIsLoader(true))
            const res = await axios.post(`http://localhost:5000/api/auth/login`, {
                email,
                password
            })
            dispatch(setUser(res.data.user))
            localStorage.setItem('token', res.data.token)
        } catch (e) {
            alert(e.response.data.message)
        }
        finally {
            dispatch(setIsLoader(false))
        }
    }
}

export const auth =  () => {
    return async (dispatch: any) => {
        try {
            dispatch(setIsLoader(true))
            const res = await axios.get(`http://localhost:5000/api/auth/auth`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(res.data.user))
            localStorage.setItem('token', res.data.token)
        } catch (e) {
            localStorage.removeItem('token')
        }
        finally {
            dispatch(setIsLoader(false))
        }
    }
}