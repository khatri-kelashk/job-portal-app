"use client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "../components/LoginScreen";
import Dashboard from "../components/Dashboard";

export default function Home() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
