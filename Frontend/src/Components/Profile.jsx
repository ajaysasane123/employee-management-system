import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  axios.defaults.withCredentials = true; 

  
  useEffect(() => {
    axios.get("http://localhost:8081/admin-profile/" + localStorage.getItem("adminId"))
      .then((res) => {
        setProfile(res.data);
        setFullname(res.data.fullname);
        setEmail(res.data.email);
        setImage(res.data.image);
      })
      .catch((err) => console.log(err));
  }, []);


  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const updateProfile = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("email", email);
    if (password.trim() !== "") formData.append("password", password);
    if (image) formData.append("image", image);

    axios
      .put("http://localhost:3000/auth/update_admin_profile", formData)
      .then((res) => {
        if (res.data.Status) {
          alert("Profile Updated Successfully!");
          setIsEditing(false);
          const updated = res.data.Result;
          setProfile(updated);
          setFullname(updated.fullname);
          setEmail(updated.email);
          setPreview(`http://localhost:3000/images/${updated.image}`);
          setPassword("");
          setImage(null);
        } else {
          alert(res.data.Error || "Update failed");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-3">
      <div className="card shadow p-4" style={{ maxWidth: "550px", margin: "auto" }}>
        <div className="text-center mb-3">
          <img
            src={preview}
            alt="Admin"
            style={{
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #ccc",
            }}
          />
          <h4 className="mt-3">{profile.fullname}</h4>
          <p className="text-muted">Administrator</p>
        </div>

        {isEditing ? (
          <form onSubmit={updateProfile}>
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control mb-3"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />

            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Leave blank to keep current password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label className="form-label">Profile Image</label>
            <input
              type="file"
              className="form-control mb-4"
              onChange={handleImage}
            />

            <button type="submit" className="btn btn-primary w-100 mb-2">
              Save Changes
            </button>
            <button
              type="button"
              className="btn btn-secondary w-100"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </form>
        ) : (
          <button className="btn btn-info w-100" onClick={() => setIsEditing(true)}>
            Update Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
