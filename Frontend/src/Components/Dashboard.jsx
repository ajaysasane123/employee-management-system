import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const [summary, setSummary] = useState({
    totalAdmins: 0,
    totalEmployees: 0,
    totalSalary: 0,
    adminList: [],
  });

  const fetchSummary = () => {
    axios
      .get("http://localhost:3000/auth/dashboard/summary", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.Status) {
          setSummary(res.data.Result);
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchSummary();
  }, []);


  const handleLogout = () => {
    axios
      .get("http://localhost:3000/auth/logout")
      .then((result) => {
        if (result.data.Status) {
          localStorage.removeItem("adminValid");
          navigate("/adminlogin");
        }
      })
      .catch((err) => console.log(err));
  };

  
  const deleteAdmin = (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;

    axios
      .delete(`http://localhost:3000/auth/delete_admin/${id}`)
      .then((res) => {
        if (res.data.Status) {
          alert("Admin deleted successfully!");
          fetchSummary();
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">

      
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to="/dashboard"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                Code With AJAY
              </span>
            </Link>

            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="w-100">
                <Link to="/dashboard" className="nav-link text-white px-0 align-middle">
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>

              <li className="w-100">
                <Link to="/dashboard/employee" className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-people ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Manage Employees</span>
                </Link>
              </li>

              <li className="w-100">
                <Link to="/dashboard/category" className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-columns ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Category</span>
                </Link>
              </li>

          
              <li className="w-100">
                <Link to="/dashboard/attendance" className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-journal-check ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Attendance</span>
                </Link>
              </li>

              <Link to="/dashboard/salary_history" className="nav-link px-0 align-middle text-white">
                <i className="fs-4 bi-cash-stack ms-2"></i>
                <span className="ms-2 d-none d-sm-inline">Salary History</span>
              </Link>

              <li className="w-100">
                <Link to="/dashboard/profile" className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-person ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Profile</span>
                </Link>
              </li>




              <li className="w-100" onClick={handleLogout}>
                <Link className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

     
        <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <h4>Employee Management System</h4>
          </div>

          
          <div className="row mt-3 px-3">
            <div className="col-md-4">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h5>Total Admins</h5>
                  <h3>{summary.totalAdmins}</h3>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h5>Total Employees</h5>
                  <h3>{summary.totalEmployees}</h3>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h5>Total Salary</h5>
                  <h3>${summary.totalSalary}</h3>
                </div>
              </div>
            </div>


          </div>

          <div className="mt-4 px-3">
            <h5>List of Admins</h5>
            <table className="table table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                </tr>
              </thead>

              <tbody>
                {summary.adminList.length > 0 ? (
                  summary.adminList.map((admin) => (
                    <tr key={admin.id}>
                      <td>{admin.id}</td>
                      <td>{admin.email}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">
                      No Admins Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>




      


          <Outlet />

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
