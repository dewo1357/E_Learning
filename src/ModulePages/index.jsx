/* eslint-disable react-hooks/exhaustive-deps */
import "./styles.css";
import Menu from "./Menu";
import { GetData } from "../Utilities/GET";
import { DeleteData } from "../Utilities/DELETE";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Popup from "../Popup/Popup";
const ModulePages = ({ learn }) => {
  const { user } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [openNav, SetOpenNav] = useState(false);

  //Popup State
  const [turnOnPopup, setTurnOnpOpup] = useState(false);
  const [FinishProcess, SetFinsihProcess] = useState(false);
  const [Message, SetMessage] = useState("Apakah Anda Yakin?");
  const [Id, SetID] = useState(null);
  const [CategoryContent, setCategoryContent] = useState(false);

  const navigate = useNavigate();
  const [MyArrayModule, SetArrayModule] = useState([]);
  const GetMyModule = async () => {
    if (localStorage.getItem("MyModule")) {
      SetArrayModule(JSON.parse(localStorage.getItem("MyModule")));
    } else {
      const data = await GetData(`GetModuleByAccount/${user}`);
      if (data.Module) {
        localStorage.setItem("MyModule", JSON.stringify(data.Module));
        SetArrayModule(data.Module);
      }
    }
    setLoading(false);
  };

  const GetMyPlaylistModule = async () => {
    if (localStorage.getItem("MyPlaylistModule")) {
      SetArrayModule(JSON.parse(localStorage.getItem("MyPlaylistModule")));
    } else {
      const data = await GetData(`GetMyplaylistModule/${user}`);
      if (data.Module) {
        localStorage.setItem("MyPlaylistModule", JSON.stringify(data.Module));
        SetArrayModule(data.Module);
      }
    }
    setLoading(false);
  };

  console.log(MyArrayModule);

  const CancelAction = () => {
    setTurnOnpOpup(false);
  };

  const SureAction = async () => {
    SetMessage(() => "Proses Menghapus");
    setCategoryContent("Process");
    await DeleteData(!learn ? "DeleteSubModule" : "DeletePlaylistModule", Id);
    SetFinsihProcess(true);
    SetMessage("Berhasil Menghapus");
    localStorage.removeItem(!learn ? "MyModule" : "MyPlaylistModule");
  };

  useEffect(() => {
    if (!learn) {
      GetMyModule();
    } else {
      GetMyPlaylistModule();
    }
  }, []);

  return (
    <>
      <Menu
        user={user}
        srcBack={"Topics"}
        learn={learn}
        openNavContent={openNav}
        SetOpenNavContent={SetOpenNav}
      />
      <div>
        <h1 style={{ textAlign: "right", marginRight: innerWidth < 900 ? "20px" : "" }}>
          {!learn ? "My Module" : "My Playlist Module"}
        </h1>
        <div
          className="ContainerActionModule"
          style={{ marginLeft: openNav && innerWidth > 900 ? "22%" : innerWidth > 900? "7%":" " }}
        >
          {!isLoading ? (
            MyArrayModule.map((item, index) => (
              <div key={index} className="ComponentMyModule">
                <div>
                  <img
                    src={`https://qfoylbowzoertpojnhvy.supabase.co/storage/v1/object/public/modulepicture//${item.PictureName}`}
                    alt=""
                  />
                </div>
                <div style={{ width: "100%" }}>
                  <div style={{ height: "75%" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h1>{item.Title}</h1>
                      {!learn ? (
                        <button
                          onClick={() => {
                            navigate(`/ModuleDetail/${item.id}`);
                          }}
                        >
                          Check This Lesson
                        </button>
                      ) : null}
                    </div>
                    <hr />
                    <h2>{item.Description}</h2>
                  </div>
                  {!learn ? (
                    <div className="FooterComponentMyModule">
                      <button
                        onClick={() => {
                          navigate(`/SettingModule/${item.id}`);
                        }}
                      >
                        Edit Pengantar
                      </button>
                      <button
                        onClick={() => {
                          navigate(`/AddSubModule/${item.id}`);
                        }}
                      >
                        Add Sub Module
                      </button>
                      <button
                        onClick={async () => {
                          setTurnOnpOpup(true);
                          SetID(item.id);
                        }}
                      >
                        Delete Module
                      </button>
                    </div>
                  ) : (
                    <div className="FooterComponentMyModule">
                      <button
                        onClick={() => {
                          navigate(
                            `/ReadModule/${item.idModule}/${item.idSub}`
                          );
                        }}
                      >
                        Mulai Belajar
                      </button>

                      <button
                        onClick={async () => {
                          setTurnOnpOpup(true);
                          SetID(item.id);
                        }}
                      >
                        Delete Module
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div>
              <p>process..</p>
            </div>
          )}
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
  );
};
export default ModulePages;
