const UrlBackEnd = "https://cruel-davita-sadeshop-79e55b22.koyeb.app";
const PostData = async (data, EndPoint, auth = false) => {
    //options if not authentication or not
    let Bodydata = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }
    if (auth) {
        const account = JSON.parse(localStorage.getItem('account'))
        Bodydata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${account.access_token}`
            },
            body: JSON.stringify(data)
        }
    }

    //Fetch To API
    try {
        const response = await fetch(UrlBackEnd + "/" + EndPoint, Bodydata)
        console.log(response)
        if (!response || response.status !== 200) {
            console.log("Failed To Send Data")
            return false
        } else {
            return response
        }
        
    } catch (err) {
        console.log(err.message)
    }
}

const UploadImageToAPI = async (file) => {
    const account = JSON.parse(localStorage.getItem('account'))
    const files = new FormData()
    files.append('files',file)
    console.log("HELLO")
    console.log(files)
    try {
        const response = await fetch(UrlBackEnd + "/" + "UploadImageSCC", {
            method: "POST", 
            headers: {
                'Authorization': `Bearer ${account.access_token}`,
            },
            body: files                                     ,
        })
        if (!response) {
            console.log("gagal")
            throw new Error(response.messages)
        }
        console.log(response)
    } catch (error) {
        console.log(error.message)
    }

}


export { PostData,UploadImageToAPI }