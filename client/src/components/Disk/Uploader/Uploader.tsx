import React from 'react'
import {useDispatch} from "react-redux"

import UploadFile from "./UploadFile"

import {useTypedSelector} from "../../../hooks/useTypedSelector"
import {hideUploader} from "../../../redux/reducers/uploadReducer"

import './uploader.scss'

const Uploader = () => {
    const files  = useTypedSelector(state => state.upload.files)
    const dispatch = useDispatch()
    const isVisible = useTypedSelector(state => state.upload.isVisible)

    const handleUploader = () => {
        dispatch(hideUploader())
    }
    return ( isVisible ?
        <div className="uploader">
            <div className="uploader__header">
                <div className="uploader__title">Загрузки</div>
                <button className="uploader__close" onClick={() => handleUploader()}>X</button>
            </div>
            {files.map(file =>
                <UploadFile key={file.id} file={file}/>
            )}
        </div> : null
    )
}

export default Uploader