import React from 'react'
import File from './File/File'
import {CSSTransition, TransitionGroup} from 'react-transition-group'

import {useTypedSelector} from '../../../hooks/useTypedSelector'

import './filelist.scss'

const FileList = () => {
    const files = useTypedSelector(state => state.files.files)
    const fileView = useTypedSelector(state => state.app.fileView)

    return (<>
        {!files.length && <div className="center">No items</div>}

        {
            (fileView === "plate" && !!files.length) &&
            <div className='fileplate'>
                {files.map(file =>
                    <File key={file._id} file={file}/>
                )}
            </div>
        }
        {(fileView === 'list' && !!files.length) &&
        <div className='filelist'>
            <div className="filelist__header">
                <div className="filelist__name">Name</div>
                <div className="filelist__date">Date</div>
                <div className="filelist__size">Size</div>
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

    </> )
}

export default FileList