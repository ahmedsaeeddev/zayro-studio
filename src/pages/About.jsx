import { motion, useScroll, useTransform } from "framer-motion";
import { Users, Target, Heart, Award, ArrowRight, CheckCircle2, Linkedin, Twitter, Github, Zap, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ScrollProgress, ParallaxFloat, ParallaxSection, Tilt3D, StaggerGrid, StaggerItem, ParallaxReveal } from "@/components/ParallaxEffects";

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// Hero Section
const AboutHero = () => {
    return (
        <section className="relative py-24 overflow-hidden min-h-[60vh] flex items-center">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background" />

            {/* Gen Z Floating Elements */}
            <ParallaxFloat speed={0.6} className="absolute bottom-[20%] left-[8%]">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Memo.png" alt="Memo" className="w-16 h-16" />
            </ParallaxFloat>
            <ParallaxFloat speed={0.3} className="absolute top-[30%] left-[15%]">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Shield.png" alt="Shield" className="w-14 h-14" />
            </ParallaxFloat>
            <ParallaxFloat speed={0.5} className="absolute bottom-[30%] right-[15%]">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Party%20Popper.png" alt="Party" className="w-14 h-14" />
            </ParallaxFloat>
            <ParallaxFloat speed={0.7} className="absolute top-[25%] left-[45%] opacity-20">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Globe%20Showing%20Europe-Africa.png" alt="Globe" className="w-20 h-20" />
            </ParallaxFloat>
            <ParallaxFloat speed={0.2} className="absolute bottom-[15%] right-[5%]">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Glowing%20Star.png" alt="Star" className="w-12 h-12" />
            </ParallaxFloat>

            <div className="container mx-auto px-6 relative">
                <motion.div
                    className="max-w-3xl"
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                >
                    <motion.span variants={fadeUp} className="text-primary font-medium mb-4 block">
                        About Us
                    </motion.span>
                    <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold mb-6">
                        We Are{" "}
                        <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                            Creative Rebels
                        </span>{" "}
                        w/ a Cause
                    </motion.h1>
                    <motion.p variants={fadeUp} className="text-xl text-muted-foreground leading-relaxed">
                        Zayro Studio is more than just an agency. We are a collective of dreamers, doers, and creators passionate about shaping the future of digital interaction.
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
};

// Story Section
const StorySection = () => {
    return (
        <ParallaxSection className="py-24">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="relative"
                    >
                        <div className="aspect-square rounded-3xl overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Our Team"
                                className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        <ParallaxFloat speed={0.2} className="absolute -bottom-10 -right-10 bg-card p-6 rounded-2xl shadow-xl border border-border hidden md:block">
                            <div className="flex items-center gap-4">
                                <div className="text-4xl font-bold text-primary">6+</div>
                                <div className="text-sm text-muted-foreground">Years of<br />Innovation</div>
                            </div>
                        </ParallaxFloat>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                    >
                        <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold mb-6">Our Story</motion.h2>
                        <motion.div variants={fadeUp} className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                            <p>
                                Founded in 2020, Zayro Studio started with a simple laptop and a massive vision: to bridge the gap between complex technology and intuitive design.
                            </p>
                            <p>
                                What began as a small freelance gig has grown into a full-service agency partnering with startups and enterprises worldwide. We believe that great design is not just about how things look, but how they work and how they make people feel.
                            </p>
                            <p>
                                Today, we are proud to have a diverse team of designers, developers, and strategists who push the boundaries of what's possible on the web every single day.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </ParallaxSection>
    );
};

// Mission & Vision
const MissionVision = () => {
    return (
        <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Tilt3D className="p-10 rounded-3xl bg-card border border-border hover:border-primary/30 transition-all">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                            <Target className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            To empower businesses with digital tools that not only look stunning but drive real, measurable growth. We aim to democratize high-end design and technology.
                        </p>
                    </Tilt3D>

                    <Tilt3D className="p-10 rounded-3xl bg-card border border-border hover:border-primary/30 transition-all">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 text-emerald-500">
                            <Eye className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            To be the global standard for "Gen Z" innovative digital agencies, where creativity meets AI to solve the world's most complex design challenges.
                        </p>
                    </Tilt3D>
                </div>
            </div>
        </section>
    );
};

// Values Section
const values = [
    { icon: Heart, title: "Client Obsession", desc: "We don't just work for you; we work with you." },
    { icon: Zap, title: "Speed & Quality", desc: "We ship fast without breaking things." },
    { icon: Users, title: "Radical Transparency", desc: "No hidden fees, no jargon, just honest work." },
    { icon: Award, title: "Excellence Daily", desc: "We aim to be 1% better every single day." },
];

const ValuesSection = () => {
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
                    <span className="text-primary font-medium mb-4 block">Our Culture</span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Core Values</h2>
                </motion.div>

                <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((value, index) => (
                        <StaggerItem key={index}>
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="p-6 rounded-2xl border border-border bg-card/50 text-center hover:shadow-lg transition-all"
                            >
                                <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                                    <value.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold mb-2">{value.title}</h3>
                                <p className="text-sm text-muted-foreground">{value.desc}</p>
                            </motion.div>
                        </StaggerItem>
                    ))}
                </StaggerGrid>
            </div>
        </ParallaxSection>
    );
};

