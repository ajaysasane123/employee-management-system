
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = () => {
    axios
      .get(`http://localhost:3000/employee/detail/${id}`)
      .then((res) => {
        if (res.data.length > 0) {
          setEmployee(res.data[0]);
          setFullname(res.data[0].name || "");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    axios
      .get("http://localhost:3000/employee/logout")
      .then((res) => {
        if (res.data.Status) {
          localStorage.removeItem("valid");
          navigate("/employee_login");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("fullname", fullname);
    if (password) formData.append("password", password);
    if (profileImage) formData.append("profileImage", profileImage);

    axios.post(
      `http://localhost:3000/employee/update_profile/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" }
      }
    )

      .then((res) => {
        if (res.data.Status) {
          alert("Profile updated successfully");
          setEditMode(false);
          fetchEmployee();
        } else {
          alert("Failed to update profile");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-5">
      <div className="card p-3 shadow-sm">
        <div className="d-flex align-items-center mb-3">
          <img
            src={
              employee.profileImage
                ? `http://localhost:3000${employee.profileImage}`
                : "/Images/employeems.jpeg"
            }
            alt="Profile"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
          <div className="ms-3">
            <h4>{employee.name}</h4>
            <p>{employee.email}</p>
          </div>
        </div>

        {editMode ? (
          <div>
            <div className="mb-3">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>New Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          

            <button className="btn btn-primary me-2" onClick={handleUpdate}>
              Update
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <button className="btn btn-warning me-2" onClick={handleEdit}>
              Edit
            </button>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetail;
