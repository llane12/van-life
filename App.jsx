import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans from "./pages/Vans";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/van-life/" element={<Home />} />
                    <Route path="/van-life/about" element={<About />} />
                    <Route path="/van-life/vans" element={<Vans />} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </>
    );
}
