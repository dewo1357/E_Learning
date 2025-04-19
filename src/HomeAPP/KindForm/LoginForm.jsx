import Label from "../../Component/Label"
import Input from "../../Component/Input"
import Popup from "../../Popup/Popup"
import { useNavigate } from "react-router-dom"
import { PostData } from "../../Utilities/POST"
import { useState } from "react"


const LoginForm = () => {
    const [turnOnPopup, setTurnOnpOpup] = useState(false)
    const [FinishProcess, SetFinsihProcess] = useState(false)
    const [Message, SetMessage] = useState("Mohon Ditunggu Sebentar")

    const navigate = useNavigate();
    const AuthProcess = async (e) => {
        e.preventDefault();
        setTurnOnpOpup(true)
        const data = {
            username: e.target.username.value,
            pass: e.target.pass.value,
        }
        const response = await PostData(data, "SignInAccount")
        console.log(response)
        if (response === false) {
            SetMessage("Terjadi Kesalahan")
            SetFinsihProcess(true)
            return false
        } else {
            let result = await response.json();
            const dateLogin = new Date().getDate()
            result = {...result,dateLogin}
            console.log(result)
            localStorage.setItem('account',JSON.stringify(result))    
            return navigate("/Topics")
        }

    }
    return (
        <>
            <form action="" onSubmit={AuthProcess}>
                <Label For="username" Content="Username"> </Label>
                <Input Name="username" nameId="username" PlaceHolder="Username"></Input>
                <Label For="pass" Content="Password" ></Label>
                <Input Name="pass" nameId="pass" PlaceHolder="Enter Pass" TypeInput="password"></Input>
                <button> Login </button>
            </form>
            <Popup turnPopup={turnOnPopup} turnOverlay={turnOnPopup} message={Message} Finish={FinishProcess} Category={"Process"} />
        </>
    )
}

export default LoginForm