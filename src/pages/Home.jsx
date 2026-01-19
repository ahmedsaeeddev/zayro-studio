import { Button } from "@/components/ui/button";
import { motion, useInView, useMotionValue, useTransform, animate, useScroll } from "framer-motion";
import { ArrowRight, Code, Palette, Zap, Sparkles, Users, Trophy, Clock, ChevronDown, Quote, Star, ArrowUpRight, Layers, Cpu, Rocket, Shield, Headphones, TrendingUp } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ScrollProgress, ParallaxFloat, ParallaxSection } from "@/components/ParallaxEffects";

// Brand color
const brandColor = "#10B981";
const brandColorDark = "#059669";

// Animation variants
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

// Animated Counter Component
const Counter = ({ from = 0, to, suffix = "", duration = 2 }) => {
    const nodeRef = useRef(null);
    const inView = useInView(nodeRef, { once: true });
    const count = useMotionValue(from);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const [displayValue, setDisplayValue] = useState(from);

    useEffect(() => {
        if (inView) {
            const controls = animate(count, to, { duration });
            return controls.stop;
        }
    }, [inView, count, to, duration]);

    useEffect(() => {
        const unsubscribe = rounded.on("change", (latest) => {
            setDisplayValue(latest);
        });
        return unsubscribe;
    }, [rounded]);

    return <span ref={nodeRef}>{displayValue}{suffix}</span>;
};

