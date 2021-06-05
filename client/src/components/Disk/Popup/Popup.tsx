import React, {useState} from 'react'

import Input from "../../../utils/Input/Input"
import {useDispatch} from "react-redux";
import {createDir} from "../../../redux/actions/file"

import './popup.scss'

interface PopupProps {
    handleVisiblePopup: (value: boolean) => void,
    currentDir: string
}

const Popup = ({handleVisiblePopup, currentDir}:PopupProps) => {
    const dispatch = useDispatch()
    const [dirName, setDirName] = useState('')

    const handleAddItem = () => {
        dispatch(createDir(currentDir, dirName))
        setDirName('')
        handleVisiblePopup(false)
    }
    return (
        <div className="popup" onClick={() => handleVisiblePopup(false)}>
            <div className="popup__content" onClick={(event => event.stopPropagation())}>
                <div className="popup__header">
                    <div className="popup__title">Создать новую папку</div>
                    <button className="popup__close" onClick={() => handleVisiblePopup(false)}>X</button>
                </div>
                <Input type="text" placeholder="Введите название папки..." value={dirName} setValue={setDirName}/>
                <button className="popup__create" onClick={() => handleAddItem()}>Создать</button>
            </div>
        </div>
    )
}

export default Popup