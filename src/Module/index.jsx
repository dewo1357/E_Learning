
import "./style.css"
import ContentModule from "./ContentModule"
import Menu from "../ModulePages/Menu"
import { useParams } from "react-router-dom"
import { useState } from "react"

const ReadModule = () => {
    const { idModule } = useParams();
    const {idSubModule} = useParams();
    const Account = JSON.parse(localStorage.getItem('account'))
    const [openNav,SetOpenNav] = useState(false)
    
    if(Account){
      return(
        <>
        <Menu srcBack={`TopicLesson/${idModule}`} user={Account.username} idModule={idModule}  
        StateIdModule={idSubModule} learn={true} openNavContent={openNav} SetOpenNavContent={SetOpenNav}/>
        <ContentModule openNavContent={openNav}/>
        </>
    )
    }else{
      location.href="/"
    }
}



export default ReadModule