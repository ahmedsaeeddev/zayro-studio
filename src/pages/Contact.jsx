import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, CheckCircle, ArrowRight, Video, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
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
const ContactHero = () => {
    return (
        <section className="relative py-24 overflow-hidden min-h-[50vh] flex items-center">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background" />

            {/* Gen Z Floating Elements */}
            <ParallaxFloat speed={0.4} className="absolute top-[10%] right-[10%]">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Envelope%20with%20Arrow.png" alt="Mail" className="w-16 h-16" />
            </ParallaxFloat>
            <ParallaxFloat speed={0.6} className="absolute bottom-[20%] left-[8%]">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20professions/Man%20Technologist%20Light%20Skin%20Tone.png" alt="Person" className="w-16 h-16" />
            </ParallaxFloat>
            <ParallaxFloat speed={0.3} className="absolute top-[30%] left-[15%]">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Telephone%20Receiver.png" alt="Phone" className="w-14 h-14" />
            </ParallaxFloat>
            <ParallaxFloat speed={0.5} className="absolute bottom-[30%] right-[15%]">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Spiral%20Calendar.png" alt="Calendar" className="w-14 h-14" />
            </ParallaxFloat>
            <ParallaxFloat speed={0.7} className="absolute top-[20%] center-[50%] opacity-20">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Speech%20Balloon.png" alt="Chat" className="w-24 h-24" />
            </ParallaxFloat>
            <ParallaxFloat speed={0.2} className="absolute bottom-[10%] right-[5%]">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Satellite%20Antenna.png" alt="Satellite" className="w-12 h-12" />
            </ParallaxFloat>

            <div className="container mx-auto px-6 relative">
                <motion.div
                    className="max-w-3xl"
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                >
                    <motion.span variants={fadeUp} className="text-primary font-medium mb-4 block">
                        Get In Touch
                    </motion.span>
                    <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold mb-6">
                        Let's Create Something{" "}
                        <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                            Extraordinary
                        </span>
                    </motion.h1>
                    <motion.p variants={fadeUp} className="text-xl text-muted-foreground leading-relaxed">
                        Have a project in mind? We'd love to hear from you. Send us a message and let's start the conversation.
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
};

// Contact Info
const contactInfo = [
    {
        icon: Mail,
        title: "Email Us",
        value: "zayro.studio@gmail.com",
        desc: "We usually reply within 24 hours."
    },
    {
        icon: Phone,
        title: "Call Us",
        value: "+923710241175",
        desc: "Mon-Fri from 9am to 6pm."
    },
    {
        icon: MapPin,
        title: "Visit Us",
        value: "Karachi, Pakistan",
        desc: "Office 555, Sector 37-B, Landhi"
    },
    {
        icon: Clock,
        title: "Working Hours",
        value: "Monday - Friday",
        desc: "9:00 AM - 6:00 PM PST"
    }
];

const ContactInfoSection = () => {
    return (
        <section className="py-12">
            <div className="container mx-auto px-6">
                <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {contactInfo.map((info, index) => (
                        <StaggerItem key={index}>
                            <Tilt3D className="p-6 rounded-2xl border border-border bg-card/50 hover:border-primary/30 hover:shadow-lg transition-all h-full">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                                    <info.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold mb-1">{info.title}</h3>
                                <p className="text-primary font-medium mb-1">{info.value}</p>
                                <p className="text-sm text-muted-foreground">{info.desc}</p>
                            </Tilt3D>
                        </StaggerItem>
                    ))}
                </StaggerGrid>
            </div>
        </section>
    );
};

// Form Section
const ContactFormSection = () => {
    const [formState, setFormState] = useState("idle"); // idle, submitting, success

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormState("submitting");
        setTimeout(() => setFormState("success"), 2000);
    };

    return (
        <ParallaxSection className="py-24 bg-muted/30">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto rounded-3xl bg-card border border-border shadow-2xl overflow-hidden flex flex-col md:flex-row">
                    {/* Left Panel */}
                    <div className="bg-primary p-12 text-primary-foreground md:w-2/5 flex flex-col justify-between relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-4">Start a Project</h3>
                            <p className="opacity-90 mb-8">
                                Tell us about your project and we'll get back to you with a proposal.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                        <MessageSquare className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-medium">Free Consultation</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                        <Video className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-medium">Video Call Available</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                        <Calendar className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-medium">Flexible Scheduling</span>
                                </li>
                            </ul>
                        </div>
                        {/* Decorative Circles */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                        <div className="absolute top-10 -left-10 w-20 h-20 bg-white/10 rounded-full blur-xl" />
                    </div>

                    {/* Form Panel */}
                    <div className="p-12 md:w-3/5 bg-card">
                        <AnimatePresence mode="wait">
                            {formState === "success" ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-center py-10"
                                >
                                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-6">
                                        <CheckCircle className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                                    <p className="text-muted-foreground mb-8">
                                        Thank you for reaching out. We'll be in touch shortly.
                                    </p>
                                    <Button onClick={() => setFormState("idle")} variant="outline">
                                        Send Another Message
                                    </Button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Name</label>
                                            <input type="text" required className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="John Doe" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Email</label>
                                            <input type="email" required className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="john@example.com" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Phone (Optional)</label>
                                            <input type="tel" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="+92 (300) 0000000" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Company</label>
                                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="Your Company" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Service Needed</label>
                                        <select className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
                                            <option>Web Development</option>
                                            <option>UI/UX Design</option>
                                            <option>Mobile App</option>
                                            <option>SEO & Marketing</option>
                                            <option>Other</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Project Details</label>
                                        <textarea rows={4} required className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none" placeholder="Tell us about your project goals, timeline, and budget..." />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg"
                                        disabled={formState === "submitting"}
                                    >
                                        {formState === "submitting" ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Sending...
                                            </div>
                                        ) : (
                                            <>Send Message <Send className="w-4 h-4 ml-2" /></>
                                        )}
                                    </Button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </ParallaxSection>
    );
};

// FAQ Section
const faqs = [
    {
        q: "What is your typical project timeline?",
        a: "Timelines vary depending on complexity, but a typical website takes 4-8 weeks, while custom applications may take 3-6 months. We provide detailed timelines during our proposal phase."
    },
    {
        q: "Do you provide ongoing support?",
        a: "Absolutely! We offer various maintenance packages to ensure your digital product remains secure, up-to-date, and performant after launch."
    },
    {
        q: "What is your pricing structure?",
        a: "We work on both fixed-price and hourly bases depending on the project scope. We believe in transparency and detail all costs upfront."
    },
    {
        q: "Do you work with startups?",
        a: "Yes! We love working with startups. We have special packages designed to help early-stage companies get to market quickly with high-quality MVPs."
    }
];

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="py-24">
            <div className="container mx-auto px-6 max-w-3xl">
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
                    <p className="text-muted-foreground">Common questions about working with us.</p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="border border-border rounded-xl overflow-hidden bg-card/50"
                        >
                            <button
                                onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
                            >
                                <span className="font-semibold text-lg">{faq.q}</span>
                                <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                                    <ArrowRight className="w-4 h-4 rotate-90" />
                                </div>
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 pt-0 text-muted-foreground leading-relaxed">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const MapSection = () => {
    return (
        <section className="h-[450px] w-full relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 ease-in-out">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3530.8516510623854!2d67.19784!3d24.849524400000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33099705fc6b1%3A0x21ae37d81d57c159!2sSector%2037%20B%20Landhi%20Town%2C%20Karachi%2C%20Pakistan!5e1!3m2!1sen!2s!4v1768672567298!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
            ></iframe>
        </section>
    );
};

const Contact = () => {
    return (
        <>
            <ScrollProgress />
            <ContactHero />
            <ContactInfoSection />
            <ContactFormSection />
            <FAQSection />
            <MapSection />
        </>
    );
};

export default Contact;
