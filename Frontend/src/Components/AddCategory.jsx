import React, { useState, useEffect } from "react";
import API from "../API";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    API.get("/auth/category")
      .then((res) => {
        if (res.data.Status) setCategories(res.data.Result);
        else alert(res.data.Error);
      })
      .catch((err) => console.log(err));
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!categoryName) return alert("Category name required!");

    API.post("/auth/add_category", { category: categoryName })
      .then((res) => {
        if (res.data.Status) {
          alert("Category added!");
          setCategoryName("");
          fetchCategories();
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm("Delete this category?")) {
      API.delete(`/auth/delete_category/${id}`)
        .then((res) => res.data.Status && fetchCategories())
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-4">
          <h3>Add Category</h3>
          <form onSubmit={handleAddCategory}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Enter Category"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <button className="btn btn-success w-100">Add</button>
          </form>
        </div>

        <div className="col-md-8">
          <h3>Category List</h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <td>{cat.name}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteCategory(cat.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
