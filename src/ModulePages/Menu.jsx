import { useNavigate } from "react-router-dom"
import { useRef, useState } from "react";
import { PostData } from "../Utilities/POST";
import Popup from "../Popup/Popup";

const Menu = ({ user, srcBack, idModule, StateIdModule, learn = false, Location = location.pathname,openNavContent,SetOpenNavContent }) => {
    console.log(user)
    const navigate = useNavigate();
    const ContainerNavbar = useRef();
    const [openNav, SetOpenNav] = useState(false)
    const [isCallPopup, setisCallPopup] = useState(false)

    const [turnOnPopup, setTurnOnpOpup] = useState(false)
    const [FinishProcess, SetFinsihProcess] = useState(false)
    const [Message, SetMessage] = useState("Apakah Anda ingin Menambahkan Kedalam Playlist?")
    const [CategoryContent, setCategoryContent] = useState(false)


    const text = [
        {
            name: "My Module",
            pathImage: "/Images/icons8-book-50.png",
            route: `/ModulePages/${user}`
        },
        {
            name: "Add My Module",
            pathImage: "/Images/icons8-add-book-50.png",
            route: "/AddModule",
        }, {
            name: "Setting My Module",
            pathImage: "/Images/icons8-book-and-pencil-50.png",
            route: "/ModulePages"
        }
    ]

    const AddToPlaylistModule = async () => {
        setCategoryContent("Process")
        SetMessage(() => "Proses Menambahkan")
        const data = {
            idSubModule: StateIdModule,
            idModule: idModule,
        };
        await PostData(data, "AddToPlaylistModule", true)
        localStorage.removeItem('MyPlaylistModule')//hapus Chace Playlist
        SetFinsihProcess(true)
        SetMessage("Berhasil Ditambahkan")
    }

    const CancelAddToPlaylist = () => {
        setTurnOnpOpup(false)
    }


    return (
        <>
            <div>
                <div ref={ContainerNavbar} className="ContainerNavBar">
                    <div style={{ transition: "1000ms", display: "flex", alignItems: "center", justifyContent: !openNav ? "center" : "start" }}>
                        <button style={{ backgroundColor: "transparent", backgroundImage: 'url("/Images/icons8-back-arrow-50.png")', display: "flex", justifyContent: "center", width: "50px", height: "50px" }} onClick={() => { navigate(`/${srcBack}`) }}>
                        </button>
                        {openNav ? < h2 style={{ color: "white" }}> back</h2> : null}
                    </div>
                    <div className="NavBar">
                        <button onClick={() => {
                            console.log(openNav)
                            SetOpenNav(() => !openNav ? true : false)
                            SetOpenNavContent(()=>!openNavContent?true:false)
                            ContainerNavbar.current.style.transition = "100ms";
                            ContainerNavbar.current.style.width = !openNav ? "20%" : "5%"

                        }}
                            style={{
                                backgroundColor: openNav ? "white" : "transparent"
                            }}
                        >
                            {openNav ? "Close" : <img src="/Images/icons8-fast-forward-50.png" width="40" alt="" />}
                        </button>
                        {text.map((item) => (
                            <button key={item.pathImage}
                                style={{
                                    backgroundColor: openNav ? "white" : "transparent"
                                }}
                                onClick={
                                    !learn ? () => {
                                        if (location.pathname.includes("SettingModule")) {
                                            location.href = item.route
                                        } else {
                                            navigate(item.route)
                                        }
                                    } : () => {
                                        if (item.name === "Add My Module") {
                                            if (Location.includes("MyPlaylistModule")) {
                                                SetFinsihProcess(true)
                                                setCategoryContent("Process")
                                                setisCallPopup(true)
                                                setTurnOnpOpup(true)
                                                SetMessage("Anda Tidak Sedang Berada Dalam Room Module")
                                                
                                            } else {
                                                setisCallPopup(true)
                                                setTurnOnpOpup(true)
                                                setCategoryContent(true)
                                                console.log("oke")
                                            }

                                        } else if (item.name === "My Module") {
                                            navigate(`/MyPlaylistModule/${user}`)
                                        }
                                    }
                                }>{openNav ? item.name : <img src={item.pathImage} alt="" />}</button>
                        ))}
                    </div>
                </div>
            </div>
              <div className="MobileNavBar">
            
                    <button onClick={()=>{
                        navigate("/Topics")
                    }} className="MobileNavButton" data-tooltip="Home">
                      <i className="fas fa-home"></i>
                      <span className="NavLabel">Home</span>
                    </button>
                    <button onClick={()=>{
                         navigate(`/MyPlaylistModule/${user}`)
                    }} className="MobileNavButton" data-tooltip="Modules">
                      <i className="fas fa-book"></i>
                      <span className="NavLabel">Modules</span>
                    </button>
                    <button className="MobileNavButton" data-tooltip="Settings">
                      <i className="fas fa-cog"></i>
                      <span className="NavLabel">Settings</span>
                    </button>
                  </div>
            {isCallPopup ?
                <Popup
                    turnPopup={turnOnPopup}
                    turnOverlay={turnOnPopup}
                    message={Message}
                    Finish={FinishProcess}
                    Category={CategoryContent}
                    action1={CancelAddToPlaylist}
                    action2={AddToPlaylistModule}
                /> : null}
        </>
    )
}

export default Menu
