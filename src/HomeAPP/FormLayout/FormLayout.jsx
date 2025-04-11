import "../Home.css"
import ActionButtonSmartPhone from "../Smarphone/SmartPhoneAuth"
import RegisterForm from "../KindForm/RegisterForm"
import LoginForm from "../KindForm/LoginForm"
import FormLayout from "./ContainerFormLayout"


const ActionForm = ({ login }) => {
    return (
        <>
            <div className="containerForm">
                {!login ?
                    <div className="FormAuthLayout">
                        <FormLayout login={login}>
                            <h1>Register</h1>
                            <RegisterForm />
                        </FormLayout>
                    </div> :
                    <div className="FormAuthLayout">
                        <FormLayout login={login}>
                            <h1>Login</h1>
                            <LoginForm/>
                        </FormLayout>
                    </div>}
            </div>
            <ActionButtonSmartPhone />
        </>
    )
}


/*
 <div className="ActionHeader flexCenter">
                    <button>Login</button>
                    <button>Register</button>
                </div>
*/
export default ActionForm