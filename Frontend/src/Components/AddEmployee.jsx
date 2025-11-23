import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    salary: "",
    address: "",
    category_id: "",
    image: null,
  });
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios.get("http://localhost:3000/auth/category")
      .then((res) => {
        if (res.data.Status) setCategory(res.data.Result);
        else alert(res.data.Error);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!employee.name || !employee.email || !employee.password || !employee.salary || !employee.address || !employee.category_id) {
      return alert("Please fill all required fields!");
    }

    const formData = new FormData();
    for (let key in employee) {
      if(employee[key]) formData.append(key, employee[key]);
    }

    axios.post("http://localhost:3000/auth/add_employee", formData)
      .then((res) => {
        if (res.data.Status) {
          alert("Employee added successfully!");
          navigate("/dashboard/employee");
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Employee</h3>
        <form className="row g-2" onSubmit={handleSubmit}>
          <div className="col-12">
            <label>Name</label>
            <input type="text" className="form-control" onChange={(e) => setEmployee({ ...employee, name: e.target.value })} />
          </div>
          <div className="col-12">
            <label>Email</label>
            <input type="email" className="form-control" onChange={(e) => setEmployee({ ...employee, email: e.target.value })} />
          </div>
          <div className="col-12">
            <label>Password</label>
            <input type="password" className="form-control" onChange={(e) => setEmployee({ ...employee, password: e.target.value })} />
          </div>
          <div className="col-12">
            <label>Salary</label>
            <input type="number" className="form-control" onChange={(e) => setEmployee({ ...employee, salary: e.target.value })} />
          </div>
          <div className="col-12">
            <label>Address</label>
            <input type="text" className="form-control" onChange={(e) => setEmployee({ ...employee, address: e.target.value })} />
          </div>
          <div className="col-12">
            <label>Category</label>
            <select className="form-select" onChange={(e) => setEmployee({ ...employee, category_id: e.target.value })}>
              <option value="">Select Category</option>
              {category.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="col-12 mb-3">
            <label>Upload Image</label>
            <input type="file" className="form-control" onChange={(e) => setEmployee({ ...employee, image: e.target.files[0] })} />
          </div>
          <button type="submit" className="btn btn-primary w-100">Add Employee</button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;



