export interface uploadState {
    files: Array<any>,
    isVisible: boolean
}

export enum uploadTypes {
    SHOW_UPLOADER = 'SHOW_UPLOADER',
    HIDE_UPLOADER = 'HIDE_UPLOADER',
    ADD_UPLOAD_FILE = 'ADD_UPLOAD_FILE',
    REMOVE_UPLOAD_FILE = 'REMOVE_UPLOAD_FILE',
    PROGRESS_UPLOAD_FILE = 'PROGRESS_UPLOAD_FILE',
}

interface showUploaderAction {
    type: uploadTypes.SHOW_UPLOADER
}

interface hideUploaderAction {
    type: uploadTypes.HIDE_UPLOADER
}

interface addUploadFileAction {
    type: uploadTypes.ADD_UPLOAD_FILE,
    payload: {
        name: string,
        progress: number
    }
}
interface removeUploadFileAction {
    type: uploadTypes.REMOVE_UPLOAD_FILE,
    payload: number
}

interface progressUploadFileAction {
    type: uploadTypes.PROGRESS_UPLOAD_FILE,
    payload: {
        id: number,
        progress: number
    }
}

export type uploadAction = showUploaderAction | hideUploaderAction | addUploadFileAction | removeUploadFileAction | progressUploadFileAction