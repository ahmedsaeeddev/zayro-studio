import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Filter, Eye, Github, Rocket, Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ScrollProgress, ParallaxFloat, ParallaxSection, Tilt3D, StaggerGrid, StaggerItem, MagneticHover } from "@/components/ParallaxEffects";

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const projects = [
    {
        id: 1,
        title: "E-Commerce Revolution",
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "A modern, high-performance e-commerce platform built with Next.js and Shopify.",
        tags: ["Next.js", "Redux", "Shopify API"]
    },
    {
        id: 2,
        title: "Fintech Dashboard",
        category: "UI/UX Design",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Intuitive financial analytics dashboard for real-time data visualization.",
        tags: ["Figma", "React", "D3.js"]
    },
    {
        id: 3,
        title: "HealthTrack App",
        category: "Mobile App",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "AI-powered health monitoring application for iOS and Android.",
        tags: ["React Native", "Firebase", "TensorFlow"]
    },
    {
        id: 4,
        title: "TravelGo Booking",
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Seamless travel booking experience with interactive maps and itineraries.",
        tags: ["Vue.js", "Mapbox", "Node.js"]
    },
    {
        id: 5,
        title: "Crypto Wallet",
        category: "UI/UX Design",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Secure and user-friendly cryptocurrency wallet interface.",
        tags: ["Figma", "Web3", "Tailwind"]
    },
    {
        id: 6,
        title: "Smart Home Controller",
        category: "Mobile App",
        image: "https://images.unsplash.com/photo-1558002038-1091a1661116?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Centralized control hub for smart home IoT devices.",
        tags: ["Flutter", "IoT", "AWS IoT"]
    }
];

const categories = ["All", "Web Development", "UI/UX Design", "Mobile App", "Branding"];

// Hero Section
const PortfolioHero = () => {
    return (
        <section className="relative py-24 overflow-hidden min-h-[50vh] flex items-center">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background" />

            {/* Gen Z Floating Elements */}
            <ParallaxFloat speed={0.4} className="absolute top-[10%] right-[10%]">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png" alt="Rocket" className="w-16 h-16" />
            </ParallaxFloat>
            <ParallaxFloat speed={0.6} className="absolute bottom-[20%] left-[8%]">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Artist%20Palette.png" alt="Palette" className="w-16 h-16" />
            </ParallaxFloat>
            <ParallaxFloat speed={0.3} className="absolute top-[30%] left-[15%]">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Gear.png" alt="Gear" className="w-14 h-14" />
            </ParallaxFloat>
            <ParallaxFloat speed={0.5} className="absolute bottom-[40%] right-[20%]">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Laptop.png" alt="Laptop" className="w-16 h-16" />
            </ParallaxFloat>
            <ParallaxFloat speed={0.7} className="absolute top-[20%] right-[30%]">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Shooting%20Star.png" alt="Star" className="w-12 h-12" />
            </ParallaxFloat>

            <div className="container mx-auto px-6 relative">
                <motion.div
                    className="max-w-3xl"
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                >
                    <motion.span variants={fadeUp} className="text-primary font-medium mb-4 block">
                        Our Portfolio
                    </motion.span>
                    <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold mb-6">
                        We Build{" "}
                        <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                            Masterpieces
                        </span>
                    </motion.h1>
                    <motion.p variants={fadeUp} className="text-xl text-muted-foreground leading-relaxed">
                        Explore our latest work and see how we help businesses transform their digital presence.
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
};

// Projects Grid
const ProjectsGrid = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [filteredProjects, setFilteredProjects] = useState(projects);

    const handleFilter = (category) => {
        setActiveCategory(category);
        if (category === "All") {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(projects.filter(project => project.category === category));
        }
    };

    return (
        <ParallaxSection className="py-16">
            <div className="container mx-auto px-6">
                {/* Filter */}
                <div className="flex flex-wrap gap-4 mb-16 justify-center">
                    {categories.map((category) => (
                        <MagneticHover key={category}>
                            <button
                                onClick={() => handleFilter(category)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category
                                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                                    : "bg-muted hover:bg-muted/80 text-muted-foreground"
                                    }`}
                            >
                                {category}
                            </button>
                        </MagneticHover>
                    ))}
                </div>

                {/* Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    layout
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.4 }}
                            >
                                <Tilt3D className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:shadow-xl hover:shadow-primary/5 transition-all">
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                            <Button variant="outline" size="icon" className="rounded-full bg-background/20 border-white/20 text-white hover:bg-white hover:text-black">
                                                <ExternalLink className="w-5 h-5" />
                                            </Button>
                                            <Button variant="outline" size="icon" className="rounded-full bg-background/20 border-white/20 text-white hover:bg-white hover:text-black">
                                                <Github className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="text-xs font-medium text-primary mb-2">{project.category}</div>
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Tilt3D>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                        No projects found in this category.
                    </div>
                )}
            </div>
        </ParallaxSection>
    );
};

// Portfolio Stats
const stats = [
    { label: "Completed Projects", value: "150+" },
    { label: "Happy Clients", value: "80+" },
    { label: "Awards Won", value: "15" },
    { label: "Years Experience", value: "6+" },
];

const PortfolioStats = () => {
    return (
        <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />

            <div className="container mx-auto px-6 relative z-10">
                <StaggerGrid className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, index) => (
                        <StaggerItem key={index}>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="p-6"
                            >
                                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                                <div className="text-primary-foreground/80 md:text-lg">{stat.label}</div>
                            </motion.div>
                        </StaggerItem>
                    ))}
                </StaggerGrid>
            </div>
        </section>
    );
};

// CTA Section
const PortfolioCTA = () => {
    return (
        <section className="py-24">
            <div className="container mx-auto px-6">
                <motion.div
                    className="max-w-4xl mx-auto text-center rounded-3xl bg-muted/30 p-12 border border-border relative overflow-hidden"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                >
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Have a Project in Mind?</h2>
                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            We'd love to help you turn your vision into reality. Check out our services or get in touch.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto">
                                        Start a Project
                                    </Button>
                                </motion.div>
                            </Link>
                            <Link to="/services">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                        View Services
                                    </Button>
                                </motion.div>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const Portfolio = () => {
    return (
        <>
            <ScrollProgress />
            <PortfolioHero />
            <ProjectsGrid />
            <PortfolioStats />
            <PortfolioCTA />
        </>
    );
};

export default Portfolio;
