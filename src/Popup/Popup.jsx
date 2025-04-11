import "./popup.css";
const Overlay = ({ message, Finish }) => {
  return (
    <div className="Overlay">
      <h2>{message}</h2>
      <div className="ContentImgOverlay">
        <div className="ButtonDialog Stop">
          {Finish ? (
            <button
              onClick={() => {
                location.reload();
              }}
            >
              Oke
            </button>
          ) : (
            <img src="/Public/Component/Loading.gif" alt="" />
          )}
        </div>
      </div>
    </div>
  );
};

const Overlaydialog = ({ message, action1, action2 }) => {
  return (
    <div className="Overlay">
      <h2>{message}</h2>
      <div className="ContentImgOverlay">
        <div className="ButtonDialog">
          <button onClick={action1}>Batal</button>
          <button onClick={action2}>Yakin</button>
        </div>
      </div>
    </div>
  );
};



const Popup = ({turnPopup = true,turnOverlay = true,message,Finish = false,Category,action1,action2}) => {
    const ActionPass = (e)=>{
        e.preventDefault()
        action2(e.target.pass.value)
    }
    return (
    <>
      {turnPopup && turnOverlay !== null ? (
        <div onClick={Category!=="Process"?(e)=>{
            if(e.target.id==="popup"){
                action1()
            }
        }:()=>{}} id="popup" className="popup">
          {Category === "Process" ? (
            <Overlay message={message} Finish={Finish} />
          ) : Category === "InputPass" ? (
            <div  className="Overlay">
              <h1>Input Password</h1>
              <form action="" onSubmit={ActionPass}>
                <div>
                  <label htmlFor="">Password</label>
                </div>
                <input type="password" name="pass" />
                <button>Change</button>
              </form>
            </div>
          ) : (
            <Overlaydialog
              message={message}
              Finish={Finish}
              action1={action1}
              action2={action2}
            />
          )}
        </div>
      ) : null}
    </>
  );
};

export default Popup;
