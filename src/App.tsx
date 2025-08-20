import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ContentProvider } from './contexts/ContentContext';
import Header from './components/Header';
import About from './components/About';
import EmpireTools from './components/EmpireTools';
import HowItWorks from './components/HowItWorks';
import WhyWomenLove from './components/WhyWomenLove';
import FinalCTA from './components/FinalCTA';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminDashboard from './components/admin/AdminDashboard';

const HomePage = () => (
  <div className="min-h-screen bg-[#FDF8F3] font-sans">
    <Header />
    <About />
    <EmpireTools />
    <HowItWorks />
    <WhyWomenLove />
    <FinalCTA />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </ContentProvider>
    </AuthProvider>
  );
}

export default App;