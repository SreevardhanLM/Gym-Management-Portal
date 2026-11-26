import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Classes from './pages/Classes';
import Join from './pages/Join';
import MyBookings from './pages/MyBookings';
import Confirmation from './pages/Confirmation';

export default function App() {
  return (
    <BookingProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-orange-500 selection:text-slate-950">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/classes" element={<Classes />} />
              <Route path="/join" element={<Navigate to="/join/pro-athlete" replace />} />
              <Route path="/join/:planId" element={<Join />} />
              <Route path="/my-bookings" element={<MyBookings />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </BookingProvider>
  );
}
