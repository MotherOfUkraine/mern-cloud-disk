import {fileAction, fileState, fileTypes} from "../../types/fileType"

const initialState: fileState = {
  files: [],
  currentDir: {
    dirId: null,
    dirName: ''
  },
  dirStack: []
}

const fileReducer = (state = initialState, action: fileAction): fileState => {
  switch (action.type) {
    case fileTypes.SET_FILES: return {...state, files: action.payload}
    case fileTypes.SET_CURRENT_DIR: return {...state, currentDir: action.payload}
    case fileTypes.ADD_FILE: return {...state, files: [...state.files, action.payload]}
    case fileTypes.PUSH_TO_STACK: return {...state, dirStack: [...state.dirStack, action.payload]}
    case fileTypes.DELETE_FILE: return {...state, files: [...state.files.filter(file => file._id !== action.payload)]}
    default: return state
  }
}

export const setFiles = (files: any) => ({type: fileTypes.SET_FILES, payload: files})
export const setCurrentDir = (dirId: string, dirName: string) => ({type: fileTypes.SET_CURRENT_DIR, payload: {dirId, dirName}})
export const addFile = (file: any) => ({type: fileTypes.ADD_FILE, payload: file})
export const pushToStack = (dir: any) => ({type: fileTypes.PUSH_TO_STACK, payload: {...dir}})
export const deleteFileAction = (dirId: string) => ({type: fileTypes.DELETE_FILE, payload: dirId})

export default fileReducer
