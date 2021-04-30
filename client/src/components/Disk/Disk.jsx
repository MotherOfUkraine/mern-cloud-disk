import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {createDir, getFiles} from "../../redux/actions/file"
import FileList from "./FileList/FileList"

import './disk.scss'

const Disk = () => {
    const dispatch = useDispatch()

    const currentDir = useSelector(state => state.files.currentDir)

    const handleFiles = currentDir =>{
        dispatch(getFiles(currentDir))
    }
    const handleAddItem = () => {
        dispatch(createDir(currentDir, 'asdas1'))
    }
    useEffect(() =>{
        handleFiles(currentDir)
    }, [currentDir])
    return (
        <div className="disk">
            <div className="disk__btn">
                <span className="disk__btn__back">Назад</span>
                <span className="disk__btn__create" onClick={() => handleAddItem()}>Создать</span>
            </div>
            <FileList/>
        </div>
    )
}

export default Disk