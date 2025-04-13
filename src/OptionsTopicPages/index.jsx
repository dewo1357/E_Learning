import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetData } from "../Utilities/GET";
import "./OptionsTopic.css";

const HeaderTopics = () => {
  const account = JSON.parse(localStorage.getItem("account"));
  const navigate = useNavigate();
  const [isAuthor, SetIsAuthor] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const LogoutExam = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  const CheckAuthor = async () => {
    const isAuthor = await GetData("CheckAuthor");
    if (isAuthor.Author) {
      SetIsAuthor(true);
    }
  };

  useEffect(() => {
    if (account) {
      CheckAuthor();
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
        if (window.innerWidth > 768) {
          setIsMenuOpen(false);
        }
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      {account !== null && (
        <div className="container">
          <div className="titleContainer">
            <h1>Daily Learn Code</h1>
          </div>

          {isMobile ? (
            <>
              <button
                className="burger-menu"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                ☰
              </button>
              {isMenuOpen && (
                <div className="mobile-menu">
                  <button
                    onClick={() => {
                      navigate("/AboutUs");
                      setIsMenuOpen(false);
                    }}
                  >
                    About Us
                  </button>
                  <button
                    onClick={() => {
                      navigate(`/MyPlaylistModule/${account.username}`);
                      setIsMenuOpen(false);
                    }}
                  >
                    Lessons
                  </button>
                  {isAuthor && (
                    <button
                      onClick={() => {
                        navigate(`/ModulePages/${account.username}`);
                        setIsMenuOpen(false);
                      }}
                    >
                      My Module
                    </button>
                  )}
                  <button
                    onClick={() => {
                      navigate(`/Settings`);
                      setIsMenuOpen(false);
                    }}
                  >
                    Setting
                  </button>
                  <button
                    onClick={() => {
                      LogoutExam();
                      setIsMenuOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="desktop-menu">
              <button onClick={() => navigate("/AboutUs")}>About Us</button>
              <button
                onClick={() =>
                  navigate(`/MyPlaylistModule/${account.username}`)
                }
              >
                Lessons
              </button>
              {isAuthor && (
                <button
                  onClick={() => navigate(`/ModulePages/${account.username}`)}
                >
                  My Module
                </button>
              )}
              <button onClick={() => navigate(`/Settings`)}>Setting</button>
              <button onClick={LogoutExam}>Logout</button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

const OptionsTopicPages = () => {
  const [account, setAccount] = useState(null);
  const [ArrModule, SetArrModule] = useState([]);
  const navigate = useNavigate();

  const GetModule = async () => {
    if (localStorage.getItem("Module")) {
      SetArrModule(JSON.parse(localStorage.getItem("Module")));
    } else {
      const data = await GetData("GetModule");
      SetArrModule(data.Module ? data.Module : []);
      localStorage.setItem("Module", JSON.stringify(data.Module));
    }
  };

  useEffect(() => {
    const account = localStorage.getItem("account")
    if (account) {
      GetModule();
      setAccount(JSON.parse(localStorage.getItem("account")).name);
    }else{
        navigate("/")
    }
  }, []);

  return (
    <>
      <div className="containerHeader">
        <HeaderTopics />
        <hr style={{ margin: "0px", marginTop: "10px" }} />
      </div>

      <div className="ContentOptions">
        <div>
          <h1 className="greeting">Hello {account}</h1>
        </div>
      </div>

      <div className="CategoryLesson">
        <button>Python</button>
        <button>C++</button>
        <button>Java</button>
        <button>Development</button>
      </div>

      <div className="CategoryLesson Study">
        {ArrModule.map((item, index) => (
          <div key={index} className="ComponentStudy">
            <div className="ImageContentComponent">
              <img
                src={`https://qfoylbowzoertpojnhvy.supabase.co/storage/v1/object/public/modulepicture//${item.PictureName}`}
                alt=""
              />
            </div>
            <div className="FooterContent">
              <h2>{item.Title}</h2>
              <p>{item.Description}</p>
              <button onClick={() => navigate(`/TopicLesson/${item.id}`)}>
                Pelajari
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OptionsTopicPages;
