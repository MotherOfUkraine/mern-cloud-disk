import axios from 'axios'
import {setFiles} from "../reducers/fileReducer"
export const getFiles = dirId =>{
    return async dispatch =>{
        try {
            const res = await axios.get(`http://localhost:5000/api/files${dirId ? `?parent=${dirId}`: ''}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(setFiles(res.data))
        }
        catch (e){
            alert(e.res.data.message)
        }
    }
}