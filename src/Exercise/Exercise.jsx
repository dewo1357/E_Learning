import { useState } from "react";
import ArrayOption from "../Module/ArrayOption";
import "./style.css";
import { useEffect } from "react";
import { PostData, UploadImageToAPI } from "../Utilities/POST";
import Popup from "../Popup/Popup";
import { useRef } from "react";
import { GetData } from "../Utilities/GET";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

const Exercise = ({ idModule, learn, openNavContent }) => {
  const [ArrayExerCise, SetArrayExerCise] = useState([]);
  const [insAns, SetisAns] = useState([]);
  const [Loading, SetLoading] = useState(true);
  const [CheckSubModule, SetCheckSubModule] = useState(false);
  const [IdExerCise, SetIdExerCise] = useState(0);
  const [NumberExercise, setNumberExercise] = useState(0);
  const [TotalScore, SetTotalScore] = useState(0);
  const [Picture, SetPicture] = useState([]);
  const [FilePicture, SetFilePicture] = useState([]);
  const navigate = useNavigate();

  const [Title, SetTitle] = useState(null);

  //Popup State
  const [turnOnPopup, setTurnOnpOpup] = useState(false);
  const [FinishProcess, SetFinsihProcess] = useState(false);
  const [Message, SetMessage] = useState("Apakah Anda Yakin?");
  const [CategoryContent, setCategoryContent] = useState(false);
  const GetExerCise = async () => {
    const DataExercise = await GetData(`GetExerCise/${idModule}`);
    console.log(DataExercise);
    SetArrayExerCise(DataExercise.Exercise);
    SetIdExerCise(DataExercise.Exercise.length);
    SetisAns(Array(DataExercise.Exercise.length).fill(false));
  };

  useEffect(() => {
    if (Loading) {
      const data = JSON.parse(localStorage.getItem("Module"));
      if (data) {
        const MyModule = data.filter((item) => item.id === idModule);
        SetTitle(MyModule[0].Title);
        GetExerCise();

        SetLoading(false);
      }else{
        navigate("/")
      }
    }
  }, []);

  const Edit = (Index, Category, value) => {
    console.log(Index);
    const Data = ArrayExerCise.slice();
    Data[Index][Category] = value;
    SetArrayExerCise(() => Data);
    console.log(ArrayExerCise);
  };

  const HandleImage = (Index, Category, file) => {
    console.log("EDIT IMG");
    if (!file) {
      console.log("Salag");
      return false;
    }
    console.log("benar, ");
    const ContentType = ["image/png", "image/jpg", "image/jpeg"];
    if (ContentType.includes(file.type) && file.size < 3000000) {
      const renamed = nanoid(10);
      const UpdateFile = new File([file], renamed, {
        type: file.type,
      });

      const Files = new FormData();
      Files.append("fileImage", UpdateFile);

      if (!Picture[Index]) {
        SetPicture([...Picture, URL.createObjectURL(UpdateFile)]);
        SetFilePicture([...FilePicture, UpdateFile]);
      } else {
        const Data = Picture.slice();
        Data[Index] = URL.createObjectURL(UpdateFile);
        SetPicture(() => Data);

        const ArrFile = FilePicture.slice();
        ArrFile[Index] = UpdateFile;
        SetFilePicture(ArrFile);
      }

      const PictureName = Files.get("fileImage").name;
      const Data = ArrayExerCise.slice();
      Data[Index][Category] = PictureName;
      SetArrayExerCise(() => Data);
      console.log(ArrayExerCise);
    }
  };
  console.log(Picture);
  console.log(FilePicture);

  const EditAns = (Index, SubIndex, Category, value) => {
    console.log(Index);
    const Data = ArrayExerCise.slice();
    Data[Index]["Ans"][SubIndex][Category] = value;
    SetArrayExerCise(() => Data);
  };

  const SubmitToExercise = (e) => {
    e.preventDefault();
    setTurnOnpOpup(true);
  };

  const SubmitExerciseToDatabase = async () => {
    SetMessage(() => "Sedang Di Proses");
    setCategoryContent("Process");
    const data = {
      idModule: idModule,
      Exercise: ArrayExerCise,
    };
    await PostData(data, "SubmitExercise", true);

    await Promise.all(
      FilePicture.map(async (item) => {
        await UploadImageToAPI(item);
      })
    );

    SetMessage(() => "Berhasil");
    SetFinsihProcess(true);
  };

  const CancelAction = () => {
    setTurnOnpOpup(false);
  };

  const formSoal = useRef();
  const PictSoal = useRef();
  const HrefCheck = (id) => {
    if (!learn) {
      console.log(id);
      location.href = `#${id}`;
      setNumberExercise(id);
    } else {
      setNumberExercise(id);
    }
  };

  const Anser = (IndexSoal, index) => {
    const Array = insAns.slice();
    Array[IndexSoal] = index;
    console.log(IndexSoal);
    SetisAns(Array);
    console.log(insAns);
  };
  console.log(insAns);
  console.log("Score Total : ", TotalScore);
  const Alphabet = ["A", "B", "C", "D"];

  const DoneExercise = async () => {
    const CheckAns = insAns.filter((item) => item === false);
    if (CheckAns.length === 0) {
      SetFinsihProcess(false);
      SetMessage("Process");
      setCategoryContent("Process");
      let hasil = 0;
      ArrayExerCise.map((item, Index) => {
        item.Ans.map((item, index) => {
          console.log(index, insAns[Index]);
          if (index === insAns[Index]) {
            hasil += item.Score;
            console.log(hasil);
          }
        });
      });
      const data = {
        Total_Score: hasil,
        idModule: idModule,
      };
      const submit = await PostData(data, "SubmitFinishExercise", true);
      if (submit.Status == 404) {
        SetMessage("Gagal");
      } else {
        SetMessage("Berhasil");
        navigate(`/TopicLesson/${idModule}`);
      }
      SetTotalScore(hasil);
      SetFinsihProcess(true);
    } else {
      setTurnOnpOpup(false);
    }
  };

  return (
    <>
      <div className="ExerCiseContainer">
        <div
          className="ContainerSoal"
          style={{
            transition: "1000ms",
            border: "10px",
            width: CheckSubModule || openNavContent ? "70%" : innerWidth < 900 ? null : "90%",
            scrollBehavior: "smooth",
            marginLeft: openNavContent ? "17%" : innerWidth < 900 ? " " : "1%",
            marginRight: CheckSubModule ? "17%" : "1%",
            
          }}
        >
          {!learn ? <h1>Add Exercise</h1> : null}
          <h1>{Title}</h1>
          {ArrayExerCise.length !== 0 ? (
            !learn ? (
              <form
                action=""
                onSubmit={SubmitToExercise}
                ref={formSoal}
                style={{ scrollBehavior: "smooth", transition: "2000ms" }}
              >
                <div style={{ scrollBehavior: "smooth" }}>
                  {ArrayExerCise.map((item, index) => (
                    <div
                      key={index}
                      id={`${index}`}
                      className="ContainerEachSoal"
                    >
                      <div>
                        <label htmlFor="Soal"> No {index + 1}</label>
                      </div>
                      <div className="ImageSoal">
                        <div>
                          <label htmlFor={`image${index}`} style={{}}>
                            <img
                              style={{
                                width: "350px",
                                backgroundImage:
                                  'url("/Images/icons8-upload-100.png")',
                              }}
                              alt=""
                              ref={PictSoal}
                              id={`imgE${index}`}
                              onMouseEnter={() => {
                                if (
                                  Picture[index] ||
                                  ArrayExerCise[index].ImagesSoal
                                ) {
                                  document
                                    .getElementById(`imgE${index}`)
                                    .setAttribute("src", " ");
                                }
                              }}
                              onMouseLeave={() => {
                                if (
                                  Picture[index] ||
                                  ArrayExerCise[index].ImagesSoal
                                ) {
                                  document
                                    .getElementById(`imgE${index}`)
                                    .setAttribute(
                                      "src",
                                      Picture[index]
                                        ? Picture[index]
                                        : `https://qfoylbowzoertpojnhvy.supabase.co/storage/v1/object/public/modulepicture//${ArrayExerCise[index].ImagesSoal}`
                                    );
                                }
                              }}
                              src={
                                Picture[index]
                                  ? Picture[index]
                                  : ArrayExerCise[index].ImagesSoal
                                  ? `
                                https://qfoylbowzoertpojnhvy.supabase.co/storage/v1/object/public/modulepicture//${ArrayExerCise[index].ImagesSoal}`
                                  : null
                              }
                            />
                          </label>
                          <input
                            type="file"
                            id={`image${index}`}
                            name={`image${index}`}
                            onChange={(e) => {
                              HandleImage(
                                index,
                                `ImagesSoal`,
                                e.target.files[0]
                              );
                            }}
                            hidden
                          />
                        </div>
                        <textarea
                          name={`Pertanyaan${index}`}
                          placeholder="Enter"
                          value={ArrayExerCise[index].Soal}
                          onChange={(e) => {
                            Edit(index, "Soal", e.target.value);
                          }}
                          id="Soal"
                          required
                        />
                      </div>
                      <div className="ContainerAsk">
                        {ArrayExerCise[index]["Ans"].map((item, Index) => (
                          <div className="ComponentSoal">
                            <input
                              name={`AskAnsA${index}`}
                              type="text"
                              placeholder={`Enter Your Answer ${Alphabet[Index]}`}
                              value={item[`AnswerExercise`]}
                              onChange={(e) => {
                                EditAns(
                                  index,
                                  Index,
                                  `AnswerExercise`,
                                  e.target.value
                                );
                              }}
                              required
                            />
                            <input
                              name={`AskScoreA${index}`}
                              placeholder="Score A"
                              type="Number"
                              value={item[`Score`]}
                              onChange={(e) => {
                                EditAns(index, Index, `Score`, e.target.value);
                              }}
                              required
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <button style={{ marginTop: "100px" }}>Simpan</button>
              </form>
            ) : (
              <div
                style={{
                  height: learn ? "100%" : "350px",
                }}
              >
                <div className="PictureSoal">
                  {ArrayExerCise[NumberExercise] ? (
                    <img
                      src={
                        ArrayExerCise[NumberExercise].ImagesSoal
                          ? `
                                https://qfoylbowzoertpojnhvy.supabase.co/storage/v1/object/public/modulepicture//${ArrayExerCise[NumberExercise].ImagesSoal}`
                          : ""
                      }
                    ></img>
                  ) : null}
                  <h2>{ArrayExerCise[NumberExercise].Soal}</h2>
                </div>
                {ArrayExerCise[NumberExercise]["Ans"].map((item, index) => (
                  <button
                    className={`ComponentSoal Exerciselearn ${
                      index === insAns[NumberExercise] ? "choosed" : ""
                    }`}
                    onClick={() => {
                      Anser(NumberExercise, index);
                    }}
                  >
                    <h3>{Alphabet[index]}</h3>
                    <h3>{item[`AnswerExercise`]}</h3>
                  </button>
                ))}
              </div>
            )
          ) : null}
          {learn ? (
            <div className="FooterButtonLearn">
              <button
                onClick={() => {
                  if (NumberExercise > 0) {
                    console.log(ArrayExerCise.length);
                    console.log(NumberExercise);
                    setNumberExercise(NumberExercise - 1);
                  }
                }}
                disabled={NumberExercise === 0 ? true : false}
              >
                Previous
              </button>
              <button
                onClick={() => {
                  if (NumberExercise < ArrayExerCise.length - 1) {
                    setNumberExercise(NumberExercise + 1);
                  } else {
                    SetMessage(
                      "Apakah Anda Yakin Ingin Menyelesaikan Exercise?"
                    );
                    setTurnOnpOpup(true);
                  }
                }}
              disabled={ArrayExerCise.length !==0?false:true}>
                {NumberExercise < ArrayExerCise.length - 1 ? "Next" : "Done"}
              </button>
            </div>
          ) : (
            <div className="FooterExerCise">
              <button
                onClick={() => {
                  const Array = ArrayExerCise.slice(1, ArrayExerCise.length);
                  SetArrayExerCise(Array);
                  SetIdExerCise(IdExerCise + 1);
                }}
                disabled={ArrayExerCise.length !== 0 ? false : true}
              >
                Hapus Soal
              </button>
              <button
                onClick={() => {
                  SetArrayExerCise([
                    ...ArrayExerCise,
                    {
                      id: IdExerCise,
                      Soal: null,
                      ImagesSoal: null,
                      Ans: [
                        {
                          AnswerExercise: null,
                          Score: null,
                        },
                        {
                          AnswerExercise: null,
                          Score: null,
                        },
                        {
                          AnswerExercise: null,
                          Score: null,
                        },
                        {
                          AnswerExercise: null,
                          Score: null,
                        },
                      ],
                    },
                  ]);
                  SetIdExerCise(IdExerCise + 1);
                  console.log(IdExerCise);
                }}
              >
                Tambah Soal
              </button>
            </div>
          )}
        </div>
        <div className="ListSoal">
          {ArrayExerCise.map(() => (
            <div>okee</div>
          ))}
        </div>
      </div>
      <ArrayOption
        learn={learn}
        CheckSubModule={CheckSubModule}
        SetCheckSubModule={SetCheckSubModule}
        ListSubModule={ArrayExerCise}
        MethodCheck={HrefCheck}
        NumberExercise={NumberExercise}
        insAns={insAns}
      />
      <Popup
        turnPopup={turnOnPopup}
        turnOverlay={turnOnPopup}
        message={Message}
        Finish={FinishProcess}
        Category={CategoryContent}
        action1={CancelAction}
        action2={!learn ? SubmitExerciseToDatabase : DoneExercise}
      />
    </>
  );
};

export default Exercise;
