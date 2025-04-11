const UrlBackEnd = "http://localhost:5000";
const EditData = async (data, EndPoint) => {
    const account = JSON.parse(localStorage.getItem('account'))

    //Fetch To API
    try {
        const response = await fetch(UrlBackEnd + "/" + EndPoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${account.access_token}`
            },
            body: JSON.stringify(data)
        }
        )
        if (!response || response.status !== 200) {
            console.log("Failed To Send Data")
            return false
        } else {
            console.log("berhasil")
            console.log(response)
        }
        console.log("DATANYAAAAAAA")
        console.log(data)
        console.log(response)
    } catch (err) {
        console.log(err.message)
    }
}

export { EditData }
