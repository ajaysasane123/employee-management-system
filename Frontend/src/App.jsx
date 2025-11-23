import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Home from './Components/Home'
import Employee from './Components/Employee'
import Category from './Components/Category'
import Profile from './Components/Profile'
import AddCategory from './Components/AddCategory'
import AddEmployee from './Components/AddEmployee'
import EditEmployee from './Components/EditEmployee'
import Start from './Components/Start'
import EmployeeLogin from './Components/EmployeeLogin'
import EmployeeDetail from './Components/EmployeeDetail'
import PrivateRoute from './Components/PrivateRoute'
import Attendance from './Components/Attendance'
import SalaryHistory from './Components/SalaryHistory' // Added

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Start Page */}
        <Route path='/' element={<Start />}></Route>

        {/* Admin Login */}
        <Route path='/adminlogin' element={<Login />}></Route>

        {/* Employee Login */}
        <Route path='/employee_login' element={<EmployeeLogin />}></Route>

        {/* Employee Detail */}
        <Route path='/employee_detail/:id' element={<EmployeeDetail />}></Route>

        {/* Admin Dashboard */}
        <Route path='/dashboard' element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }>
          {/* Child Routes */}
          <Route path='' element={<Home />}></Route>
          <Route path='employee' element={<Employee />}></Route>
          <Route path='category' element={<Category />}></Route>
          <Route path='profile' element={<Profile />}></Route>
          <Route path='add_category' element={<AddCategory />}></Route>
          <Route path='add_employee' element={<AddEmployee />}></Route>
          <Route path='edit_employee/:id' element={<EditEmployee />}></Route>
          <Route path='attendance' element={<Attendance />} /> {/* Added */}
          <Route path='salary_history' element={<SalaryHistory />} /> {/* Added */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
