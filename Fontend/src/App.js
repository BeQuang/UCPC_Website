import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import User from './pages/User';
import Email from './pages/Email';
import Admin from './pages/Admin';
import Register from './components/Popup/Register';
import Login from './components/Popup/Login';
import EmailBuilder from './pages/Email/EmailBuilder/EmailBuilder';
import DashBoard from './components/Admin/DashBoard/DashBoard';
import UserManage from './components/Admin/User.js/User';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<User />} />
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/admin" element={<Admin />}>
                <Route index element={<DashBoard />} />
                <Route path="mailing" element={<Email />} />
                <Route path="manage-users" element={<UserManage />} />
            </Route>
            <Route path="/mail-builder" element={<EmailBuilder />} />
        </Routes>
    );
}

export default App;
