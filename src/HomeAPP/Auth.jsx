
import "./Home.css"
import ActionForm from "./FormLayout/FormLayout"
import FormSmarphone from "./Smarphone/FormSmarphone"
import { useEffect } from "react"


const HeaderTitle = () => {
    return (
        <>
            <div>
                <div >
                    <img src="/Images/LOGO SCC.png" alt="" width="140px" />
                </div>
                <div className="ContentLeft">
                    <img src="/Images/logo scc (new).png" alt="" style={{ margin: "200px 200px 230px " }} />
                </div>
            </div>
        </>
    )
}




const Head = ({ login }) => {
   const account = localStorage.getItem('account')
   useEffect(()=>{
    if(account && account.dateLogin === new Date().getDate()){
        location.href="/Topics"
    }else{
        localStorage.clear()
    }
   },[])
   if(!account){
    return (
        <>
            <div className="Header">
                <HeaderTitle />
                <ActionForm login={login} />
            </div>
            {/*==============Content Smartphone==============*/}
            <FormSmarphone login={login}/>
            {/*==============Content Smartphone==============*/}
        </>
    )
   }else{
    location.href="/Topics"
   }
    
}

export default Head