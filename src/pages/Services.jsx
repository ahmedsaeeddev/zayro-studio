import { motion, useInView } from "framer-motion";
import { Code, Palette, Zap, LineChart, Globe, Smartphone, ArrowRight, Check, Layers, Database, Cloud, Shield, Cpu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ScrollProgress, ParallaxFloat, ParallaxSection, Tilt3D, StaggerGrid, StaggerItem } from "@/components/ParallaxEffects";

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

// Hero Section
const ServicesHero = () => {
    return (
        <section className="relative py-24 overflow-hidden min-h-[60vh] flex items-center">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background" />

            {/* Gen Z Floating Elements */}
            <ParallaxFloat speed={0.6} className="absolute bottom-[20%] left-[8%]">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Gear.png" alt="Gear" className="w-16 h-16" />
            </ParallaxFloat>
            <ParallaxFloat speed={0.3} className="absolute top-[30%] left-[15%]">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Light%20Bulb.png" alt="Idea" className="w-14 h-14" />
            </ParallaxFloat>
            <ParallaxFloat speed={0.5} className="absolute bottom-[30%] right-[15%]">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Magnifying%20Glass%20Tilted%20Right.png" alt="Search" className="w-16 h-16" />
            </ParallaxFloat>
            <ParallaxFloat speed={0.4} className="absolute top-[10%] right-[10%]">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20professions/Robot.png" alt="Robot" className="w-16 h-16" />
            </ParallaxFloat>
            <ParallaxFloat speed={0.2} className="absolute top-[50%] right-[5%]">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Artist%20Palette.png" alt="Design" className="w-12 h-12" />
            </ParallaxFloat>

            <div className="container mx-auto px-6 relative">
                <motion.div
                    className="max-w-3xl"
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                >
                    <motion.span variants={fadeUp} className="text-primary font-medium mb-4 block">
                        Our Services
                    </motion.span>
                    <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold mb-6">
                        Digital Solutions That{" "}
                        <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                            Transform
                        </span>{" "}
                        Your Business
                    </motion.h1>
                    <motion.p variants={fadeUp} className="text-xl text-muted-foreground leading-relaxed">
                        We provide end-to-end digital solutions tailored to your unique needs. From stunning designs to robust development, we've got you covered.
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
};

// Main Services Grid
const mainServices = [
    {
        icon: Palette,
        title: "UI/UX Design",
        desc: "User-centric designs that drive engagement and create memorable experiences.",
        features: ["User Research & Personas", "Wireframing & Prototyping", "Visual Design Systems", "Usability Testing", "Responsive Design", "Design Handoff"]
    },
    {
        icon: Code,
        title: "Web Development",
        desc: "Performance-first web applications using React, Next.js, and modern technologies.",
        features: ["React & Next.js Apps", "Custom CMS Development", "E-Commerce Solutions", "API Development", "Performance Optimization", "SEO Implementation"]
    },
    {
        icon: Smartphone,
        title: "Mobile App Development",
        desc: "Native and cross-platform apps for iOS and Android that users love.",
        features: ["React Native Apps", "iOS Development", "Android Development", "App Store Optimization", "Push Notifications", "Offline Functionality"]
    },
    {
        icon: LineChart,
        title: "SEO & Digital Marketing",
        desc: "Data-driven strategies to boost your visibility and drive organic growth.",
        features: ["Technical SEO Audit", "Keyword Research", "Content Strategy", "Link Building", "Analytics & Reporting", "Conversion Optimization"]
    },
    {
        icon: Zap,
        title: "AI Integration",
        desc: "Leverage artificial intelligence to automate workflows and enhance efficiency.",
        features: ["ChatBot Development", "AI-Powered Analytics", "Process Automation", "Machine Learning", "Natural Language Processing", "Predictive Modeling"]
    },
    {
        icon: Globe,
        title: "Branding & Identity",
        desc: "Comprehensive brand identity that tells your story and connects with your audience.",
        features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Strategy", "Marketing Collateral", "Brand Voice & Tone"]
    }
];

const MainServicesSection = () => {
    return (
        <ParallaxSection className="py-24">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">What We Offer</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Comprehensive digital services designed to help your business thrive in the digital age.
                    </p>
                </motion.div>

                <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mainServices.map((service, index) => (
                        <StaggerItem key={index}>
                            <Tilt3D className="group h-full p-8 rounded-2xl border border-border bg-card/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                                    <service.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                                <p className="text-muted-foreground mb-6">{service.desc}</p>
                                <ul className="space-y-2">
                                    {service.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Check className="w-4 h-4 text-primary flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </Tilt3D>
                        </StaggerItem>
                    ))}
                </StaggerGrid>
            </div>
        </ParallaxSection>
    );
};

// Tech Stack Section
const techStack = [
    { name: "React", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },
    { name: "TypeScript", category: "Language" },
    { name: "Node.js", category: "Backend" },
    { name: "Python", category: "AI/ML" },
    { name: "PostgreSQL", category: "Database" },
    { name: "MongoDB", category: "Database" },
    { name: "AWS", category: "Cloud" },
    { name: "Docker", category: "DevOps" },
    { name: "Figma", category: "Design" },
    { name: "TensorFlow", category: "AI/ML" },
    { name: "GraphQL", category: "API" },
];

const TechStackSection = () => {
    return (
        <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                >
                    <span className="text-primary font-medium mb-4 block">Technology</span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Tech Stack</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        We use cutting-edge technologies to build scalable, performant, and secure solutions.
                    </p>
                </motion.div>

                <StaggerGrid className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {techStack.map((tech, index) => (
                        <StaggerItem key={index}>
                            <motion.div
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="p-4 rounded-xl bg-card/50 border border-border hover:border-primary/30 text-center transition-all hover:shadow-lg"
                            >
                                <p className="font-semibold">{tech.name}</p>
                                <p className="text-xs text-muted-foreground">{tech.category}</p>
                            </motion.div>
                        </StaggerItem>
                    ))}
                </StaggerGrid>
            </div>
        </section>
    );
};

// Additional Services
const additionalServices = [
    { icon: Layers, title: "Custom Software", desc: "Tailored solutions built from scratch for your specific needs." },
    { icon: Database, title: "Database Design", desc: "Efficient, scalable database architecture and optimization." },
    { icon: Cloud, title: "Cloud Solutions", desc: "AWS, GCP, and Azure deployment and management." },
    { icon: Shield, title: "Security Audit", desc: "Comprehensive security assessment and implementation." },
    { icon: Cpu, title: "System Integration", desc: "Seamless integration with existing systems and APIs." },
    { icon: Sparkles, title: "AI Consulting", desc: "Strategic AI implementation for business growth." },
];

const AdditionalServicesSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-24">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeUp}
                >
                    <span className="text-primary font-medium mb-4 block">More Services</span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Specialized Solutions</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Beyond our core offerings, we provide specialized services to meet unique challenges.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {additionalServices.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <Tilt3D className="flex items-start gap-4 p-6 rounded-xl border border-border bg-card/50 hover:border-primary/30 transition-all">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <service.icon className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold mb-2">{service.title}</h3>
                                    <p className="text-sm text-muted-foreground">{service.desc}</p>
                                </div>
                            </Tilt3D>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Pricing Section
const pricingPlans = [
    {
        name: "Starter",
        price: "$2,999",
        description: "Perfect for small businesses and startups",
        features: ["5-page responsive website", "Basic SEO setup", "Contact form integration", "Mobile optimization", "1 month support"],
        popular: false
    },
    {
        name: "Professional",
        price: "$7,999",
        description: "Ideal for growing businesses",
        features: ["10+ page custom website", "Advanced SEO & Analytics", "CMS integration", "E-commerce ready", "API integrations", "3 months support"],
        popular: true
    },
    {
        name: "Enterprise",
        price: "Custom",
        description: "For large-scale projects",
        features: ["Unlimited pages", "Custom features", "AI integration", "Priority support", "Dedicated team", "Ongoing maintenance"],
        popular: false
    }
];

const PricingSection = () => {
    return (
        <ParallaxSection className="py-24 bg-muted/30">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                >
                    <span className="text-primary font-medium mb-4 block">Pricing</span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Transparent Pricing</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Choose a plan that fits your needs. All plans include our commitment to quality.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {pricingPlans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                        >
                            <Tilt3D
                                className={`h-full relative p-8 rounded-2xl border ${plan.popular
                                    ? 'border-primary bg-card shadow-xl shadow-primary/10'
                                    : 'border-border bg-card/50'
                                    } transition-all`}
                            >
                                {plan.popular && (
                                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-sm font-medium rounded-full">
                                        Most Popular
                                    </span>
                                )}
                                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                                <div className="mb-4">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    {plan.price !== "Custom" && <span className="text-muted-foreground">/project</span>}
                                </div>
                                <p className="text-muted-foreground mb-6">{plan.description}</p>
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm">
                                            <Check className="w-4 h-4 text-primary flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/contact">
                                    <Button
                                        className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90 text-white' : ''}`}
                                        variant={plan.popular ? "default" : "outline"}
                                    >
                                        Get Started
                                    </Button>
                                </Link>
                            </Tilt3D>
                        </motion.div>
                    ))}
                </div>
            </div>
        </ParallaxSection>
    );
};

// CTA Section
const ServicesCTA = () => {
    return (
        <section className="py-24">
            <div className="container mx-auto px-6">
                <motion.div
                    className="max-w-3xl mx-auto text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={stagger}
                >
                    <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold mb-6">
                        Ready to Start Your Project?
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-xl text-muted-foreground mb-8">
                        Let's discuss your requirements and create something amazing together.
                    </motion.p>
                    <motion.div variants={fadeUp}>
                        <Link to="/contact">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg shadow-lg shadow-primary/25">
                                    Get Free Consultation <ArrowRight className="w-5 h-5" />
                                </Button>
                            </motion.div>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

const Services = () => {
    return (
        <>
            <ScrollProgress />
            <ServicesHero />
            <MainServicesSection />
            <TechStackSection />
            <AdditionalServicesSection />
            <PricingSection />
            <ServicesCTA />
        </>
    );
};

export default Services;
