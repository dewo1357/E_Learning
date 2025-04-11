import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { GetData } from "../Utilities/GET"
import { useNavigate } from "react-router-dom"
import Popup from "../Popup/Popup"
import { DeleteData } from "../Utilities/DELETE"
import "./Style.css"
import { useRef } from "react"


const ModuleDetailPages = ({ learn, idModule,openNavContent }) => {
    const [Content, setContent] = useState({})
    const [Picture, SetPicture] = useState(null)
    const [ListSubModule, SetListSubModule] = useState([])

    //Popup State
    const [turnOnPopup, setTurnOnpOpup] = useState(false)
    const [FinishProcess, SetFinsihProcess] = useState(false)
    const [Message, SetMessage] = useState("Apakah Anda Yaakin?")
    const [Id, SetID] = useState(null);
    const ContentModule = useRef()
    const [CategoryContent, setCategoryContent] = useState(false)

    const navigate = useNavigate();

    const GetListSubModule = async () => {
        if (localStorage.getItem(`ListDetailModule-${idModule}`)) {
            SetListSubModule(JSON.parse(localStorage.getItem(`ListDetailModule-${idModule}`)));
        } else {
            const ListModule = await GetData(`GetSubModulById/${idModule}`);
            SetListSubModule(ListModule.data ? ListModule.data : []);
            localStorage.setItem(`ListDetailModule-${idModule}`, JSON.stringify(ListModule.data))
        }

    }


    useEffect(() => {
        let MyModule = JSON.parse(localStorage.getItem('Module'))
        if (!MyModule) {
            MyModule = JSON.parse(localStorage.getItem('MyModule'))
        }
        console.log(MyModule)
        const data = MyModule.filter((item) => item.id === idModule)
        console.log(idModule)
        console.log(data)
        setContent({
            'Title': data[0]['Title'],
            'SubTitle': data[0].SubTitle,
            'Description': data[0].Description,
            'ContentHtml': data[0].ContentHtml,
            'PictureName': data[0].PictureName,
            'Name': data[0].AuthorFirstName.FirstName + " " + data[0].AuthorLastName.LastName
        })
        ContentModule.current.innerHTML = data[0]['ContentHtml']

        SetPicture(`https://qfoylbowzoertpojnhvy.supabase.co/storage/v1/object/public/modulepicture//${data[0].PictureName}`)
        GetListSubModule();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const CancelAction = () => {
        setTurnOnpOpup(false)
    }
    console.log(ListSubModule)

    const SureAction = async () => {
        SetMessage(() => "Proses Menghapus")
        setCategoryContent("Process")
        await DeleteData("DeleteSubModule", Id)
        SetFinsihProcess(true)
        SetMessage("Berhasil Menghapus")
    }
    return (
        <>
            <div className={!learn ? "ContainerActionModule ContainerModuleDetail" : "smarphone"}  style={{marginLeft:openNavContent?"22%":learn?"":"7%"}}>
                <div className="PictureLesson">
                    <div>
                        {!learn ?
                            <h1 style={{ color: "black" }}>My Module</h1>
                            : <Link to={"/Topics"}>
                                <h1>Back</h1>
                            </Link>
                        }
                        <img src={Picture} alt="" />
                        <div className="InformationAuthor">
                            <div>
                                <h2>Topic</h2>
                                <h1>{Content['Title']}</h1>
                            </div>
                            <div>
                                <h2>Author</h2>
                                <h1>{Content['Name']}</h1>
                            </div>
                        </div>
                    </div>

                    <div className="PrevieModule">
                        <div>
                            <h1 style={{ color: "black" }}>{Content.Description}</h1>
                        </div>
                        <div   className="ContentPrevie" ref={ContentModule}> </div>
                    </div>
                </div>
                <div className="ListModule">
                    <div className="EditExercise">
                        <h1 style={{ textAlign: "left", marginRight: "20px", color: "black" }}>List Module</h1>
                        <button onClick={learn ? () => { navigate(`/StartExercise/${idModule}`) } :
                            async () => {
                                setTurnOnpOpup(true)
                                SetMessage(() => "Sedang Di Proses")
                                setCategoryContent("Process")
                                await GetData(`Exercise/${idModule}`)
                                navigate(`/Exercise/${idModule}`)
                            }}
                        >{learn ? "Exercise" : "Add / Edit Exercise"}</button>
                    </div>
                    <div className="ComponentListContainer">
                        {
                            ListSubModule.length !== 0 ?
                                ListSubModule.map((item, index) => (
                                    <div className="ComponentListSubModule">
                                        <div>
                                            <h3>Bab{index + 1}</h3>
                                            <h2>{item.SubTitle}</h2>
                                        </div>
                                        {!learn ?
                                            <div className="ActionButtonSubModule">
                                                <button onClick={() => {
                                                    navigate(`/SettingSubModule/${idModule}/${item.id}`)
                                                }}>Edit</button>
                                                <button onClick={() => {
                                                    SetID(item.id)
                                                    setTurnOnpOpup(true)
                                                }}>Delete</button>
                                            </div> :
                                            <div className="ActionButtonSubModule learnModule">
                                                <button onClick={() => { navigate(`/ReadModule/${idModule}/${item.id}`) }}>Mulai Belajar</button>
                                            </div>}
                                    </div>
                                )) : null

                        }
                    </div>
                </div>


            </div>
            <Popup
                turnPopup={turnOnPopup}
                turnOverlay={turnOnPopup}
                message={Message}
                Finish={FinishProcess}
                Category={CategoryContent}
                action1={CancelAction}
                action2={SureAction}
            />
        </>
    )
}

export default ModuleDetailPages