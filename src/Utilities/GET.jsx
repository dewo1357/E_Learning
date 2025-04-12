const UrlBackEnd = "https://cruel-davita-sadeshop-79e55b22.koyeb.app";
const GetData = async (EndPoint)=>{
    const account = JSON.parse(localStorage.getItem('account'))
    if(account){
        try{
            const response = await fetch(UrlBackEnd + "/" + EndPoint, {
                method: "GET", 
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
    }else{
        location.href="/"
    }
}

export {GetData}