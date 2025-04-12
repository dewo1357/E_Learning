const UrlBackEnd = "https://cruel-davita-sadeshop-79e55b22.koyeb.app";
const DeleteData = async (EndPoint,params)=>{
    const account = JSON.parse(localStorage.getItem('account'))
    try{
        const response = await fetch(UrlBackEnd + "/" + EndPoint + "/" + params, {
            method: "DELETE", 
            headers: {
                'Authorization': `Bearer ${account.access_token}`,
            },                                  
        })
        if(!response){
            throw new Error("Failed")
        }
        const result = await response.json()
        return result
    }catch(err){
        console.log(err.message)
    }
}

export {DeleteData}