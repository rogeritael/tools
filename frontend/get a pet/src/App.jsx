import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import {Container} from './components/layout/Container';

import {Home} from './components/pages/Home';
import {Login} from './components/pages/Auth/Login';
import {Register} from './components/pages/Auth/Register';
import { Message } from './components/layout/Message';
import { Profile } from './components/pages/User/Profile';

import {UserProvider} from './context/UserContext';

export default function App() {
  return (
    <Router>
      <UserProvider>
      <Navbar />
      <Message />
      <Container>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="user/profile" element={<Profile />}/>
        </Routes>
      </Container>
      <Footer />
      </UserProvider>
    </Router>
  );
}
