import axios from 'axios'
import {addFile, deleteFileAction, setFiles} from "../reducers/fileReducer"
import {addUploadFile, progressUploadFile, showUploader} from "../reducers/uploadReducer";
import {setIsLoader} from "../reducers/appReducer";

export const getFiles = (dirId: string, sort: string) =>{
    return async (dispatch: any) =>{
        try {
            dispatch(setIsLoader(true))
            let url = `http://localhost:5000/api/files`
            if (dirId) {
                url = `http://localhost:5000/api/files?parent=${dirId}`
            }
            if (sort) {
                url = `http://localhost:5000/api/files?sort=${sort}`
            }
            if (dirId && sort) {
                url = `http://localhost:5000/api/files?parent=${dirId}&sort=${sort}`
            }
            const res = await axios.get(url,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(setFiles(res.data))
        }
        catch (e){
            alert(e.response.data.message)
        }
        finally {
            dispatch(setIsLoader(false))
        }
    }
}

export const createDir = (dirId: string, name: string) =>{
    return async (dispatch: any) =>{
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

export const uploadFile = (file: any, dirId: string) =>{
    return async (dispatch: any) =>{
        try {
            const formData = new FormData()
            formData.append('file', file)
            if(dirId){
                formData.append('parent', dirId)
            }
            const uploadFile = {id: Date.now(),name: file.name, progress: 0}
            dispatch(showUploader())
            dispatch(addUploadFile(uploadFile))
            const res = await axios.post(`http://localhost:5000/api/files/upload`, formData,
                {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                    onUploadProgress: progressEvent => {
                        const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                        console.log('total', totalLength)
                        if(totalLength){
                            uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                            dispatch(progressUploadFile(uploadFile))
                        }
                    }})
            dispatch(addFile(res.data))
        }
        catch (e){
            alert(e?.response?.data?.message)
        }
    }
}

export const downloadFile = async (file: any) => {
    const response = await fetch(`http://localhost:5000/api/files/download?id=${file._id}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    if (response.status === 200) {
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = file.name
        document.body.appendChild(link)
        link.click()
        link.remove()
    }
}

export const deleteFile = (file: any) => {
    return async (dispatch: any) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/files?id=${file._id}`,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(deleteFileAction(file._id))
            alert(res.data.message)
        } catch (e) {
            alert(e?.response?.data?.message)
        }
    }
}

export const searchFile = (search: string) => {
    return async (dispatch: any) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/files/search?search=${search}`,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(setFiles(res.data))
        } catch (e) {
            alert(e?.response?.data?.message)
        }
        finally {
            dispatch(setIsLoader(false))
        }
    }
}