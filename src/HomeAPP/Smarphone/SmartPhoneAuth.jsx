import { useRef, useState } from "react"
const ActionButtonSmartPhone = () => {
    const OptionAction = useRef(null);
    const [BuildOn,SetBuild] = useState(false)

    const BuildMenu = ()=>{
        OptionAction.current.style.display = BuildOn ? "none" : "flex"
        SetBuild(BuildOn?false:true)
    }

    return (
        <>
            <div className="ActionHeader Hamburg">
                <button className="flexCenterJustify" onClick={BuildMenu}>
                    <img src="/Images/menu-bar.png" alt="" width="40px" />
                </button>
                <div ref={OptionAction} className="OptionAction flexCenterJustify">
                    <button>Login</button>
                    <button>Register</button>
                </div>
            </div>
        </>
    )
}

export default ActionButtonSmartPhone