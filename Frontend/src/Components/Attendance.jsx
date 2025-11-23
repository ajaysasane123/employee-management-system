import React, { useEffect, useState } from "react";
import axios from "axios";

const Attendance = () => {
    const [attendance, setAttendance] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [status, setStatus] = useState("Present");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);


    const fetchAttendance = () => {
        axios.get("http://localhost:3000/auth/attendance_records")
            .then(res => {
                if (res.data.Status) setAttendance(res.data.Result);
            })
            .catch(err => console.log(err));
    };


    const fetchEmployees = () => {

        axios.get("http://localhost:3000/employee/employee_list")

            .then(res => {
                console.log("Employee list:", res.data); // 🔹 Debug
                setEmployees(res.data);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchAttendance();
        fetchEmployees();
    }, []);



    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedEmployee) return alert("Select an employee");

        axios.post("http://localhost:3000/employee/attendance", {
            employee_id: selectedEmployee,
            date,
            status
        })
            .then(res => {
                if (res.data.Status) {
                    alert(res.data.Message);
                    fetchAttendance(); // Refresh table
                } else {
                    alert(res.data.Error);
                }
            })
            .catch(err => console.log(err));
    };


    const downloadCSV = () => {
        if (attendance.length === 0) return alert("No records to download");

        const header = ["ID", "Employee", "Date", "Status"];
        const csvRows = [
            header.join(","),
            ...attendance.map(a => [a.id, a.employee_name, a.date, a.status].join(","))
        ];
        const csvData = csvRows.join("\n");

        const blob = new Blob([csvData], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.setAttribute("hidden", "");
        a.setAttribute("href", url);
        a.setAttribute("download", `attendance_${date}.csv`);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="container mt-4">
            <h3>Attendance Records</h3>


            <form className="mb-4" onSubmit={handleSubmit}>
                <div className="row g-3 align-items-center">
                    <div className="col-md-3">
                        <label>Employee</label>
                        <select
                            className="form-select"
                            value={selectedEmployee}
                            onChange={e => setSelectedEmployee(e.target.value)}
                        >
                            <option value="">Select Employee</option>

                            {employees.length > 0 ? (
                                employees.map(emp => (
                                    <option key={emp.id} value={emp.id}>{emp.name}</option> // fullname → name
                                ))
                            ) : (
                                <option value="">No Employees Found</option>
                            )}

                        </select>
                    </div>
                    <div className="col-md-3">
                        <label>Date</label>
                        <input type="date" className="form-control" value={date} onChange={e => setDate(e.target.value)} />
                    </div>
                    <div className="col-md-3">
                        <label>Status</label>
                        <select className="form-select" value={status} onChange={e => setStatus(e.target.value)}>
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                            <option value="Leave">Leave</option>
                        </select>
                    </div>
                    <div className="col-md-3 d-flex align-items-end">
                        <button type="submit" className="btn btn-primary w-100">Add / Update</button>
                    </div>
                </div>
            </form>

            
            <div className="mb-3">
                <button className="btn btn-success" onClick={downloadCSV}>
                    Download Attendance
                </button>
            </div>

           
            <table className="table table-bordered mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Employee</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {attendance.map(a => (
                        <tr key={a.id}>
                            <td>{a.id}</td>
                            <td>{a.employee_name}</td>
                            <td>{a.date}</td>
                            <td>{a.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Attendance;
