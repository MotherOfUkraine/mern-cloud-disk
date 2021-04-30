import React from 'react'

import {useSelector} from "react-redux"
import File from "./File/File"

import './filelist.scss'

const FileList = () => {

    const files = useSelector(state => state.files.files).map(file => <File file={file} key={file._id}/>)
    return (
        <div className="filelist">
            <div className="filelist__header">
                <div className="filelist__name">Назвавние</div>
                <div className="filelist__date">Дата</div>
                <div className="filelist__size">Размер</div>
            </div>
            {
                files
            }
        </div>
    )
}

export default FileList