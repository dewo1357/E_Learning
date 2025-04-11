import Menu from "../ModulePages/Menu"
import "./style.css"
import Exercise from "./Exercise"
import { useParams } from "react-router-dom"
import { useState } from "react"

const Index = ({learn}) => {
    const {idModule} = useParams();
    const [openNav,SetOpenNav] = useState(false)
    return (
        <>
            <Menu srcBack={learn?`TopicLesson/${idModule}`:`ModuleDetail/${idModule}`} openNavContent={openNav} SetOpenNavContent={SetOpenNav} />
            <div className="ExerCise">
                <Exercise idModule={idModule} learn={learn} openNavContent={openNav} />
            </div>
        </>
    )
}
export default Index