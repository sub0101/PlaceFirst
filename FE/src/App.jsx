import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login"
import PrivateOutlet from "./components/shared/PrivateOutlet";
import DashBoard from "./components/Admin/DashBoard";
import Home from "./components/Home";
import AddCompanyPage from "./components/Admin/AddCompanyPage";

function App() {


  return (

<Router>
      <Routes>

        <Route path='/login' element={<Login />} />

        <Route element={<PrivateOutlet />}>
          <Route path="/*" element={<Home />} />
          {/* <Route path="/add-company" component={AddCompanyPage} /> */}
        </Route>
      </Routes>
    </Router>

    
  )
}

export default App
