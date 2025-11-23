
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../API";

const Employee = () => {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = () => {
    API.get("/auth/employee")
      .then((res) => {
        if (res.data.Status) setEmployees(res.data.Result);
        else alert(res.data.Error);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      API.delete("/auth/delete_employee/" + id)
        .then((res) => {
          if (res.data.Status) fetchEmployees();
          else alert(res.data.Error);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Employee List</h3>
        <Link to="/dashboard/add_employee" className="btn btn-success">
          Add Employee
        </Link>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Email</th>
            <th>Address</th>
            <th>Salary</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e.id}>
              <td>{e.name}</td>
              <td>
                <img
                  src={`http://localhost:3000/Images/${e.image}`}
                  alt={e.name}
                  style={{ width: "50px", borderRadius: "50%" }}
                />
              </td>
              <td>{e.email}</td>
              <td>{e.address}</td>
              <td>{e.salary}</td>
              <td>{e.category_name}</td>
              <td>
                <Link
                  to={`/dashboard/edit_employee/${e.id}`}
                  className="btn btn-info btn-sm me-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(e.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employee;
