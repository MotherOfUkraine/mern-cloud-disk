const fs = require('fs')
const Path = require('path')
class FileService {

    getPath(file) {
        return Path.join(__dirname, `../files/${file.user}/${file.path}`)
    }

    createDir(file) {
        const filePath = this.getPath(file)
        return new Promise(((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath)
                    return resolve({message: 'File was created'})
                } else {
                    return reject({message: "File already exist"})
                }
            } catch (e) {
                console.log(e)
                return reject({message: 'File error'})
            }
        }))
    }

    deleteFile(file) {
    const path = this.getPath(file)
        file.type === 'dir' ? fs.rmdirSync(path) : fs.unlinkSync(path)
    }
}

module.exports = new FileService()