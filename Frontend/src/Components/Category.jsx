
import React, { useEffect, useState } from "react";
import axios from "axios";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  axios.defaults.withCredentials = true;

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios.get("http://localhost:3000/auth/category")
      .then(res => { if(res.data.Status) setCategories(res.data.Result); })
      .catch(err => console.log(err));
  };

  const handleAddCategory = () => {
    if(!categoryName) return alert("Enter Category");
    axios.post("http://localhost:3000/auth/add_category", { category: categoryName })
      .then(res => {
        if(res.data.Status){
          setCategoryName("");
          fetchCategories();
        } else alert(res.data.Error);
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/auth/delete_category/${id}`)
      .then(res => { if(res.data.Status) fetchCategories(); })
      .catch(err => console.log(err));
  };

  return (
    <div className="container mt-3">
      <h3>Category List</h3>
      <div className="mb-2 d-flex">
        <input className="form-control me-2" value={categoryName} onChange={e=>setCategoryName(e.target.value)} placeholder="Enter Category"/>
        <button className="btn btn-primary" onClick={handleAddCategory}>Add Category</button>
      </div>
      <ul className="list-group">
        {categories.map(c => (
          <li key={c.id} className="list-group-item d-flex justify-content-between align-items-center">
            {c.name}
            <button className="btn btn-danger btn-sm" onClick={()=>handleDelete(c.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
