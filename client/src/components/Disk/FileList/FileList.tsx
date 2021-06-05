import React from 'react'
import File from './File/File'
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {useTypedSelector} from '../../../hooks/useTypedSelector'

import './filelist.scss'

const FileList = () => {
    const files = useTypedSelector(state => state.files.files)
    const fileView = useTypedSelector(state => state.app.fileView)

    return <>
        {!files.length && <div className="center">Нет файлов</div>}

        {
            fileView === "plate" &&
            <div className='fileplate'>
                {files.map(file =>
                    <File key={file._id} file={file}/>
                )}
            </div>
        }

        {fileView === 'list' &&
        <div className='filelist'>
            <div className="filelist__header">
                <div className="filelist__name">Название</div>
                <div className="filelist__date">Дата</div>
                <div className="filelist__size">Размер</div>
            </div>
            <TransitionGroup>
                {files.map(file =>
                    <CSSTransition
                        key={file._id}
                        timeout={500}
                        classNames={'file'}
                        exit={false}
                    >
                        <File file={file}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
        }
    </>
}

export default FileList