export interface fileState {
    files: Array<any>,
    currentDir: any,
    dirStack: Array<string>
}

export enum fileTypes {
    SET_FILES = 'SET_FILES',
    SET_CURRENT_DIR = 'SET_CURRENT_DIR',
    ADD_FILE = 'ADD_FILE',
    PUSH_TO_STACK = 'PUSH_TO_STACK',
    POP_FROM_STACK = 'POP_FROM_STACK',
    DELETE_FILE = 'DELETE_FILE'
}

interface setFilesAction {
    type: fileTypes.SET_FILES,
    payload: any
}

interface addFileAction {
    type: fileTypes.ADD_FILE,
    payload: any
}

interface setCurrentDirAction {
    type: fileTypes.SET_CURRENT_DIR,
    payload: any
}

interface pushToStackAction {
    type: fileTypes.PUSH_TO_STACK,
    payload: string
}

interface popFromStackAction {
    type: fileTypes.POP_FROM_STACK,
    payload: string
}

interface deleteFileAction {
    type: fileTypes.DELETE_FILE,
    payload: string
}

export type fileAction = setFilesAction | addFileAction | setCurrentDirAction | pushToStackAction | popFromStackAction | deleteFileAction