// ===== HERO SECTION =====
const Hero = () => {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

    return (
        <section ref={heroRef} className="relative overflow-hidden min-h-[100vh] flex items-center">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

            {/* Large Floating Blobs */}
            <motion.div
                className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
                animate={{
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
                animate={{
                    x: [0, -30, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/10 to-emerald-400/10 rounded-full blur-3xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />

            {/* Gen Z Floating Elements */}
            <ParallaxFloat speed={0.3} className="absolute top-[15%] right-[15%]">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" alt="Sparkles" className="w-12 h-12" />
            </ParallaxFloat>
            <ParallaxFloat speed={0.5} className="absolute top-[25%] left-[10%]">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png" alt="Rocket" className="w-16 h-16" />
            </ParallaxFloat>
            <ParallaxFloat speed={0.4} className="absolute bottom-[30%] right-[20%]">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Gem%20Stone.png" alt="Gem" className="w-14 h-14" />
            </ParallaxFloat>
            <ParallaxFloat speed={0.35} className="absolute top-[40%] right-[8%]">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Artist%20Palette.png" alt="Palette" className="w-14 h-14" />
            </ParallaxFloat>

            {/* Floating geometric shapes */}
            <motion.div
                className="absolute top-1/4 right-1/4 w-4 h-4 bg-primary rounded-full"
                animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
                className="absolute top-1/3 left-1/4 w-3 h-3 bg-primary/60 rotate-45"
                animate={{ y: [0, 15, 0], rotate: [45, 90, 45] }}
                transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-1/3 right-1/3 w-6 h-6 border-2 border-primary/40 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.div
                className="absolute top-[60%] left-[20%] w-8 h-8 border border-primary/30 rounded-lg"
                animate={{ rotate: [0, 180, 360], scale: [1, 1.1, 1] }}
                transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
                className="absolute top-[20%] right-[30%] w-2 h-2 bg-emerald-400 rounded-full"
                animate={{ y: [0, -30, 0], x: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
            />

            {/* Floating Cards - Gen Z Style */}
            <motion.div
                className="absolute top-[20%] right-[5%] hidden lg:block"
                animate={{ y: [0, -15, 0], rotate: [3, -3, 3] }}
                transition={{ duration: 6, repeat: Infinity }}
            >
                <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-4 shadow-xl">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-emerald-400" />
                        <div>
                            <p className="text-xs font-medium">New Project</p>
                            <p className="text-xs text-muted-foreground">Just launched! 🎉</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                className="absolute bottom-[25%] left-[5%] hidden lg:block"
                animate={{ y: [0, 10, 0], rotate: [-2, 2, -2] }}
                transition={{ duration: 5, repeat: Infinity }}
            >
                <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-4 shadow-xl">
                    <div className="flex items-center gap-2">
                        <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                        <div>
                            <p className="text-xs font-bold">5.0 Rating</p>
                            <p className="text-xs text-muted-foreground">80+ Happy Clients</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                className="container mx-auto px-6 relative z-10"
                style={{ y, opacity, scale }}
            >
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={stagger}
                    >
                        <motion.div variants={fadeUp}>
                            <span className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                                <Sparkles className="w-4 h-4" />
                                AI-Powered Design & Development Agency
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={fadeUp}
                            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.1]"
                        >
                            We Create{" "}
                            <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">Digital Magic</span>
                            <br />
                            <span className="text-4xl md:text-5xl lg:text-6xl">That Drives Results</span>
                        </motion.h1>

                        <motion.p
                            variants={fadeUp}
                            className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto"
                        >
                            Transforming ideas into exceptional digital experiences with cutting-edge AI technology, stunning design, and flawless development.
                        </motion.p>

                        <motion.div
                            variants={fadeUp}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Link to="/contact">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg shadow-lg shadow-primary/25">
                                        Start Your Project <ArrowRight className="w-5 h-5" />
                                    </Button>
                                </motion.div>
                            </Link>
                            <Link to="/portfolio">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button variant="outline" size="lg" className="px-8 py-6 text-lg border-primary/30 hover:bg-primary/10 hover:border-primary">
                                        View Our Work
                                    </Button>
                                </motion.div>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
                        <ChevronDown className="w-6 h-6 text-primary" />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};


// ===== STATS SECTION =====
const Stats = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const stats = [
        { icon: Trophy, value: 150, suffix: "+", label: "Projects Delivered" },
        { icon: Users, value: 80, suffix: "+", label: "Happy Clients" },
        { icon: Clock, value: 5, suffix: "+", label: "Years Experience" },
        { icon: Star, value: 99, suffix: "%", label: "Client Satisfaction" },
    ];

    return (
        <section ref={ref} className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

            <div className="container mx-auto px-6 relative">
                <motion.div
                    className="grid grid-cols-2 lg:grid-cols-4 gap-8"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={stagger}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={scaleIn}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="text-center p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                        >
                            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                                <stat.icon className="w-7 h-7 text-primary" />
                            </div>
                            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent mb-2">
                                <Counter to={stat.value} suffix={stat.suffix} />
                            </div>
                            <p className="text-muted-foreground font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

// ===== SERVICES SECTION =====
const FeatureCard = ({ icon: Icon, title, description, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
        >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                <Icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
        </motion.div>
    );
};

const Services = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-24 bg-muted/30">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeUp}
                >
                    <span className="text-primary font-medium mb-4 block">What We Do</span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Core Expertise</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        We offer comprehensive digital solutions powered by AI to help your business thrive in the digital age.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={Palette}
                        title="UI/UX Design"
                        description="Creating intuitive, aesthetically stunning interfaces that captivate users and drive engagement across all platforms."
                        index={0}
                    />
                    <FeatureCard
                        icon={Code}
                        title="Web Development"
                        description="Building robust, scalable, and lightning-fast web applications using React, Next.js, and modern technologies."
                        index={1}
                    />
                    <FeatureCard
                        icon={Zap}
                        title="AI Automation"
                        description="Leveraging artificial intelligence to automate workflows, enhance productivity, and unlock new possibilities."
                        index={2}
                    />
                </div>

                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 }}
                >
                    <Link to="/services">
                        <Button variant="outline" size="lg" className="border-primary/30 hover:bg-primary/10 hover:border-primary">
                            View All Services <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

// ===== WHY CHOOSE US SECTION =====
const WhyChooseUs = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const features = [
        { icon: Rocket, title: "Fast Delivery", desc: "We deliver projects on time without compromising quality." },
        { icon: Shield, title: "Secure & Reliable", desc: "Built with security-first approach and best practices." },
        { icon: Headphones, title: "24/7 Support", desc: "Round-the-clock support to help you whenever you need." },
        { icon: TrendingUp, title: "Growth Focused", desc: "Solutions designed to scale with your business growth." },
        { icon: Cpu, title: "AI-Powered", desc: "Leveraging AI to enhance efficiency and innovation." },
        { icon: Layers, title: "Scalable", desc: "Architecture built to handle millions of users." },
    ];

    return (
        <section ref={ref} className="py-24">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-primary font-medium mb-4 block">Why Choose Us</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            We Build Digital Products That{" "}
                            <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">Stand Out</span>
                        </h2>
                        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                            With years of experience and a passion for innovation, we create digital solutions that not only meet your needs but exceed your expectations. Our AI-powered approach ensures faster delivery and better results.
                        </p>
                        <Link to="/about">
                            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                                Learn More About Us <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-2 gap-4"
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={stagger}
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={scaleIn}
                                whileHover={{ scale: 1.05 }}
                                className="p-5 rounded-xl bg-card/50 border border-border hover:border-primary/30 transition-all"
                            >
                                <feature.icon className="w-8 h-8 text-primary mb-3" />
                                <h4 className="font-semibold mb-1">{feature.title}</h4>
                                <p className="text-sm text-muted-foreground">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// ===== PROCESS SECTION =====
const Process = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const steps = [
        { num: "01", title: "Discovery", desc: "We dive deep into understanding your vision, goals, and target audience through detailed consultations." },
        { num: "02", title: "Strategy", desc: "Crafting a tailored roadmap with AI-powered insights, timelines, and clear milestones." },
        { num: "03", title: "Design & Build", desc: "Bringing ideas to life with stunning visuals, robust architecture, and clean code." },
        { num: "04", title: "Launch & Scale", desc: "Deploying with precision and providing ongoing support for continuous growth." },
    ];

    return (
        <section ref={ref} className="py-24 bg-muted/30">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeUp}
                >
                    <span className="text-primary font-medium mb-4 block">Our Process</span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">How We Work</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        A streamlined, transparent process that turns your ideas into reality with precision and care.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.num}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className="relative group"
                        >
                            <div className="p-8 rounded-2xl border border-border bg-card/50 hover:border-primary/30 hover:bg-card transition-all h-full">
                                <span className="text-6xl font-bold bg-gradient-to-r from-primary/20 to-primary/5 bg-clip-text text-transparent group-hover:from-primary group-hover:to-emerald-400 transition-all">
                                    {step.num}
                                </span>
                                <h3 className="text-xl font-bold mt-4 mb-3">{step.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                            </div>
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ===== FEATURED PROJECTS =====
const FeaturedProjects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const projects = [
        {
            title: "E-Commerce Platform",
            category: "Web Development",
            gradient: "from-violet-500 to-purple-500",
            image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80"
        },
        {
            title: "SaaS Dashboard",
            category: "UI/UX Design",
            gradient: "from-blue-500 to-cyan-500",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
        },
        {
            title: "AI Analytics Tool",
            category: "AI Integration",
            gradient: "from-primary to-emerald-400",
            image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80"
        },
    ];

    return (
        <section ref={ref} className="py-24">
            <div className="container mx-auto px-6">
                <motion.div
                    className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-4"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeUp}
                >
                    <div>
                        <span className="text-primary font-medium mb-4 block">Our Work</span>
                        <h2 className="text-4xl md:text-5xl font-bold">Featured Projects</h2>
                    </div>
                    <Link to="/portfolio">
                        <Button variant="outline" className="border-primary/30 hover:bg-primary/10 hover:border-primary">
                            View All <ArrowUpRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            whileHover={{ y: -10 }}
                            className="group cursor-pointer"
                        >
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-60 group-hover:opacity-80 transition-opacity`} />
                                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                    <span className="text-sm text-white/80 font-medium">{project.category}</span>
                                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ===== TESTIMONIALS =====
const Testimonials = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const testimonials = [
        {
            quote: "Zayro Studio transformed our digital presence completely. Their AI-powered approach delivered results beyond our expectations. The team was professional and responsive throughout.",
            author: "Sarah Johnson",
            role: "CEO, TechStart Inc.",
            rating: 5
        },
        {
            quote: "The team's attention to detail and creative solutions helped us achieve a 200% increase in user engagement. They truly understand modern web development.",
            author: "Michael Chen",
            role: "Marketing Director, GrowthLabs",
            rating: 5
        },
        {
            quote: "Professional, innovative, and incredibly talented. They delivered our project ahead of schedule with outstanding quality. Highly recommended for any digital project.",
            author: "Emily Davis",
            role: "Founder, DesignCo",
            rating: 5
        },
    ];

    return (
        <section ref={ref} className="py-24 bg-muted/30">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeUp}
                >
                    <span className="text-primary font-medium mb-4 block">Testimonials</span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">What Our Clients Say</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Don't just take our word for it - hear from some of our satisfied clients.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm relative hover:border-primary/30 transition-all"
                        >
                            <Quote className="w-10 h-10 text-primary/20 absolute top-6 right-6" />
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                                ))}
                            </div>
                            <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.quote}"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-emerald-400" />
                                <div>
                                    <p className="font-semibold">{testimonial.author}</p>
                                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ===== PARTNERS/CLIENTS =====
const Partners = () => {
    const partners = ["Patch Dispatcher", "United Punch", "Grafico Sourcing", "Doria", "Quality Digitize", "Classic Punch"];

    return (
        <section className="py-20 border-y border-border">
            <div className="container mx-auto px-6">
                <p className="text-center text-muted-foreground mb-12 text-lg">Trusted by innovative companies worldwide</p>
                <div className="flex overflow-hidden relative">
                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
                    <motion.div
                        className="flex gap-20 items-center"
                        animate={{ x: [0, -1200] }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    >
                        {[...partners, ...partners, ...partners].map((partner, index) => (
                            <span
                                key={index}
                                className="text-3xl font-bold text-muted-foreground/30 hover:text-primary transition-colors whitespace-nowrap"
                            >
                                {partner}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// ===== CTA SECTION =====
const CTA = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-32 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity }}
            />

            <div className="container mx-auto px-6 relative">
                <motion.div
                    className="max-w-3xl mx-auto text-center"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={stagger}
                >
                    <motion.h2
                        variants={fadeUp}
                        className="text-4xl md:text-6xl font-bold mb-6"
                    >
                        Ready to Build Something{" "}
                        <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">Amazing</span>?
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        className="text-xl text-muted-foreground mb-10 leading-relaxed"
                    >
                        Let's turn your vision into reality. Get in touch and let's start creating together. Your next big thing is just a conversation away.
                    </motion.p>
                    <motion.div
                        variants={fadeUp}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link to="/contact">
                            <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg shadow-lg shadow-primary/25">
                                Get Free Consultation <ArrowRight className="w-5 h-5" />
                            </Button>
                        </Link>
                        <Link to="/portfolio">
                            <Button variant="outline" size="lg" className="px-8 py-6 text-lg border-primary/30 hover:bg-primary/10 hover:border-primary">
                                Browse Portfolio
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

// ===== MAIN HOME COMPONENT =====
const Home = () => {
    return (
        <>
            <ScrollProgress />
            <Hero />
            <Stats />
            <Services />
            <WhyChooseUs />
            <Process />
            <FeaturedProjects />
            <Testimonials />
            <Partners />
            <CTA />
        </>
    );
};

export default Home;
