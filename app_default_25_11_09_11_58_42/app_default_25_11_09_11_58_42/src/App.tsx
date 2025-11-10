// src/App.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// 🛑 ALL REQUIRED IMPORTS
import { useAuth } from "./context/AuthContext";
import Header from "./components/Header"; 
import ProtectedRoute from "./components/ProtectedRoute"; 
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs"; 
import Contact from "./pages/Contact"; 
import Login from "./pages/Login"; 
import Signup from "./pages/Signup"; 
import VerifyOtp from "./pages/VerifyOtp"; 
import RoleSelection from "./pages/RoleSelection"; 
import GuideOnboarding from "./pages/GuideOnboarding";
import UserDashboard from "./pages/UserDashboard"; 
import GuideDashboard from "./pages/GuideDashboard";
// 🛑 FIX: Correcting MealPlans casing to match disk
import MealPlans from "./pages/Mealplans"; 
import FoodLog from "./pages/FoodLog";
// 🛑 FIX: Importing the dedicated message components
import UserMessages from "./pages/UserMessages"; 
import GuideMessages from "./pages/GuideMessages"; 


const App: React.FC = () => {
    // This correctly calls useAuth
    const { isAuthenticated, userRole } = useAuth();

    return (
        <>
            <Header /> 
            <Routes>
                {/* -------------------- PUBLIC ROUTES -------------------- */}
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} />
                <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/" replace />} />
                <Route path="/verify-otp" element={!isAuthenticated ? <VerifyOtp /> : <Navigate to="/" replace />} />
                <Route path="/role-selection" element={<ProtectedRoute isAllowed={isAuthenticated}><RoleSelection /></ProtectedRoute>} />
                <Route path="/guide-onboarding" element={<ProtectedRoute isAllowed={isAuthenticated && userRole === "guide"}><GuideOnboarding /></ProtectedRoute>} />

                {/* -------------------- PROTECTED DASHBOARD ROUTES -------------------- */}
                
                {/* GUIDE DASHBOARD */}
                <Route
                    path="/guide/dashboard" 
                    element={<ProtectedRoute isAllowed={isAuthenticated && userRole === "guide"}><GuideDashboard /></ProtectedRoute>}
                />

                {/* USER DASHBOARD (MAIN ENTRY POINT) */}
                <Route
                    path="/user/dashboard" 
                    element={<ProtectedRoute isAllowed={isAuthenticated && userRole === "user"}><UserDashboard /></ProtectedRoute>}
                />
                
                {/* -------------------- USER NAVIGATION ROUTES -------------------- */}
                
                <Route 
                    path="/meal-plans" 
                    element={<ProtectedRoute isAllowed={isAuthenticated && userRole === "user"}><MealPlans /></ProtectedRoute>} 
                />
                <Route 
                    path="/food-log" 
                    element={<ProtectedRoute isAllowed={isAuthenticated && userRole === "user"}><FoodLog /></ProtectedRoute>} 
                />
                
                {/* 🛑 FIX: MESSAGE ROUTE - Renders correct component based on role */}
                {/* This is the final working messaging route, correctly using the UserMessages/GuideMessages components */}
                <Route 
                    path="/messages" 
                    element={
                        <ProtectedRoute isAllowed={isAuthenticated}>
                            {/* If role is 'guide', load the Guide-specific chat view, otherwise load the User view */}
                            {userRole === 'guide' ? <GuideMessages /> : <UserMessages />}
                        </ProtectedRoute>
                    } 
                />
                
                {/* Catch-all redirect to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    );
};

export default App;