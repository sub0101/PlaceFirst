import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login"
import PrivateOutlet from "./components/shared/PrivateOutlet";
import DashBoard from "./components/Admin/DashBoard";
import Home from "./components/Home";
import AddCompanyPage from "./components/Admin/AddCompanyPage";
import ManageCompanies from "./components/Admin/ManageCompanies";
import ManageUsers from "./components/Admin/ManageUsers";
import ViewStats from "./components/Admin/ViewStats";
import Profile from "./components/Admin/Profile";
import AdminPage from "./components/Admin/AdminPage";
import { ProtectedLogin } from "./components/Auth/ProtectedLogin";
function App() {


  return (

<Router>
      <Routes>

        <Route path='/login' element={
        <ProtectedLogin>
        <Login />
      </ProtectedLogin>

       

         } />

        <Route element={<PrivateOutlet />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/add-company" component={AddCompanyPage} /> */}
          <Route path="/"  element={<AdminPage /> }>
              <Route path="/dash" element={<DashBoard />} />
              <Route path="/manage-companies" element={<ManageCompanies />} />
              <Route path="/view-stats" element={<ViewStats />} />
              <Route path="/manage-users" element={<ManageUsers />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/add-company" element={<AddCompanyPage />} />
            </Route>
        </Route>
      </Routes>
    </Router>

    
  )
}

export default App
