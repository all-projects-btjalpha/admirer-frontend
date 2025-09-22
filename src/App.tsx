import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  matchPath,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import React, { useState, useEffect } from "react";
import Login from "./components/auth/Login";
import Layout from "./components/Layout";
import Complete_cart_checkout from "./pages/order-cycle";
import Dashboard_Profile from "./components/dashboard-profile";
import OrderDetails from "./components/dashboard-orders/OrderDetails";
import Dashboard from "./pages/Dashboard";
import ProductListing from "./pages/product-listing";
import ProductDetails from "./pages/ProductDetail";
import Wishlist from "./pages/Wishlist";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import ReturnRefund from "./pages/ReturnRefund";
import ExchangePolicy from "./pages/ExchangePolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import HelpContact from "./pages/Help_Faqs";
import BlogPage from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import AboutPage from "./pages/About";
import ScrollToTop from "./components/ScrollToTop";
import PrivateRoute from "./components/auth/PrivateRoute";
import NotFound from "./pages/NotFound";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThankYouPage from "./components/cart-checkout/checkout/ThankYou";
import { GlobalContextProvider } from "./contexts/GlobalContextProvider";
import RightSideBar from "./components/RightSideBar"
import useLenis from "./components/SmoothScroll";

// List of all valid route patterns
const routePatterns = [
  "/",
  "/LogIn",
  "/product/:id",
  "/dashboard_profile",
  "/order/:id",
  "/cart",
  "/listing",
  "/dashboard",
  "/wishlist",
  "/privacy",
  "/terms",
  "/return",
  "/exchange",
  "/shipping",
  "/help_faq",
  "/blogs",
  "/blog-details/:id",
  "/about",
  "/404",
];

function App() {
  // useLenis()
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  const RouteTracker = () => {
    const location = useLocation();

    useEffect(() => {
      const isMatched = routePatterns.some((pattern) =>
        matchPath({ path: pattern, end: true }, location.pathname)
      );

      const isDashboardProfile =
        location.pathname.startsWith("/dashboard_profile");

      // Routes where header and footer should be completely hidden (e.g., login, 404)
      const fullHiddenRoutes = ["/LogIn"];

      // Routes where only the footer should be hidden
      const footerHiddenRoutes = ["/cart", "/order/:id"];

      const shouldHideHeader =
        fullHiddenRoutes.includes(location.pathname) ||
        (!isMatched && !isDashboardProfile);
      const shouldHideFooter = footerHiddenRoutes.some((pattern) =>
        matchPath({ path: pattern, end: true }, location.pathname)
      );

      setShowHeader(!shouldHideHeader);
      setShowFooter(!shouldHideHeader && !shouldHideFooter);
    }, [location]);

    return null;
  };

  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <RouteTracker />
          {showHeader && <Header />}
          <ToastContainer
            position="top-center"
            autoClose={2500}
            hideProgressBar
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                />
              }
            />
            <Route
              path="/listing"
              element={
                <ProductListing
                />
              }
            />
            <Route path="/LogIn" element={<Login />} />
            <Route
              path="/product/:id"
              element={<ProductDetails wishlist={0} />}
            />
            <Route
              path="/dashboard_profile"
              element={
                <PrivateRoute>
                  <Dashboard_Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/order/:id"
              element={
                <PrivateRoute>
                  <OrderDetails />
                </PrivateRoute>
              }
            />
            <Route path="/cart" element={<Complete_cart_checkout />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/return" element={<ReturnRefund />} />
            <Route path="/exchange" element={<ExchangePolicy />} />
            <Route path="/shipping" element={<ShippingPolicy />} />
            <Route path="/help_faq" element={<HelpContact />} />
            <Route path="/blogs" element={<BlogPage />} />
            <Route path="/blog-details/:id" element={<BlogDetails />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="/*" element={<NotFound />} />
            <Route
              path="/order-confirmation"
              element={
                <PrivateRoute>
                  <ThankYouPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </Layout>
      {showFooter && <Footer />}
      </BrowserRouter>
        <RightSideBar/>
      
    </GlobalContextProvider>
  );
}

export default App;
