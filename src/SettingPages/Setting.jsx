import React, { useState } from "react";
import "./style.css"; // Kita akan buat file CSS terpisah
import { useEffect } from "react";
import Popup from "../Popup/Popup";
import { PostData, UploadImageToAPI } from "../Utilities/POST";
import { useNavigate } from "react-router-dom";
const UserSettings = () => {
  // State untuk data profil
  const [profile, setProfile] = useState({
    name: "John Doe",
    username: "johndoe",
  });

  const navigate = useNavigate()

  //Popup State
  const [turnOnPopup, setTurnOnpOpup] = useState(false);
  const [FinishProcess, SetFinsihProcess] = useState(false);
  const [Message, SetMessage] = useState("Apakah Anda Yakin?");
  const [CategoryContent, setCategoryContent] = useState(false);
  const [isPasswordSetting, SetPasswordSetting] = useState(false);

  useEffect(() => {
    const account = JSON.parse(localStorage.getItem("account"));
    if (account) {
      const [first, last] = account.name.split(" ");
      setProfile({
        firstName: first,
        lastName: last,
        username: account.username,
      });
    }else{
      navigate("/")
    }
  }, []);

  // State untuk form password
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // State untuk error validasi
  const [errors, setErrors] = useState({
    name: "",
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword({
      ...password,
      [name]: value,
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Validasi profil
    if (!profile.firstName.trim()) {
      newErrors.name = "Nama tidak boleh kosong";
      valid = false;
    } else {
      newErrors.name = "";
    }

    if (!profile.lastName.trim()) {
      newErrors.name = "Nama tidak boleh kosong";
      valid = false;
    } else {
      newErrors.name = "";
    }

    if (!profile.username.trim()) {
      newErrors.username = "Username tidak boleh kosong";
      valid = false;
    } else {
      newErrors.username = "";
    }

    // Validasi password (jika diisi)
    if (password.newPassword || password.confirmPassword) {
      if (!password.currentPassword) {
        newErrors.currentPassword = "Password saat ini harus diisi";
        valid = false;
      } else {
        newErrors.currentPassword = "";
      }

      if (password.newPassword.length < 6) {
        newErrors.newPassword = "Password minimal 6 karakter";
        valid = false;
      } else {
        newErrors.newPassword = "";
      }

      if (password.newPassword !== password.confirmPassword) {
        newErrors.confirmPassword = "Password tidak cocok";
        valid = false;
      } else {
        newErrors.confirmPassword = "";
      }
    }

    setErrors(newErrors);
    console.log(valid);
    return valid;
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Data Profil:", profile);
      setTurnOnpOpup(true);
      setCategoryContent("InputPass");
    }
  };

  const StartToSetting = async (password) => {
    SetMessage("Sedang Memproses");
    setCategoryContent("Process");
    const actionToSet = await PostData({ password }, "ValidatePassword", true);
    if (actionToSet.status !== 200) {
      SetMessage("Gagal");
    } else {
      let account = JSON.parse(localStorage.getItem("account"));
      const data = {
        First: profile.firstName,
        Last: profile.lastName,
        Username: profile.username,
      };
      let result = await PostData(data, "SettingProfile", true);
      console.log(result);

      //Change Information In Chace
      if (result.status === 200) {
        result = await result.json();
        console.log(result);
        const name = data.First + " " + data.Last;
        const username = data.Username;
        const { access_token, refresh_token } = result;

        account = { ...account, name, username, access_token, refresh_token };
        localStorage.setItem("account", JSON.stringify(account));
        SetMessage("Berhasil");
      } else {
        SetMessage("Gagal");
      }
    }
    SetFinsihProcess(true);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    SetMessage("Sedang Memproses");
    setCategoryContent("Process");
    setTurnOnpOpup(true);
    if (validateForm()) {
      console.log("Data Password:", password);
      let result = await PostData(password, "ChangePassword", true);
      if (result.status === 200) {
        SetMessage("Berhasil");
      } else {
        SetMessage("Gagal");
      }
      setPassword({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      SetFinsihProcess(true);
    } else {
      console.log("Salah");
    }
  };

  const CancelAction = () => {
    setTurnOnpOpup(false);
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        {/* Header */}
        <div className="settings-header">
          <button onClick={() => window.history.back()} className="back-button">
            ←
          </button>
          <h1>Pengaturan Akun</h1>
        </div>

        {/* Form Edit Profil */}
        <div className="settings-card">
          <h2>Edit Profil</h2>
          <form onSubmit={handleProfileSubmit}>
            <div className="form-group">
              <label>Nama Lengkap</label>
              <input
                type="text"
                name="firstName"
                value={profile.firstName}
                onChange={handleProfileChange}
              />
              {errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
            </div>
            <div className="form-group">
              <label>Nama Lengkap</label>
              <input
                type="text"
                name="lastName"
                value={profile.lastName}
                onChange={handleProfileChange}
              />
              {errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
            </div>

            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={profile.username}
                onChange={handleProfileChange}
              />
              {errors.username && (
                <span className="error-message">{errors.username}</span>
              )}
            </div>
            <button type="submit" className="save-button">
              Simpan Perubahan
            </button>
          </form>
        </div>

        {/* Form Ubah Password */}
        <div className="settings-card">
          <h2>Ubah Password</h2>
          <form onSubmit={handlePasswordSubmit}>
            <div className="form-group">
              <label>Password Saat Ini</label>
              <input
                type="password"
                name="currentPassword"
                value={password.currentPassword}
                onChange={handlePasswordChange}
              />
              {errors.currentPassword && (
                <span className="error-message">{errors.currentPassword}</span>
              )}
            </div>

            <div className="form-group">
              <label>Password Baru</label>
              <input
                type="password"
                name="newPassword"
                value={password.newPassword}
                onChange={handlePasswordChange}
              />
              {errors.newPassword && (
                <span className="error-message">{errors.newPassword}</span>
              )}
            </div>

            <div className="form-group">
              <label>Konfirmasi Password Baru</label>
              <input
                type="password"
                name="confirmPassword"
                value={password.confirmPassword}
                onChange={handlePasswordChange}
              />
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>

            <button type="submit" className="save-button">
              Ubah Password
            </button>
          </form>
        </div>
      </div>
      <Popup
        turnPopup={turnOnPopup}
        turnOverlay={turnOnPopup}
        message={Message}
        Finish={FinishProcess}
        Category={CategoryContent}
        action1={CancelAction}
        action2={!isPasswordSetting ? StartToSetting : null}
      />
    </div>
  );
};

export default UserSettings;
