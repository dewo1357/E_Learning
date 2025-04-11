
import "./Home.css"
import ActionForm from "./FormLayout/FormLayout"
import FormSmarphone from "./Smarphone/FormSmarphone"


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
}

export default Head