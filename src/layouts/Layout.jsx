import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { ThemeProvider } from "@/context/ThemeContext";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <ThemeProvider>
            <div className="flex flex-col min-h-screen">
                <CustomCursor />
                <Navbar />
                <main className="flex-1 pt-20">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </ThemeProvider>
    );
};

export default Layout;

