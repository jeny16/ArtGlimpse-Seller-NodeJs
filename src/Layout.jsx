import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "./store/authSlice";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const validateToken = async () => {
      const storedUser = localStorage.getItem("seller");
      if (storedUser) {
        const { token } = JSON.parse(storedUser);
        try {
          await axios.get("http://localhost:3000/api/validate", {
            headers: { Authorization: `Bearer ${token}` },
          });
        } catch (error) {
          dispatch(logout());
          localStorage.removeItem("seller");
          console.error(
            "Token validation failed, user has been logged out.",
            error
          );
        }
      }
    };

    validateToken();
  }, [dispatch]);
  return (
    <Box>
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // p: 1,
          width: "100%",
          // maxWidth: "1200px",
          mx: "auto",
          minHeight: "100vh"
        }}
      >
        <Outlet />
        <ToastContainer position='top-right' />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
