import { Rocket, Twitter, Linkedin, Instagram, Github, ArrowRight, Mail, Phone, MapPin, Facebook } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const Footer = () => {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail("");
        }
    };

    return (
        <footer className="relative bg-muted/30 border-t border-border overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="container mx-auto px-6 relative">
                {/* Top CTA Section */}
                <div className="py-16 border-b border-border">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-2">
                                Ready to start your project?
                            </h3>
                            <p className="text-muted-foreground">
                                Let's create something amazing together.
                            </p>
                        </div>
                        <Link to="/contact">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
                            >
                                Get Started <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        </Link>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                        {/* Brand */}
                        <div className="lg:col-span-2 space-y-6">
                            <Link to="/" className="flex items-center gap-2 group">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center text-white">
                                    <Rocket className="w-5 h-5" />
                                </div>
                                <span className="text-xl font-bold tracking-tight">
                                    Zayro <span className="text-primary">Studio</span>
                                </span>
                            </Link>
                            <p className="text-muted-foreground leading-relaxed max-w-sm">
                                We design and build digital experiences that empower brands to reach new heights. AI-powered precision, human-centric design.
                            </p>

                            <div className="space-y-3 pt-2">
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <Mail className="w-4 h-4 text-primary" />
                                    <a href="mailto:zayro.studio@gmail.com" className="hover:text-primary transition-colors">zayro.studio@gmail.com</a>
                                </div>
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <Phone className="w-4 h-4 text-primary" />
                                    <a href="tel:+923710241174" className="hover:text-primary transition-colors">+923710241174</a>
                                </div>
                                <div className="flex items-start gap-3 text-muted-foreground">
                                    <MapPin className="w-4 h-4 text-primary mt-1" />
                                    <span>Office 555, Sector 37-B, Landhi, Karachi</span>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="flex items-center gap-3">
                                {[
                                    { icon: Facebook, href: "https://www.facebook.com/p/Zayro-Studio-61579304242773/" },
                                    { icon: Twitter, href: "#" },
                                    { icon: Linkedin, href: "https://www.linkedin.com/company/zayro-studio/" },
                                    { icon: Instagram, href: "https://www.instagram.com/zayro_studio/" },
                                ].map((social, i) => (
                                    <motion.a
                                        key={i}
                                        href={social.href}
                                        whileHover={{ y: -3 }}
                                        className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                                    >
                                        <social.icon className="w-5 h-5" />
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-semibold mb-6">Company</h4>
                            <ul className="space-y-4">
                                {[
                                    { name: "About Us", path: "/about" },
                                    { name: "Services", path: "/services" },
                                    { name: "Portfolio", path: "/portfolio" },
                                    { name: "Careers", path: "/careers" },
                                    { name: "Contact", path: "/contact" },
                                ].map((link, i) => (
                                    <li key={i}>
                                        <Link
                                            to={link.path}
                                            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                                        >
                                            <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all" />
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <h4 className="font-semibold mb-6">Services</h4>
                            <ul className="space-y-4">
                                {[
                                    "Web Development",
                                    "UI/UX Design",
                                    "Mobile Apps",
                                    "AI Solutions",
                                    "Branding",
                                ].map((service, i) => (
                                    <li key={i}>
                                        <Link
                                            to="/services"
                                            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                                        >
                                            <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all" />
                                            {service}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h4 className="font-semibold mb-6">Stay Updated</h4>
                            <p className="text-sm text-muted-foreground mb-4">
                                Subscribe for the latest design trends and insights.
                            </p>
                            {subscribed ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm"
                                >
                                    Thanks for subscribing! ✨
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubscribe} className="space-y-3">
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-primary text-white px-4 py-3 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
                                    >
                                        Subscribe
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-border py-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Zayro Studio. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <Link to="/admin" className="hover:text-primary transition-colors">Admin Login</Link>
                        <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link to="/privacy" className="hover:text-primary transition-colors">Terms of Service</Link>
                        <Link to="/privacy" className="hover:text-primary transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
