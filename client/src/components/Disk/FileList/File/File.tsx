import React from 'react'
import {useDispatch} from "react-redux"

import {pushToStack, setCurrentDir} from "../../../../redux/reducers/fileReducer"
import {useTypedSelector} from "../../../../hooks/useTypedSelector"
import {deleteFile, downloadFile} from "../../../../redux/actions/file"
import {sizeFormat} from "../../../../utils/sizeFormat";

import dirLogo from '../../../../assets/img/folder.svg'
import fileLogo from '../../../../assets/img/file.svg'

import './file.scss'

interface FileProps {
    file: {
        _id: any
        type: string
        name: string
        date: string
        size: number
    }
}

const File = ({file}: FileProps) => {
    const dispatch = useDispatch()
    const currentDir = useTypedSelector(state => state.files.currentDir)
    const fileView = useTypedSelector(state => state.app.fileView)
    const handleDir = () => {
        dispatch(pushToStack(currentDir))
        dispatch(setCurrentDir(file._id))
    }

    const downloadHandler = (e: any) => {
        e.stopPropagation()
        downloadFile(file)
    }

    const deleteHandler = (e: any) => {
        e.stopPropagation()
        dispatch(deleteFile(file))
    }
    return (
        <>
            {
                fileView === 'list' &&
                <div className="file" onClick={() => file.type === 'dir' && handleDir()}>
                    <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="fileLogo"
                         className="file__img"/>
                    <div className="file__name">{file.name}</div>
                    <div className="file__date">{file.date.slice(0, 10)}</div>
                    <div className="file__size">{sizeFormat(file.size)}</div>
                    {file.type !== 'dir' && <button className="file__btn file__download"
                                                    onClick={(e) => downloadHandler(e)}>Download</button>}
                    <button onClick={(e) => deleteHandler(e)}
                            className="file__btn file__delete">Delete
                    </button>
                </div>
            }
            {
                fileView === 'plate' &&
                <div className="file-plate" onClick={() => file.type === 'dir' && handleDir()}>
                    <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="fileLogo"
                         className="file-plate__img"/>
                    <div className="file-plate__name">{file.name}</div>
                    <div className="file-plate__btns">  {file.type !== 'dir' &&
                    <button className="file-plate__btn file-plate__download"
                            onClick={(e) => downloadHandler(e)}>Download</button>}
                        <button onClick={(e) => deleteHandler(e)}
                                className="file-plate__btn file-plate__delete">Delete
                        </button>
                    </div>

                </div>
            }
        </>
    )
}

export default File