import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import User from './pages/User';
import Email from './pages/Email';
import Admin from './pages/Admin';
import Register from './components/Popup/Register';
import Login from './components/Popup/Login';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<User />} />
            <Route path="/email" element={<Email />} />
            <Route path="/admin" element={<Admin />}></Route>
            <Route path = "/register" element = {<Register />}></Route>
            <Route path = "/login" element = {<Login />}></Route>
        </Routes>
    );
}

export default App;
