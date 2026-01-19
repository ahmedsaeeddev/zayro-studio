import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "@/lib/firebase";
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, ArrowLeft, Send, CheckCircle2, AlertCircle, Briefcase, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const JobDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isApplying, setIsApplying] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        portfolio: "",
        experience: "",
        resumeLink: "",
        coverLetter: ""
    });

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const docRef = doc(db, "jobs", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const jobData = { id: docSnap.id, ...docSnap.data() };

                    // Check if job is active (if duration is set)
                    if (jobData.hasDuration) {
                        const now = new Date();
                        const start = new Date(jobData.startDate);
                        const end = new Date(jobData.endDate);
                        if (now < start || now > end) {
                            navigate("/careers");
                            return;
                        }
                    }

                    setJob(jobData);
                } else {
                    navigate("/careers");
                }
            } catch (err) {
                console.error("Error fetching job:", err);
                navigate("/careers");
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.resumeLink) {
            setError("Please provide a resume link.");
            return;
        }

        setSubmitting(true);
        setError("");

        try {
            // Save Application to Firestore with Drive Link
            await addDoc(collection(db, "applications"), {
                jobId: id,
                jobTitle: job.title,
                ...formData,
                resumeUrl: formData.resumeLink, // Storing drive link in resumeUrl field for compatibility
                createdAt: new Date().toISOString()
            });

            setSubmitted(true);
        } catch (err) {
            console.error("Error submitting application:", err);
            setError(`Failed to submit: ${err.message}`);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-24 bg-background">
            <div className="container mx-auto px-6 max-w-4xl">
                <button
                    onClick={() => navigate("/careers")}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Careers
                </button>

                <div className="bg-card border border-border rounded-3xl p-8 md:p-12 mb-12 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-8 border-b border-border">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs font-bold px-3 py-1 bg-primary/10 text-primary rounded-full uppercase tracking-wider">
                                    {job.department}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">{job.title}</h1>
                            <div className="flex items-center gap-6 text-muted-foreground">
                                <span className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-primary" /> {job.location}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-primary" /> {job.type}
                                </span>
                            </div>
                        </div>
                        <Button
                            onClick={() => setIsApplying(true)}
                            size="lg"
                            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-2xl text-lg shadow-xl shadow-primary/20"
                        >
                            Apply Now
                        </Button>
                    </div>

                    <div className="prose prose-invert max-w-none">
                        <h3 className="text-2xl font-bold mb-6">Role Overview</h3>
                        <div className="text-muted-foreground text-lg leading-relaxed whitespace-pre-wrap">
                            {job.description}
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {isApplying && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-background/80 backdrop-blur-md"
                                onClick={() => !submitting && setIsApplying(false)}
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="relative w-full max-w-2xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                            >
                                <div className="p-6 border-b border-border flex items-center justify-between shrink-0">
                                    <h2 className="text-2xl font-bold">Apply for {job.title}</h2>
                                    <button
                                        onClick={() => setIsApplying(false)}
                                        className="p-2 hover:bg-muted rounded-full transition-colors disabled:opacity-50"
                                        disabled={submitting}
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto p-6">
                                    {submitted ? (
                                        <div className="text-center py-12">
                                            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-6">
                                                <CheckCircle2 className="w-12 h-12" />
                                            </div>
                                            <h3 className="text-3xl font-bold mb-4">Application Sent!</h3>
                                            <p className="text-muted-foreground mb-8 text-lg">
                                                Thanks for your interest in joining Zayro Studio. <br />
                                                Our team will review your profile and get back to you soon.
                                            </p>
                                            <Button
                                                onClick={() => setIsApplying(false)}
                                                className="bg-primary hover:bg-primary/90 text-white px-8"
                                            >
                                                Close Window
                                            </Button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-6 pb-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Full Name</label>
                                                    <input
                                                        required
                                                        name="fullName"
                                                        value={formData.fullName}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                                        placeholder="John Doe"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Email Address</label>
                                                    <input
                                                        required
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                                        placeholder="john@example.com"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Phone Number</label>
                                                    <input
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                                        placeholder="+92 (300) 0000000"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Portfolio/LinkedIn (Optional)</label>
                                                    <input
                                                        name="portfolio"
                                                        value={formData.portfolio}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                                        placeholder="https://..."
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Experience Level</label>
                                                <select
                                                    name="experience"
                                                    value={formData.experience}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                                >
                                                    <option value="">Select Experience</option>
                                                    <option value="Junior">Entry / Junior (0-2 years)</option>
                                                    <option value="Mid">Mid-Level (3-5 years)</option>
                                                    <option value="Senior">Senior (6+ years)</option>
                                                </select>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Resume Link (Google Drive / Dropbox)</label>
                                                <div className="relative">
                                                    <input
                                                        required
                                                        name="resumeLink"
                                                        value={formData.resumeLink}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                                        placeholder="Paste your resume drive link here..."
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Why Zayro Studio? (Optional)</label>
                                                <textarea
                                                    name="coverLetter"
                                                    value={formData.coverLetter}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all h-32 resize-none"
                                                    placeholder="Tell us why you're a great fit..."
                                                ></textarea>
                                            </div>

                                            {error && (
                                                <div className="flex items-center gap-2 text-destructive bg-destructive/10 p-4 rounded-xl border border-destructive/20">
                                                    <AlertCircle className="w-5 h-5 shrink-0" />
                                                    <p className="text-sm font-medium">{error}</p>
                                                </div>
                                            )}

                                            <Button
                                                disabled={submitting}
                                                type="submit"
                                                className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20"
                                            >
                                                {submitting ? (
                                                    "Submitting..."
                                                ) : (
                                                    <>
                                                        <Send className="w-5 h-5 mr-2" /> Submit Application
                                                    </>
                                                )}
                                            </Button>
                                        </form>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default JobDetail;
