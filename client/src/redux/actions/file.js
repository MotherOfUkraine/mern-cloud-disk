import axios from 'axios'
import {addFile, setFiles} from "../reducers/fileReducer"
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
            alert(e.response.data.message)
        }
    }
}

export const createDir = (dirId, name) =>{
    return async dispatch =>{
        try {
            const res = await axios.post(`http://localhost:5000/api/files`,{
                name,
                parent: dirId,
                type: 'dir'
            },
                {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(addFile(res.data))
        }
        catch (e){
            alert(e.response.data.message)
        }
    }
}