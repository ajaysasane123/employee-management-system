import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../API";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    salary: "",
    address: "",
    category_id: "",
    image: null,
  });

  const [category, setCategory] = useState([]);

  useEffect(() => {

    API.get(`/auth/employee/${id}`)
      .then((res) => {
        if (res.data.Status) {

          const emp = res.data.Result;
          emp.category_id = emp.category_id || "";
          setEmployee(emp);
        } else alert(res.data.Error);
      })
      .catch((err) => console.log(err));


    API.get("/auth/category")
      .then((res) => {
        if (res.data.Status) setCategory(res.data.Result);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();


    const finalCategoryId =
      employee.category_id === "" || employee.category_id === "null"
        ? null
        : employee.category_id;

    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("salary", employee.salary);
    formData.append("address", employee.address);
    formData.append("category_id", finalCategoryId);

    if (employee.image instanceof File) {
      formData.append("image", employee.image);
    }

    API.post(`/auth/edit_employee/${id}`, formData)
      .then((res) => {
        if (res.data.Status) navigate("/dashboard/employee");
        else alert(res.data.Error);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3>Edit Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={employee.name}
            onChange={(e) =>
              setEmployee({ ...employee, name: e.target.value })
            }
            className="form-control mb-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={employee.email}
            onChange={(e) =>
              setEmployee({ ...employee, email: e.target.value })
            }
            className="form-control mb-2"
          />
          <input
            type="text"
            placeholder="Salary"
            value={employee.salary}
            onChange={(e) =>
              setEmployee({ ...employee, salary: e.target.value })
            }
            className="form-control mb-2"
          />
          <input
            type="text"
            placeholder="Address"
            value={employee.address}
            onChange={(e) =>
              setEmployee({ ...employee, address: e.target.value })
            }
            className="form-control mb-2"
          />


          <select
            className="form-select mb-2"
            value={employee.category_id}
            onChange={(e) =>
              setEmployee({ ...employee, category_id: e.target.value })
            }
          >
            <option value="">Select Category</option>
            {category.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <input
            type="file"
            onChange={(e) =>
              setEmployee({ ...employee, image: e.target.files[0] })
            }
            className="form-control mb-2"
          />

          <button className="btn btn-primary w-100">
            Update Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
