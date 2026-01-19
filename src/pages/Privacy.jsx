import { motion, useInView } from "framer-motion";
import { Shield, Eye, Database, Lock, Bell, Trash2, Mail, FileText } from "lucide-react";
import { useRef } from "react";
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
const PrivacyHero = () => {
    return (
        <section className="relative py-24 overflow-hidden min-h-[50vh] flex items-center">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background" />

            {/* Gen Z Floating Elements */}
            <ParallaxFloat speed={0.4} className="absolute top-[15%] right-[10%]">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Locked.png" alt="Lock" className="w-16 h-16" />
            </ParallaxFloat>
            <ParallaxFloat speed={0.6} className="absolute bottom-[20%] left-[8%]">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Shield.png" alt="Shield" className="w-16 h-16" />
            </ParallaxFloat>
            <ParallaxFloat speed={0.3} className="absolute top-[30%] left-[15%]">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Page%20Facing%20Up.png" alt="Doc" className="w-14 h-14" />
            </ParallaxFloat>

            <div className="container mx-auto px-6 relative">
                <motion.div
                    className="max-w-3xl"
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                >
                    <motion.span variants={fadeUp} className="text-primary font-medium mb-4 block">
                        Legal
                    </motion.span>
                    <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold mb-6">
                        Privacy Policy
                    </motion.h1>
                    <motion.p variants={fadeUp} className="text-xl text-muted-foreground leading-relaxed">
                        Your privacy matters to us. Here's how we protect your information. Last updated: January 1, 2026.
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
};

// Privacy Sections
const sections = [
    {
        icon: Database,
        title: "Information We Collect",
        content: `We collect information you provide directly to us, such as when you:
        
• Create an account or fill out a form
• Contact us for support or inquiries
• Subscribe to our newsletter
• Use our services

This may include your name, email address, phone number, company name, and any other information you choose to provide.`
    },
    {
        icon: Eye,
        title: "How We Use Your Information",
        content: `We use the information we collect to:

• Provide, maintain, and improve our services
• Process transactions and send related information
• Send you technical notices and support messages
• Respond to your comments and questions
• Send marketing communications (with your consent)
• Monitor and analyze trends, usage, and activities`
    },
    {
        icon: Lock,
        title: "Information Security",
        content: `We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. These measures include:

• Encryption of data in transit and at rest
• Regular security assessments
• Access controls and authentication
• Employee training on data protection`
    },
    {
        icon: Shield,
        title: "Data Sharing",
        content: `We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:

• With your consent
• With service providers who assist our operations
• To comply with legal obligations
• To protect our rights and prevent fraud`
    },
    {
        icon: Bell,
        title: "Cookies and Tracking",
        content: `We use cookies and similar tracking technologies to:

• Remember your preferences
• Understand how you use our website
• Improve your experience
• Analyze website traffic

You can control cookies through your browser settings. Disabling cookies may limit some features of our website.`
    },
    {
        icon: Trash2,
        title: "Data Retention & Deletion",
        content: `We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy. You have the right to:

• Access your personal data
• Correct inaccurate data
• Request deletion of your data
• Opt-out of marketing communications

To exercise these rights, please contact us at privacy@zayrostudio.com.`
    },
];

const PrivacySections = () => {
    return (
        <ParallaxSection className="py-16">
            <div className="container mx-auto px-6">
                <StaggerGrid className="max-w-4xl mx-auto space-y-8">
                    {sections.map((section, index) => (
                        <StaggerItem key={index}>
                            <Tilt3D className="p-8 rounded-2xl border border-border bg-card/50 hover:border-primary/30 transition-all hover:shadow-lg">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <section.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <h2 className="text-2xl font-bold">{section.title}</h2>
                                </div>
                                <div className="text-muted-foreground leading-relaxed whitespace-pre-line pl-0 md:pl-16">
                                    {section.content}
                                </div>
                            </Tilt3D>
                        </StaggerItem>
                    ))}
                </StaggerGrid>
            </div>
        </ParallaxSection>
    );
};

// Contact Section
const ContactSection = () => {
    return (
        <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-6">
                <motion.div
                    className="max-w-2xl mx-auto text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={stagger}
                >
                    <motion.div variants={fadeUp}>
                        <Mail className="w-12 h-12 text-primary mx-auto mb-6" />
                    </motion.div>
                    <motion.h2 variants={fadeUp} className="text-3xl font-bold mb-4">
                        Questions About Privacy?
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-muted-foreground text-lg mb-6">
                        If you have any questions about this Privacy Policy or our data practices, please contact our privacy team.
                    </motion.p>
                    <motion.div variants={fadeUp}>
                        <a
                            href="mailto:privacy@zayrostudio.com"
                            className="text-primary hover:underline font-medium text-lg"
                        >
                            privacy@zayrostudio.com
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

const Privacy = () => {
    return (
        <>
            <ScrollProgress />
            <PrivacyHero />
            <PrivacySections />
            <ContactSection />
        </>
    );
};

export default Privacy;
