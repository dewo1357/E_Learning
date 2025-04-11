/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState } from "react";
import Label from "../../Component/Label";
import Input from "../../Component/Input";
import Editor from "./Editor";
import ContainerImage from "./ContainerImage";
import { Quill } from "react-quill";
import { useEffect } from "react";
import { PostData, UploadImageToAPI } from "../../Utilities/POST";
import { EditData } from "../../Utilities/PUT";
import { useNavigate } from "react-router-dom";

const Delta = Quill.import("delta");

const ContainerForm = ({
  SettingSub,
  AddSubModule,
  Setting,
  idModule,
  IdSubModule,
  openNavContent,
}) => {
  const [readOnly, setReadOnly] = useState(false);
  const [Picture, SetPicture] = useState(null);
  const [FilePicture, SetFilePicture] = useState(null);
  const [Content, setContent] = useState(null);
  let ContentElement = null;
  console.log(ContentElement);
  const navigate = useNavigate();

  useEffect(() => {
    if ((Setting && idModule) || AddSubModule) {
      const KEY_STORAGE = SettingSub
        ? `ListDetailModule-${idModule}`
        : "Module";
      console.log(KEY_STORAGE);
      const IdReference = SettingSub ? IdSubModule : idModule;
      if (localStorage.getItem(KEY_STORAGE)) {
        const MyModule = JSON.parse(localStorage.getItem(KEY_STORAGE)); //Didapatkan dari Storage
        const data = MyModule.filter((item) => item.id === IdReference);
        console.log(idModule);
        console.log(data);
        if (SettingSub) {
          setContent({
            Title: data[0].Module.Title,
            SubTitle: data[0].SubTitle,
            Description: data[0].Description,
            ContentHtml: data[0].ContentHtml,
            PictureName: data[0].PictureName,
            LinkEmbed: data[0].LinkEmbed,
          });
        } else {
          setContent({
            Title: data[0].Title,
            SubTitle: data[0].SubTitle,
            Description: data[0].Description,
            ContentHtml: data[0].ContentHtml,
            PictureName: data[0].PictureName,
            LinkEmbed: data[0].LinkEmbed,
          });
        }
        !AddSubModule
          ? SetPicture(
              () =>
                `https://qfoylbowzoertpojnhvy.supabase.co/storage/v1/object/public/modulepicture//${data[0].PictureName}`
            )
          : false;
      }else{
        navigate("/")
      }
    } else {
      setContent({
        Title: "",
        SubTitle: "",
        Description: "",
      });
      SetPicture(null);
    }
    console.log(Content);
  }, [Setting]);
  console.log(Content);

  const excecute = async () => {
    console.log(document.getElementsByClassName("ql-editor")[0].innerHTML);
    console.log();
  };

  const AddToDatabase = async () => {
    let data = {
      ...Content,
      ContentHtml: document
        .getElementsByClassName("ql-editor")[0]
        .innerHTML.toString(),
    };
    const fetch = true;

    //execute add Picture
    if (FilePicture) {
      await UploadImageToAPI(FilePicture);
    }

    //execute add data To Database
    if (Setting && SettingSub) {
      //merubah data tanpa kolom Title
      data = {
        SubTitle: data.SubTitle,
        Description: data.Description,
        ContentHtml: data.ContentHtml,
        PictureName: data.PictureName,
        LinkEmbed: data.LinkEmbed,
      };
      console.log("Update SubModuleProcess Process");
      await EditData(data, `SettingSubModule/${idModule}`);
    } else if (Setting) {
      console.log("Update Process");
      await EditData(data, `SettingModule/${idModule}`);
    } else if (AddSubModule) {
      const SubMyModule = {
        idModule: idModule,
        SubTitle: data.SubTitle,
        Description: data.Description,
        ContentHtml: data.ContentHtml,
        PictureName: data.PictureName,
        LinkEmbed: data.LinkEmbed,
      };

      await PostData(SubMyModule, `AddSubModule`, fetch);
      localStorage.removeItem("ListDetailModule");
    } else {
      await PostData(data, "AddModule", fetch);
    }
  };

  // Use a ref to access the quill instance directly
  const quillRef = useRef();
  const Submit = async () => {
    const account = JSON.parse(localStorage.getItem("account"));
    await excecute();
    console.log(Content);
    await AddToDatabase();
    localStorage.removeItem("Module");
    sessionStorage.removeItem("Module");
    navigate(`/ModulePages/${account.username}`);
  };

  const ChangeValue = (e) => {
    console.log(e.target.name);
    if (e.target.name === "Title") {
      setContent({
        ...Content,
        Title: e.target.value,
      });
    } else if (e.target.name === "SubTitle") {
      setContent({
        ...Content,
        SubTitle: e.target.value,
      });
    } else if (e.target.name === "LinkEmbed") {
      setContent({
        ...Content,
        LinkEmbed: e.target.value,
      });
    } else {
      setContent({
        ...Content,
        Description: e.target.value,
      });
    }
  };

  const NameComponentForm = [
    {
      name: "Title",
      Max: 15,
    },
    {
      name: "SubTitle",
      Max: 30,
    },
    {
      name: "Description",
      Max: 30,
    },
    {
      name: "LinkEmbed",
      Max: 100,
    },
  ];
  console.log(Setting);

  return (
    <>
      {Content ? (
        <div className="ContainerActionModule" style={{marginLeft:openNavContent?"22%":"7%"}}>
          <div className="FormHeader">
            <div className="FormInformation">
              <form action="">
                {NameComponentForm.map((item, index) => (
                  <>
                    {index === 0 && (AddSubModule || SettingSub) ? (
                      <h1 style={{ marginTop: "0px" }}>
                        {Content[`${item.name}`]}
                      </h1>
                    ) : (
                      <>
                        <Label For={item.name} Content={item.name}></Label>
                        <Input
                          key={item.name}
                          nameId={item.name}
                          PlaceHolder={`Enter ${item.name}`}
                          value={!AddSubModule ? Content[`${item.name}`] : null}
                          Name={item.name}
                          onChange={ChangeValue}
                          max={item.Max}
                        />
                      </>
                    )}
                  </>
                ))}
              </form>
            </div>
            <ContainerImage
              Picture={Picture}
              SetPicture={SetPicture}
              Content={Content}
              setContent={setContent}
              SetFilePicture={SetFilePicture}
            />
          </div>
          <Editor
            ref={quillRef}
            readOnly={readOnly}
            value={Setting ? Content["ContentHtml"] : ""}
          />
          <div className="controls">
            <label>
              Read Only:{" "}
              <input
                type="checkbox"
                value={readOnly}
                onChange={(e) => setReadOnly(e.target.checked)}
              />
            </label>
            <button className="controls-right" type="button" onClick={Submit}>
              Save My Module
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ContainerForm;
