import React from 'react'

import dirLogo from '../../../../assets/img/folder.svg'
import fileLogo from '../../../../assets/img/file.svg'

import './file.scss'

const File = ({file}) => {
    return (
        <div className="file">
            <img src={file.type === 'dir' ? dirLogo: fileLogo} alt="fileLogo" className="file__img"/>
            <div className="file__name">{file.name}</div>
            <div className="file__date">{file.date.slice(0,10)}</div>
            <div className="file__size">{file.size}</div>
        </div>
    )
}

export default File