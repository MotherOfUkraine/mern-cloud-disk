import React from 'react'
import {useDispatch} from "react-redux";
import {removeUploadFile} from "../../../redux/reducers/uploadReducer";

interface UploadFileProps {
    file: {
        id: number
        name: string
        progress: number
    }
}

const UploadFile = ({file}: UploadFileProps) => {

    const dispatch = useDispatch()
    const hideUploadFileHandler = (id: number) => {
        dispatch(removeUploadFile(id))
    }
    return (
        <div className="upload-file">
            <div className="upload-file__header">
                <div className="upload-file__name">{file.name}</div>
                <button className="upload-file__remove" onClick={() => hideUploadFileHandler(file.id)}>X</button>
            </div>
            <div className="upload-file__progress-bar">
                <div className="upload-file__upload-bar" style={{width: file.progress + "%"}}/>
                <div className="upload-file__percent">{file.progress}%</div>
            </div>
        </div>
    )
}

export default UploadFile