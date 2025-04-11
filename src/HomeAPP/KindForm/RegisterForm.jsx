import Input from "../../Component/Input"
import Label from "../../Component/Label"
import { useNavigate } from "react-router-dom"
import { PostData } from "../../Utilities/POST"
import { useState } from "react"
import Popup from "../../Popup/Popup"

const RegisterForm = () => {
    const [turnOnPopup,setTurnOnpOpup] = useState(false)
    const [FinishProcess,SetFinsihProcess] = useState(false)
    const [Message,SetMessage] = useState("Mohon Ditunggu Sebentar")
    const navigate = useNavigate();

    const DirectToLogin = async (e) => {
        e.preventDefault();
        setTurnOnpOpup(true)
        const data = {
            FirstName: e.target.FirstName.value,
            LastName: e.target.LastName.value,
            username: e.target.username.value,
            email: e.target.email.value,
            pass1: e.target.pass.value,
            pass2: e.target.pass2.value
        }
        const response = await PostData(data, "AccountRegist")
        if (response === false) {
            SetMessage("Terjadi Kesalahan")
            SetFinsihProcess(true)
            return false
        } else {
           return navigate("/login")
        }
    }

    return (
        <>
            <form action="" onSubmit={DirectToLogin}>
                <Label For="First Name" Content="First Name"> </Label>
                <Input Name="FirstName" nameId="First Name" PlaceHolder="Enter First Name"></Input>

                <Label For="Last Name" Content="Last Name"> </Label>
                <Input Name="LastName" nameId="Last Name" PlaceHolder="Enter Last Name"></Input>

                <Label For="username" Content="Username"> </Label>
                <Input Name="username" nameId="username" PlaceHolder="Username"></Input>

                <Label For="email" Content="Email" ></Label>
                <Input Name="email" nameId="Email" PlaceHolder="Email" TypeInput="email"></Input>

                <Label For="pass" Content="Password" ></Label>
                <Input Name="pass" nameId="pass" PlaceHolder="Enter Pass" TypeInput="password"></Input>

                <Label Content="Password Confirm" ></Label>
                <Input Name="pass2" nameId="pass2" PlaceHolder="Enter Pass" TypeInput="password"></Input>
                <button> Register </button>
            </form>
            <Popup turnPopup={turnOnPopup} turnOverlay={turnOnPopup} message={Message} Category={"Process"} Finish={FinishProcess} />
        </>
    )
}

export default RegisterForm