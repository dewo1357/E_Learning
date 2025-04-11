import ContainerForm from "./FormArtikel/ContainerForm";

import Menu from "../ModulePages/Menu";
import "./styles.css";
import { useParams } from "react-router-dom";
import { useState } from "react";

const Header = () => {
    
    
    return (
        <div className="Headers">
            
            <h1>Add Module</h1>
        </div>
    )
}


const AddModule = ({SettingSub,Setting,AddSubModule}) => {
    const {idModule} = useParams();
    const {idSubModule} = useParams();
    const [openNav,SetOpenNav] = useState(false)
  
    const account = JSON.parse(localStorage.getItem('account'))
    return (
        <>
            <Menu user={account.username} srcBack={`Topics`} openNavContent={openNav} SetOpenNavContent={SetOpenNav}/>
           <div>
            <Header></Header>
           <ContainerForm SettingSub={SettingSub} AddSubModule={AddSubModule} Setting={Setting} idModule={idModule} IdSubModule={idSubModule}openNavContent={openNav} />
           </div>
        </>
    )
}

export default AddModule