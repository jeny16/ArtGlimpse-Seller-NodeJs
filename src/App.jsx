import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import theme from "./style/Theme";
import { CssBaseline } from "@mui/material";
import { Provider, useSelector } from "react-redux";
import store from "./store/store";

// Seller & Common Pages
import Layout from "./Layout";
import AuthLayout from "./components/common/AuthLayout";
import HomeDashBoard from "./Pages/HomeDashBoard";
import HomePage from "./Pages/HomePage";
import AddProduct from "./Pages/AddProduct";
import Analytics from "./Pages/AnalyticsPage";
import Inventory from "./Pages/Inventory";
import OrderManagement from "./Pages/Orders";
import OrderDetailsPage from "./Pages/OrderDetailsPage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";

// Seller Profile Components
import ProfilePage from "./Pages/ProfilePage"; // our seller profile container
import SellerProfile from "./components/profile/SellerProfile";
import StoreDetails from "./components/profile/StoreDetails";
import PaymentDetails from "./components/profile/PaymentDetails";
import TermsAndConditions from "./components/profile/Terms";
import Privacy from "./components/profile/Privacy";
import DeleteAccount from "./components/profile/DeleteAccount";

// 🔁 Redirect based on login status (example)
const RedirectRoot = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return <Navigate to={isLoggedIn ? "/dashboard" : "/home"} />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <RedirectRoot />,
      },
      // 🔓 PUBLIC PAGE
      {
        path: "/home",
        element: (
          <AuthLayout authentication={false}>
            <HomePage />
          </AuthLayout>
        ),
      },

      // 🔐 LOGIN/REGISTER PAGES
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <LoginPage />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignupPage />
          </AuthLayout>
        ),
      },

      // 🔐 ALL PROTECTED ROUTES BELOW
      {
        path: "/dashboard",
        element: (
          <AuthLayout authentication={true}>
            <HomeDashBoard />
          </AuthLayout>
        ),
      },
      {
        path: "/add-product",
        element: (
          <AuthLayout authentication={true}>
            <AddProduct />
          </AuthLayout>
        ),
      },
      {
        path: "/analytics",
        element: (
          <AuthLayout authentication={true}>
            <Analytics />
          </AuthLayout>
        ),
      },
      {
        path: "/inventory",
        element: (
          <AuthLayout authentication={true}>
            <Inventory />
          </AuthLayout>
        ),
      },
      {
        path: "/orders",
        element: (
          <AuthLayout authentication={true}>
            <OrderManagement />
          </AuthLayout>
        ),
      },
      {
        path: "/orders/:orderId",
        element: (
          <AuthLayout authentication={true}>
            <OrderDetailsPage />
          </AuthLayout>
        ),
      },

      // 🔐 PROFILE + NESTED ROUTES
      {
        path: "/profile",
        element: (
          <AuthLayout authentication={true}>
            <ProfilePage />
          </AuthLayout>
        ),
        children: [
          { index: true, element: <SellerProfile /> },
          { path: "store-details", element: <StoreDetails /> },
          { path: "payment-details", element: <PaymentDetails /> },
          { path: "delete", element: <DeleteAccount /> },
          { path: "terms", element: <TermsAndConditions /> },
          { path: "privacy", element: <Privacy /> },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
