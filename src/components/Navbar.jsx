import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Rocket, Sun, Moon, Instagram, Linkedin, Facebook, Twitter, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const [showSocials, setShowSocials] = useState(false);

    const socials = [
        { icon: Instagram, href: "https://instagram.com/zayro_studio", name: "Instagram" },
        { icon: Linkedin, href: "https://linkedin.com/company/zayro-studio", name: "LinkedIn" },
        { icon: Facebook, href: "https://facebook.com/zayrostudio", name: "Facebook" },
        { icon: Twitter, href: "https://twitter.com/zayrostudio", name: "X (Twitter)" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: "Portfolio", path: "/portfolio" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
                scrolled ? "bg-background/80 backdrop-blur-md border-border shadow-sm py-3" : "bg-transparent py-5"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <motion.div
                        className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg shadow-primary/20"
                        whileHover={{ rotate: 14, scale: 1.15 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <img src="/logo.png" alt="Logo" className="w-9 h-9 object-contain" />
                    </motion.div>
                    <span className="text-xl font-bold tracking-tight">
                        Zayro <span className="text-primary">Studio</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={cn(
                                "relative px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-muted",
                                location.pathname === link.path ? "text-primary" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {link.name}
                            {location.pathname === link.path && (
                                <motion.div
                                    layoutId="navbar-indicator"
                                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                                />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Right Side Actions */}
                <div className="hidden lg:flex items-center gap-3">
                    {/* Theme Toggle */}
                    <motion.button
                        onClick={toggleTheme}
                        className="p-2.5 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Toggle theme"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={theme}
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {theme === 'dark' ? (
                                    <Sun className="w-5 h-5 text-primary" />
                                ) : (
                                    <Moon className="w-5 h-5 text-primary" />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </motion.button>

                    <Link to="/contact">
                        <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                            Get Started
                        </Button>
                    </Link>

                    {/* Social Carousel Toggle */}
                    <div className="relative">
                        <motion.button
                            onClick={() => setShowSocials(!showSocials)}
                            className={cn(
                                "p-2.5 rounded-xl border border-border transition-all flex items-center justify-center",
                                showSocials ? "bg-primary text-white border-primary" : "bg-muted hover:bg-muted/80 text-foreground"
                            )}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Show socials"
                        >
                            <Share2 className="w-5 h-5" />
                        </motion.button>

                        <AnimatePresence>
                            {showSocials && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: 20, scale: 0.95 }}
                                    className="absolute right-0 top-14 p-2 bg-background/90 backdrop-blur-xl border border-border rounded-2xl shadow-2xl flex items-center gap-2 min-w-[200px]"
                                >
                                    <div className="flex items-center gap-2 px-2 overflow-x-auto no-scrollbar py-1">
                                        {socials.map((social) => (
                                            <motion.a
                                                key={social.name}
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all border border-transparent hover:border-primary/20"
                                                whileHover={{ y: -3, scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                title={social.name}
                                            >
                                                <social.icon className="w-5 h-5" />
                                            </motion.a>
                                        ))}
                                    </div>
                                    <div className="h-6 w-[1px] bg-border mx-1" />
                                    <button
                                        onClick={() => setShowSocials(false)}
                                        className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Mobile Controls */}
                <div className="flex lg:hidden items-center gap-2">
                    {/* Theme Toggle Mobile */}
                    <motion.button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg bg-muted"
                        whileTap={{ scale: 0.95 }}
                    >
                        {theme === 'dark' ? (
                            <Sun className="w-5 h-5 text-primary" />
                        ) : (
                            <Moon className="w-5 h-5 text-primary" />
                        )}
                    </motion.button>

                    <button
                        className="p-2 text-foreground"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isOpen ? "close" : "open"}
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                            >
                                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </motion.div>
                        </AnimatePresence>
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border lg:hidden"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="container mx-auto px-6 py-6 flex flex-col gap-2">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            to={link.path}
                                            className={cn(
                                                "block py-3 px-4 text-lg font-medium rounded-xl transition-colors",
                                                location.pathname === link.path
                                                    ? "text-primary bg-primary/10"
                                                    : "text-muted-foreground hover:bg-muted"
                                            )}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: navLinks.length * 0.05 }}
                                    className="pt-4"
                                >
                                    <Link to="/contact">
                                        <Button className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg">
                                            Get Started
                                        </Button>
                                    </Link>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: (navLinks.length + 1) * 0.05 }}
                                    className="flex justify-center gap-4 pt-4 border-t border-border mt-2"
                                >
                                    {socials.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 rounded-xl bg-muted text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            <social.icon className="w-6 h-6" />
                                        </a>
                                    ))}
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;
