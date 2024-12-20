import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
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
import EditCompanyDetails from "./components/Admin/company/EditCompanyDetails";
import StudentPage from "./components/Student/StudentPage";
import CompanyDetails from "./components/shared/CompanyDetails";
import StudentRegistration from "./components/Auth/StudentRegistration";
import ApplicationForm from "./components/Student/Application/ApplicaionForm";
import Applicants from "./components/Admin/company/Applicants";
import Company from "./components/Student/Company/Company";
import StudentProfile from "./components/Student/StudentProfile";
import StudentHomee from "./components/Student/StudentHomee";
import StudentInfo from "./components/Admin/StudentInfo";
import CustomApplication from "./components/Student/Application/CustomApplication";
import OTPVerification from "./components/Auth/OTPVerification";
import Applications from "./components/Student/Applications";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <ProtectedLogin>
              <Login />
            </ProtectedLogin>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedLogin>
              <StudentRegistration />

            </ProtectedLogin>
          }

        />
        <Route path="/verify-otp" element={<OTPVerification />} />

        <Route element={<PrivateOutlet />}>
          <Route element={<Home requiredRole={"Admin"} />}>
            <Route path="admin" element={<AdminPage />}>
              <Route path="" element={<DashBoard />} />
              <Route path="dash" element={<DashBoard />} />
              <Route path="manage-companies" element={<ManageCompanies />}>
                {/* <Route path="edit" element={<EditCompanyDetails />} /> */}
              </Route>
              <Route path="view-stats" element={<ViewStats />} />
              <Route path="manage-users" element={<ManageUsers />} />
              <Route path="profile" element={<Profile />} />
              <Route path="add-company" element={<AddCompanyPage />} />
              <Route path="stu_info/:id" element={<StudentInfo /> } />
              <Route
                path="manage-companies/edit/:id"
                element={<EditCompanyDetails />}
              />
              <Route path="details/:id" element={<CompanyDetails />} />
              <Route path="applicants/:id" element={<Applicants />} />
            </Route>
          </Route>

          <Route element={<Home requiredRole={"Student"} />}>
            <Route path="" element={<StudentPage />}>
            <Route path="" element={<StudentHomee /> } />
              <Route path="company" element={<Company />}></Route>
              <Route path="company/details/:id" element={<CompanyDetails />} />

              {/* <Route path="/application/:id" element={<ApplicationForm />} />
               */}
                             <Route path="/application/:id" element={<CustomApplication />} />

              <Route path="profile" element={<StudentProfile />} />
              <Route path="applications" element={<Applications />} />
             
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
