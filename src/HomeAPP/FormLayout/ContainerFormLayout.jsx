import { Link } from "react-router-dom"

const FormLayout = ({ children, login }) => {
    return (
        <div className="FormAuth">
            {children}
            {!login ?
                <p style={{ textAlign: "center" }}>Already have an Account? <Link to={"/login"}>Login</Link>  </p> :
                <p style={{ textAlign: "center" }}>Have'nt an Account? <Link to={"/"}>Register</Link>  </p>}
        </div>
    )
}

export default FormLayout