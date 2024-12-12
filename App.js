// src/App.js
import React, {useEffect, createContext, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import TestDetailPage from './pages/TestDetailPage/TestDetailPage';
import PracticePage from './pages/PracticePage/PracticePage';
import TestPage from './pages/TestPage/TestPage';
import './App.css';


const MyContext = createContext();


function App() {

    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
        id: "",
      });

    useEffect(() => {
        const token = localStorage.getItem("token");
    
        if (token !== "" && token !== undefined && token !== null) {
          setIsLogin(true);
    
          const userData = JSON.parse(localStorage.getItem("user"));
    
          setUser(userData);
        } else {
          setIsLogin(false);
        }
      }, [isLogin]);
    
      const values = {
        isLogin,
        setIsLogin,
        user,
        setUser
      }
    return (
        <Router>
            <MyContext.Provider value={values}>
            <div className="app-container">
                <Header />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/test" element={<TestPage />} />
                        <Route path="/detailtest" element={<TestDetailPage />} />
                        <Route path="/practice" element={<PracticePage />} />
                        {/* Add more routes as you build other pages */}
                    </Routes>
                </main>
                <Footer />
            </div>
            </MyContext.Provider>
        </Router>
    );
}

export default App;
export { MyContext };