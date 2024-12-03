import "./css/App.css";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import SecondCart from "./pages/SecondCart";
import MyOrder from "./pages/MyOrder";
import UserProfilePage from "./pages/userProfilePage";
import UserProfilePageEdit from "./pages/UserProfilePageEdit"
import Adminlogin from "./adminside/Adminlogin";
import Adminpage from "./adminside/Adminpage";
import Edititem from "./adminside/EditItem"
import AdminAddItem from "./adminside/AdminAddItem";
import TotalOrder from "./adminside/TotalOrder";
import TotalAccount from "./adminside/TotalAccount";

function App() {
  return (
    <div className="app position-relative ">


        <Routes>

          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/userProfileEdit" element={<UserProfilePageEdit/>}/>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          {/* <Route exact path="/cart" element={<Cart />} /> */}
          <Route exact path="/SecondCart" element={<SecondCart />} />
          <Route exact path="/profile" element={<UserProfilePage user="nitin" />} />
          <Route exact path="/myorder" element={<MyOrder />} />

          {/* admin routes */}
          <Route exact path="admin/adminpage/edititem/:itemid" element={<Edititem/>} />
          <Route exact path="/admin/login" element={<Adminlogin />} />
          <Route exact path="/admin/Adminpage" element={<Adminpage />} />
          <Route exact path="/admin/AddItem" element={<AdminAddItem />} />
          <Route exact path="/admin/TotalOrder" element={<TotalOrder />} />
          {/* <Route exact path="/admin/editpage" element={<Edititem />} /> */}
          <Route exact path="/admin/useraccount" element={<TotalAccount />} />
          {/* useraccount */}
        </Routes>

    </div>
  );
}

export default App;
