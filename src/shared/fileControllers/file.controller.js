

class FileController {

    readFile = (file) => {
        return new Promise((resolve, reject) => {
          // Create file reader
          let reader = new FileReader()
      
          // Register event listeners
          reader.addEventListener("loadend", e => resolve(e.target.result))
          reader.addEventListener("error", reject)
      
          // Read file
          reader.readAsArrayBuffer(file)
        })
    }

    getAsByteArray = async (file) => {
        return new Uint8Array(await this.readFile(file))
    }

}

export default new FileController();