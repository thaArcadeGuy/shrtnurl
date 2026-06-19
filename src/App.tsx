import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Dashboard from "./pages/Dashboard"
import Redirect from "./pages/Redirect"
import DevModeBanner from "./components/DevModeBanner"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <BrowserRouter>
      <DevModeBanner />
      <Routes>
        <Route path="/" element={<Landing />} /> 
        <Route path="/signup/*" element={<Signup />} />
        <Route path="/signin/*" element={<Signin />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/:slug" element={<Redirect />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;