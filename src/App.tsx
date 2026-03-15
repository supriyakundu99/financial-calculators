import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LocaleProvider } from "./contexts/LocaleContext";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import SIPPage from "./pages/SIPPage";
import SWPPage from "./pages/SWPPage";
import LumpsumPage from "./pages/LumpsumPage";

function App() {
  return (
    <LocaleProvider>
      <ThemeProvider>
        <Router>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sip" element={<SIPPage />} />
              <Route path="/swp" element={<SWPPage />} />
              <Route path="/lumpsum" element={<LumpsumPage />} />
            </Routes>
          </AppLayout>
        </Router>
      </ThemeProvider>
    </LocaleProvider>
  );
}

export default App;