// Team Section
const team = [
    {
        name: "Zaki",
        role: "CEO & Co-Founder",
        bio: "Visionary Graphic Designer & Branding Expert. Shaping the visual future of Zayro Studio.",
        image: "/zaki.png",
        socials: { linkedin: "#", github: "#", twitter: "#" }
    },
    {
        name: "Ahmed Saeed",
        role: "CTO & Co-Founder",
        bio: "MERN Stack Software Engineer & Owner of FLax Courier Service.",
        image: "/ahmedsaeed.png",
        socials: {
            linkedin: "https://linkedin.com/in/ahmed-saeeddev",
            github: "https://github.com/ahmedsaeeddev",
            twitter: "#"
        }
    }
];

const TeamSection = () => {
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
                    <span className="text-primary font-medium mb-4 block">Meet the Team</span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">The Minds Behind Zayro</h2>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-8">
                    {team.map((member, index) => (
                        <div key={index} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] max-w-[300px]">
                            <StaggerItem>
                                <Tilt3D className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:shadow-primary/5 transition-all">
                                    <div className="aspect-[4/5] overflow-hidden relative">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                                            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"; }}
                                        />
                                        {/* Social Overlay */}
                                        <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                            <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer">
                                                <Button size="icon" variant="ghost" className="text-white hover:bg-white/20 rounded-full">
                                                    <Linkedin className="w-5 h-5" />
                                                </Button>
                                            </a>
                                            <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer">
                                                <Button size="icon" variant="ghost" className="text-white hover:bg-white/20 rounded-full">
                                                    <Twitter className="w-5 h-5" />
                                                </Button>
                                            </a>
                                            <a href={member.socials.github} target="_blank" rel="noopener noreferrer">
                                                <Button size="icon" variant="ghost" className="text-white hover:bg-white/20 rounded-full">
                                                    <Github className="w-5 h-5" />
                                                </Button>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="p-6 text-center">
                                        <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                                        <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
                                        {member.bio && <p className="text-xs text-muted-foreground line-clamp-2">{member.bio}</p>}
                                    </div>
                                </Tilt3D>
                            </StaggerItem>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Why Choose Us
const WhyChooseUs = () => {
    return (
        <ParallaxSection className="py-24">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-primary/10 to-emerald-500/5 p-12 border border-primary/20">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold mb-4">Why Partner With Us?</h2>
                        <p className="text-muted-foreground">Because we care about your success as much as you do.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            "Proven Track Record", "Agile Methodology", "Future-Proof Tech"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-lg shadow-primary/30">
                                    {i + 1}
                                </div>
                                <span className="font-semibold text-lg">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ParallaxSection>
    );
};

// CTA
const AboutCTA = () => {
    return (
        <section className="py-24">
            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={stagger}
                >
                    <motion.h2 variants={fadeUp} className="text-4xl font-bold mb-6">Want to Join Our Journey?</motion.h2>
                    <motion.p variants={fadeUp} className="text-xl text-muted-foreground mb-8">We are always looking for fresh talent.</motion.p>
                    <motion.div variants={fadeUp} className="flex gap-4 justify-center">
                        <Link to="/careers">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                                    View Open Positions
                                </Button>
                            </motion.div>
                        </Link>
                        <Link to="/contact">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button size="lg" variant="outline">
                                    Contact Us
                                </Button>
                            </motion.div>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

const About = () => {
    return (
        <>
            <ScrollProgress />
            <AboutHero />
            <StorySection />
            <MissionVision />
            <ValuesSection />
            <TeamSection />
            <WhyChooseUs />
            <AboutCTA />
        </>
    );
};

export default About;
