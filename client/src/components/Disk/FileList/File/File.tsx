import React from 'react'
import {useDispatch} from "react-redux"
import DeleteIcon from '@material-ui/icons/DeleteForever'
import DownloadIcon from '@material-ui/icons/CloudDownload'

import {pushToStack, setCurrentDir} from "../../../../redux/reducers/fileReducer"
import {useTypedSelector} from "../../../../hooks/useTypedSelector"
import {deleteFile, downloadFile} from "../../../../redux/actions/file"
import {sizeFormat} from "../../../../utils/sizeFormat"

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
    const {dirId, dirName} = useTypedSelector(state => state.files.currentDir)
    const fileView = useTypedSelector(state => state.app.fileView)
    const handleDir = () => {
        dispatch(pushToStack({dirId, dirName}))
        dispatch(setCurrentDir(file._id, file.name))
    }

    const downloadHandler = (e: any) => {
        e.stopPropagation()
        downloadFile(file._id, file.name)
    }

    const deleteHandler = (e: any) => {
        e.stopPropagation()
        dispatch(deleteFile(file._id))
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

                    {file.type !== 'dir' && <>
                        <div className="file__size">{sizeFormat(file.size)}</div>
                        <DownloadIcon className="file__btn file__download"
                                      onClick={(e) => downloadHandler(e)}/>
                        <DeleteIcon className="file__btn file__delete"
                                    onClick={(e) => deleteHandler(e)}/>
                    </>}
                </div>
            }
            {
                fileView === 'plate' &&
                <div className="file-plate" onClick={() => file.type === 'dir' && handleDir()}>
                    <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="fileLogo"
                         className="file-plate__img"/>
                    <div className="file-plate__name">{file.name}</div>
                    <div className="file-plate__btns">  {file.type !== 'dir' &&
                    <DownloadIcon className="file-plate__btn file-plate__download" onClick={(e) => downloadHandler(e)}/>}
                        <DeleteIcon className="file-plate__btn file-plate__delete" onClick={(e) => deleteHandler(e)}/>
                    </div>

                </div>
            }
        </>
    )
}

export default File