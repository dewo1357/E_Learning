
import Menu from "../ModulePages/Menu"
import ModuleDetailPages from "./ModulDetailPages"
import { useParams } from "react-router-dom"
import { useState } from "react"
const Index = ({learn})=>{
    const account = JSON.parse(localStorage.getItem('account'))
    const {idModule} = useParams();
    const [openNav,SetOpenNav] = useState(false)
    
    if(account){
        return(
            <>
            {!learn?<Menu user={account.username} srcBack={`ModulePages/${account.username}`} openNavContent={openNav} SetOpenNavContent={SetOpenNav}/>:null}
            <ModuleDetailPages learn={learn} idModule={idModule} openNavContent={openNav} SetOpenNavContent={SetOpenNav}/>
            </>
        )
    }
    return (
        <><h1>Nothing</h1></>
    )
}

export default Index