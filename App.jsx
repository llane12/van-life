import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import AuthRequired from "./components/AuthRequired";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Account from "./pages/Account";
import About from "./pages/About";
import Vans from "./pages/Vans/Vans";
import VanDetail from "./pages/Vans/VanDetail";
import HostLayout from "./pages/Host/HostLayout";
import HostDashboard from "./pages/Host/HostDashboard";
import HostIncome from "./pages/Host/HostIncome";
import HostReviews from "./pages/Host/HostReviews";
import HostVans from "./pages/Host/HostVans";
import HostVanDetailLayout from "./pages/Host/HostVanDetailLayout";
import HostVanDetail from "./pages/Host/HostVanDetail";
import HostVanPricing from "./pages/Host/HostVanPricing";
import HostVanPhotos from "./pages/Host/HostVanPhotos";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/van-life" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="login" element={<Login />} />
                        <Route path="about" element={<About />} />
                        <Route path="vans" element={<Vans />} />
                        <Route path="vans/:id" element={<VanDetail />} />

                        <Route element={<AuthRequired />}>
                            <Route path="account" element={<Account />} />
                            <Route path="host" element={<HostLayout />}>
                                <Route index element={<HostDashboard />} />
                                <Route path="income" element={<HostIncome />} />
                                <Route path="reviews" element={<HostReviews />} />
                                <Route path="vans" element={<HostVans />} />
                                <Route path="vans/:id" element={<HostVanDetailLayout />}>
                                    <Route index element={<HostVanDetail />} />
                                    <Route path="pricing" element={<HostVanPricing />} />
                                    <Route path="photos" element={<HostVanPhotos />} />
                                </Route>
                            </Route>
                        </Route>

                        <Route path="*" element={<NotFound />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}
