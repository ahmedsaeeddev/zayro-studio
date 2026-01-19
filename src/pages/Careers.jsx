import { motion, useInView } from "framer-motion";
import { Briefcase, MapPin, Clock, ArrowRight, Zap, Heart, Coffee, Gamepad2, Plane, GraduationCap } from "lucide-react";
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

// Hero Section
const CareersHero = () => {
    return (
        <section className="relative py-24 overflow-hidden min-h-[60vh] flex items-center">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background" />

            {/* Gen Z Floating Elements */}
            <ParallaxFloat speed={0.4} className="absolute top-[15%] right-[10%]">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Briefcase.png" alt="Briefcase" className="w-16 h-16" />
            </ParallaxFloat>
            <ParallaxFloat speed={0.6} className="absolute bottom-[20%] left-[8%]">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Direct%20Hit.png" alt="Target" className="w-16 h-16" />
            </ParallaxFloat>
            <ParallaxFloat speed={0.3} className="absolute top-[30%] left-[15%]">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Trophy.png" alt="Trophy" className="w-14 h-14" />
            </ParallaxFloat>
            <ParallaxFloat speed={0.5} className="absolute bottom-[30%] right-[15%]">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Star-Struck.png" alt="Excited" className="w-14 h-14" />
            </ParallaxFloat>

            <div className="container mx-auto px-6 relative">
                <motion.div
                    className="max-w-3xl"
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                >
                    <motion.span variants={fadeUp} className="text-primary font-medium mb-4 block">
                        Join Our Team
                    </motion.span>
                    <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold mb-6">
                        Build the Future of{" "}
                        <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                            Digital Design
                        </span>
                    </motion.h1>
                    <motion.p variants={fadeUp} className="text-xl text-muted-foreground leading-relaxed">
                        We're always looking for talented individuals who are passionate about creating exceptional digital experiences. Join us and shape the future of design.
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
};

// Perks Section
const perks = [
    { icon: Zap, title: "Competitive Salary", desc: "Top-of-market compensation packages" },
    { icon: Heart, title: "Health Insurance", desc: "Comprehensive medical, dental & vision" },
    { icon: Coffee, title: "Remote-First", desc: "Work from anywhere in the world" },
    { icon: Gamepad2, title: "Fun Culture", desc: "Game nights, team events & more" },
    { icon: Plane, title: "Unlimited PTO", desc: "Take the time you need to recharge" },
    { icon: GraduationCap, title: "Learning Budget", desc: "$2,000/year for courses & conferences" },
];

const PerksSection = () => {
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
                    <span className="text-primary font-medium mb-4 block">Why Join Us</span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Perks & Benefits</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        We believe in taking care of our team so they can do their best work.
                    </p>
                </motion.div>

                <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {perks.map((perk, index) => (
                        <StaggerItem key={index}>
                            <Tilt3D className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all h-full">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                                    <perk.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold mb-1">{perk.title}</h3>
                                    <p className="text-sm text-muted-foreground">{perk.desc}</p>
                                </div>
                            </Tilt3D>
                        </StaggerItem>
                    ))}
                </StaggerGrid>
            </div>
        </ParallaxSection>
    );
};

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const OpenPositions = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const q = query(collection(db, "jobs"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                const fetchedJobs = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // Filter jobs based on duration if set
                const now = new Date();
                const activeJobs = fetchedJobs.filter(job => {
                    if (!job.hasDuration) return true;

                    const start = new Date(job.startDate);
                    const end = new Date(job.endDate);

                    return now >= start && now <= end;
                });

                setJobs(activeJobs);
            } catch (error) {
                console.error("Error fetching jobs: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    return (
        <section className="py-24">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                >
                    <span className="text-primary font-medium mb-4 block">Open Positions</span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Join Our Growing Team</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Explore our current openings and find the perfect role for you.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto space-y-4">
                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                        </div>
                    ) : jobs.length === 0 ? (
                        <div className="text-center py-12 bg-muted/20 rounded-2xl border border-dashed border-border">
                            <p className="text-muted-foreground">Currently no open positions. Check back later!</p>
                        </div>
                    ) : (
                        jobs.map((position, index) => (
                            <motion.div
                                key={position.id}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <Tilt3D className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">
                                                    {position.department}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                                {position.title}
                                            </h3>
                                            <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
                                                {position.description}
                                            </p>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="w-4 h-4" /> {position.location}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" /> {position.type}
                                                </span>
                                            </div>
                                        </div>
                                        <Link to={`/careers/${position.id}`}>
                                            <Button className="bg-primary hover:bg-primary/90 text-white self-start md:self-center shrink-0">
                                                Read More <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </Link>
                                    </div>
                                </Tilt3D>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

// CTA Section
const CareersCTA = () => {
    return (
        <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-6">
                <motion.div
                    className="max-w-3xl mx-auto text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={stagger}
                >
                    <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold mb-6">
                        Don't See the Right Role?
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-xl text-muted-foreground mb-8">
                        We're always looking for talented people. Send us your resume and we'll keep you in mind for future opportunities.
                    </motion.p>
                    <motion.div variants={fadeUp}>
                        <Link to="/contact">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                                    Get In Touch <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </motion.div>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

const Careers = () => {
    return (
        <>
            <ScrollProgress />
            <CareersHero />
            <PerksSection />
            <OpenPositions />
            <CareersCTA />
        </>
    );
};

export default Careers;
