
import React, { useEffect, useState } from "react";
import axios from "axios";

const SalaryHistory = () => {
  const [salaryHistory, setSalaryHistory] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  useEffect(() => {
    fetchEmployees();
    fetchSalaryHistory();
  }, []);

 
  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:3000/employee/employee_list");
      setAllEmployees(res.data);
    } catch (err) {
      console.error("Failed to fetch employees", err);
    }
  };


  const fetchSalaryHistory = async (employeeId = "") => {
    try {
      let url = "http://localhost:3000/employee/salary_history";
      if (employeeId) url += `?employee_id=${employeeId}`;
      const res = await axios.get(url);

      if (res.data.Status) {
        setSalaryHistory(res.data.Result);
      } else {
        setSalaryHistory([]);
        alert("No salary records found");
      }
    } catch (err) {
      console.error("Failed to fetch salary history", err);
    }
  };

  const handleEmployeeChange = (e) => {
    setSelectedEmployee(e.target.value);
  };

  const handleSearch = () => {
    fetchSalaryHistory(selectedEmployee);
  };


  const downloadCSV = () => {
    if (salaryHistory.length === 0) {
      alert("No data to download");
      return;
    }

  
    const headers = ["ID", "Employee", "Month", "Year", "Amount", "Paid On"];
    const rows = salaryHistory.map((s) => [
      s.id,
      s.employee_name,
      s.month,
      s.year,
      s.amount,
      new Date(s.paid_on).toLocaleString(),
    ]);

    
    let csvContent = "";
    csvContent += headers.join(",") + "\n";
    rows.forEach((rowArray) => {
      csvContent += rowArray.join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const filename = selectedEmployee
      ? `salary_history_employee_${selectedEmployee}.csv`
      : "salary_history_all.csv";

    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", filename);
    link.click();
  };

  return (
    <div className="container mt-4">
      <h3>Salary History</h3>

      <div className="mb-3 d-flex gap-2 align-items-center">
        <select
          className="form-select w-auto"
          value={selectedEmployee}
          onChange={handleEmployeeChange}
        >
          <option value="">All Employees</option>
          {allEmployees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}
        </select>

        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>

        <button className="btn btn-success" onClick={downloadCSV}>
          Download CSV
        </button>
      </div>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Employee</th>
            <th>Month</th>
            <th>Year</th>
            <th>Amount</th>
            <th>Paid On</th>
          </tr>
        </thead>
        <tbody>
          {salaryHistory.length > 0 ? (
            salaryHistory.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.employee_name}</td>
                <td>{s.month}</td>
                <td>{s.year}</td>
                <td>{s.amount}</td>
                <td>{new Date(s.paid_on).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No salary records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SalaryHistory;
