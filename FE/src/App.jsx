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
import NotFound from "./components/shared/NotFound";
import S_DashBoard from "./components/Student/S_DashBoard";
import EditCompanyDetails from "./components/Admin/company/EditCompanyDetails";
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
          <Route element={<Home requiredRole={"Admin"} />} >
            <Route path="admin" element={<AdminPage />}>

              <Route path="" element={<DashBoard />} />
              <Route path="dash" element={<DashBoard />} />
              <Route path="manage-companies" element={<ManageCompanies />} >
                {/* <Route path="edit" element={<EditCompanyDetails />} /> */}
              </Route>
              <Route path="view-stats" element={<ViewStats />} />
              <Route path="manage-users" element={<ManageUsers />} />
              <Route path="profile" element={<Profile />} />
              <Route path="add-company" element={<AddCompanyPage />} />
              <Route path="manage-companies/edit" element={<EditCompanyDetails />} />
            </Route>
          </Route>

          <Route element={<Home requiredRole={"Student"} />} >
            <Route path="" element={<S_DashBoard />} />

          </Route>

          <Route path="*" element={<NotFound />} />



        </Route>

      </Routes>

    </Router>


  )
}

export default App
