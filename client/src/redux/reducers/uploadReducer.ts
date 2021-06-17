import {uploadAction, uploadState, uploadTypes} from "../../types/uploadType"

const initialState: uploadState = {
    files: [],
    isVisible: false
}

const uploadReducer = (state = initialState, action: uploadAction): uploadState => {
    switch (action.type) {
        case uploadTypes.SHOW_UPLOADER: return {...state, isVisible: true}
        case uploadTypes.HIDE_UPLOADER: return {...state, isVisible: false, files: []}
        case uploadTypes.ADD_UPLOAD_FILE:return {...state, files: [...state.files, action.payload]}
        case uploadTypes.REMOVE_UPLOAD_FILE: return {...state, files: [...state.files.filter(file => file.id !== action.payload)]}
        case uploadTypes.PROGRESS_UPLOAD_FILE: return {...state, files: [...state.files.map(file => file.id === action.payload.id ? {...file, progress: action.payload.progress}: {...file})]}
        default: return state
    }
}

export const showUploader = () => ({type: uploadTypes.SHOW_UPLOADER})
export const hideUploader = () => ({type: uploadTypes.HIDE_UPLOADER})
export const addUploadFile = (files: object) => ({type: uploadTypes.ADD_UPLOAD_FILE, payload: files})
export const removeUploadFile = (id: string) => ({type: uploadTypes.REMOVE_UPLOAD_FILE, payload: id})
export const progressUploadFile = (file: object) => ({type: uploadTypes.PROGRESS_UPLOAD_FILE, payload: file})

export default uploadReducer
