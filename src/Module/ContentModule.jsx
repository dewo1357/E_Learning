import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { GetData } from "../Utilities/GET";
import ArrayOption from "./ArrayOption";

const ContentModule = ({ openNavContent }) => {
  const { idSubModule } = useParams();
  const { idModule } = useParams();

  const [Content, setContent] = useState(null);
  const [Picture, SetPicture] = useState(null);
  const [ListSubModule, SetListSubModule] = useState([]);
  const [Loading, SetLoading] = useState(true);
  const [CheckSubModule, SetCheckSubModule] = useState(true);
  const ContentHTMLref = useRef();

  const SetUp = () => {
    let MyModule = JSON.parse(
      localStorage.getItem(`ListDetailModule-${idModule}`)
    );
    if (!MyModule) {
      MyModule = JSON.parse(localStorage.getItem(`MyPlaylistModule`));
    }
    console.log(MyModule);
    let data = MyModule.filter((item) => item.id === idSubModule);
    if (data.length === 0) {
      data = MyModule.filter((item) => item.idSub === idSubModule);
    }

    setContent({
      Title: data[0].Title?data[0].Title:data[0]['Module'].Title,
      SubTitle: data[0].SubTitle,
      Description: data[0].Description,
      ContentHtml: data[0].Content ? data[0].Content : data[0].ContentHtml,
      PictureName: data[0].PictureName,
      LinkEmbed: data[0].LinkEmbed,
    });

    SetPicture(
      `https://qfoylbowzoertpojnhvy.supabase.co/storage/v1/object/public/modulepicture//${data[0].PictureName}`
    );
  };

  const ListDetailModule = async()=>{
    const result = await GetData(`GetSubModulById/${idModule}`);
    localStorage.setItem(`ListDetailModule-${idModule}`,JSON.stringify(result.data))
    SetListSubModule(()=>result.data);
    SetLoading(false);
  }
  useEffect(() => {
    if (Content === null && Loading) {
      SetUp();
      console.log(Content);
    } else {
      ContentHTMLref.current.innerHTML = Content.ContentHtml;
      console.log(Content);

      let data = JSON.parse(
        localStorage.getItem(`ListDetailModule-${idModule}`)
      );
      
      if(!data){
        ListDetailModule()
      }else{
        SetListSubModule(data);
        SetLoading(false);
      }
    }
  }, [Content]);
  console.log(Content);
  setTimeout(() => {}, 1000);

  const MethodCheck = (idItem) => {
    location.href = `/ReadModule/${idModule}/${idItem}`;
  };

  return (
    <>
      {Content !== null ? (
        <>
          <div
            className="ContainerReadModule"
            style={{ marginLeft: openNavContent ? "15%" : innerWidth>800? "1%":"" }}
          >
            <div className="ContentModule">
              <div className="headerContent">
                <button onClick={()=>{
                  window.history.back()
                }}>Back</button>
                <h1>{Content.SubTitle}</h1>
              </div>
              <div>
                <iframe
                  style={{
                    transition: "1000ms",
                    border: "10px",
                    width: CheckSubModule ? innerWidth < 900 ? "100%": "60%" : "90%",
                    height: innerWidth < 900 ? "200px" : "490px",
                    borderRadius: "10px",
                  }}
                  src={Content.LinkEmbed}
                ></iframe>
                <h1>Kesimpulan : </h1>
                <div
                  ref={ContentHTMLref}
                  style={{
                    width: CheckSubModule ? innerWidth < 900 ? "100%": "60%" : "90%",
                    transition: "1000ms",
                    marginBottom : "100px"
                  }}
                ></div>
              </div>
            </div>
            <ArrayOption
              CheckSubModule={CheckSubModule}
              SetCheckSubModule={SetCheckSubModule}
              ListSubModule={ListSubModule}
              idSubModule={idSubModule}
              idModule={idModule}
              learn={false}
              MethodCheck={MethodCheck}
            />
          </div>
        </>
      ) : null}
    </>
  );
};

export default ContentModule;
