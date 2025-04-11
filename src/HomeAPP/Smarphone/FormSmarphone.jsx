import FormLayout from "../FormLayout/ContainerFormLayout"
import RegisterForm from "../KindForm/RegisterForm"
import LoginForm from "../KindForm/LoginForm"
const FormSmarphone = ({login}) => {
    return (
        <div className="FormSmartPhone">
            {
                !login ?
                    <div className="FormAuthLayout">
                        <FormLayout login={login}>
                            <h1>Register</h1>
                            <RegisterForm />
                        </FormLayout>
                    </div> :
                    <div className="FormAuthLayout">
                        <FormLayout login={login}>
                            <h1>Login</h1>
                            <LoginForm />
                        </FormLayout>
                    </div>
            }
        </div>
    )
}

export default FormSmarphone