import React, {useEffect, useState} from 'react'
import {useDispatch} from "react-redux"

import Popup from "./Popup/Popup"
import FileList from "./FileList/FileList"
import Uploader from "./Uploader/Uploader"

import {useTypedSelector} from "../../hooks/useTypedSelector"
import {getFiles, uploadFile} from "../../redux/actions/file"
import {setCurrentDir} from "../../redux/reducers/fileReducer"

import './disk.scss'
import {setView} from "../../redux/reducers/appReducer";


const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useTypedSelector(state => state.files.currentDir)
    const dirStack = useTypedSelector(state => state.files.dirStack)
    const isLoader = useTypedSelector(state => state.app.isLoader)

    const [isPopup, setIsPopup] = useState(false)

    const [isDrag, setIsDrag] = useState(false)
    const [sort, setSort] = useState('type')

    const handleFiles = (currentDir: any, sort: string) => {
        dispatch(getFiles(currentDir, sort))
    }
    const handleVisiblePopup = (visible: boolean) => {
        setIsPopup(visible)
    }

    const backClickHandler = () => {
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))
    }

    const fileUploadHandler = (event: any) => {
        const files = [...event.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
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
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setIsDrag(false)

    }

    const viewHandler = (view: string) => {
        dispatch(setView(view))
    }

    useEffect(() => {
        handleFiles(currentDir, sort)
    }, [currentDir, sort])

    return (isLoader ?
            <div className="center">
                <div className="lds-dual-ring"/>
            </div> :
            isDrag ? <div className="drop-area" onDragEnter={(event) => onDragEnterHandler(event)}
                          onDragLeave={(event) => onDragLeaveHandler(event)}
                          onDragOver={(event) => onDragEnterHandler(event)}
                          onDrop={(event) => dropHandler(event)}
                >
                    Перетащите файлы сюда
                </div> :
                <div className="disk" onDragEnter={(event) => onDragEnterHandler(event)}
                     onDragLeave={(event) => onDragLeaveHandler(event)}
                     onDragOver={(event) => onDragEnterHandler(event)}>
                    <div className="disk__btn">
                        <span className="disk__btn__back"
                              onClick={() => backClickHandler()}>Назад</span>
                        <span className="disk__btn__create"
                              onClick={() => handleVisiblePopup(true)}>Создать папку</span>
                        <div className="disk__upload">
                            <label htmlFor="disk__upload-input" className="disk__upload-label">Загрузить
                                файл</label>
                            <input onChange={(event) => fileUploadHandler(event)} multiple={true}
                                   type="file" id="disk__upload-input"
                                   className="disk__upload-input"/>
                        </div>
                        <select value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className='disk__select'>
                            <option value="name">По имени</option>
                            <option value="type">По типу</option>
                            <option value="date">По дате</option>
                        </select>
                        <button className="disk__plate" onClick={() => viewHandler('plate')} />
                        <button className="disk__list" onClick={() => viewHandler('list')} />
                    </div>
                    <FileList/>
                    <Uploader/>
                    {
                        isPopup &&
                        <Popup handleVisiblePopup={handleVisiblePopup} currentDir={currentDir}/>
                    }
                </div>
    )
}

export default Disk