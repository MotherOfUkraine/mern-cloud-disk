import React, {useEffect, useState} from 'react'
import {useDispatch} from "react-redux"
import PlateIcon from '@material-ui/icons/Apps';
import ListIcon from '@material-ui/icons/FormatListBulleted';
import Popup from "./Popup/Popup"
import FileList from "./FileList/FileList"
import Uploader from "./Uploader/Uploader"

import {useTypedSelector} from "../../hooks/useTypedSelector"
import {getFiles, uploadFile} from "../../redux/actions/file"
import {setCurrentDir} from "../../redux/reducers/fileReducer"
import {setView} from "../../redux/reducers/appReducer"



import './disk.scss'

interface IBackDir {
    dirId: string
    dirName: string
}

const Disk = () => {
    const dispatch = useDispatch()
    const {dirId, dirName} = useTypedSelector(state => state.files.currentDir)
    const dirStack = useTypedSelector(state => state.files.dirStack)
    const isLoader = useTypedSelector(state => state.app.isLoader)
    const [isPopup, setIsPopup] = useState(false)
    const [isDrag, setIsDrag] = useState(false)
    const [sort, setSort] = useState('type')
    const [sortOrder, setSortOrder] = useState(1)


    const handleFiles = (id: any, sort: string) => {
        dispatch(getFiles(id, sort))
    }
    const handleVisiblePopup = (visible: boolean) => {
        setIsPopup(visible)
    }

    const backClickHandler = () => {
        // @ts-ignore
        const backDir: IBackDir = dirStack.pop()
        dispatch(setCurrentDir(backDir.dirId, backDir.dirName))
    }

    const fileUploadHandler = (event: any) => {
        const files = [...event.target.files]
        files.forEach(file => dispatch(uploadFile(file, dirId)))
    }

    const onDragEnterHandler = (event: any) => {
        event.preventDefault()
        event.stopPropagation()
        setIsDrag(true)
    }

    const onDragLeaveHandler = (event: any) => {
        event.preventDefault()
        event.stopPropagation()
        setIsDrag(false)
    }

    const dropHandler = (event: any) => {
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile(file, dirId)))
        setIsDrag(false)
    }

    const viewHandler = (view: string) => {
        dispatch(setView(view))
    }

    const sortOrderHandler = (order: number) => {
        setSortOrder(order)
    }

    useEffect(() => {
        handleFiles(dirId, sort)
    }, [dirId, sort])

    return (isLoader ?
            <div className="center">
                <div className="lds-dual-ring"/>
            </div> :
            isDrag ? <div className="drop-area" onDragEnter={(event) => onDragEnterHandler(event)}
                          onDragLeave={(event) => onDragLeaveHandler(event)}
                          onDragOver={(event) => onDragEnterHandler(event)}
                          onDrop={(event) => dropHandler(event)}
                >
                    Drop files here
                </div> :
                <div className="disk" onDragEnter={(event) => onDragEnterHandler(event)}
                     onDragLeave={(event) => onDragLeaveHandler(event)}
                     onDragOver={(event) => onDragEnterHandler(event)}>
                    <div className="disk__btn">
                        {
                            dirStack.length ? <span className="disk__btn__back"
                                                    onClick={() => backClickHandler()}>Back</span> : null
                        }
                        <span className="disk__btn__create" onClick={() => handleVisiblePopup(true)}>New folder</span>
                        <div className="disk__upload">
                            <label htmlFor="disk__upload-input" className="disk__upload-label">File upload</label>
                            <input onChange={(event) => fileUploadHandler(event)} multiple={true}
                                   type="file" id="disk__upload-input"
                                   className="disk__upload-input"/>
                        </div>
                        <select value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className='disk__select'>
                            <option value="name">By name</option>
                            <option value="type">By type</option>
                            <option value="date">By date</option>
                        </select>
                        <div className="disk__view">
                            <PlateIcon className="" onClick={() => viewHandler('plate')}/>
                            <ListIcon className="disk__list" onClick={() => viewHandler('list')}/>
                        </div>
                    </div>
                    <h2 className="disk__dirName">{dirName && dirName}</h2>
                    <FileList/>
                    <Uploader/>
                    {
                        isPopup &&
                        <Popup handleVisiblePopup={handleVisiblePopup} currentDir={dirId}/>
                    }
                </div>
    )
}

export default Disk