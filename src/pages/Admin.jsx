import { useState, useEffect } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Plus, Pencil, Trash2, Briefcase, MapPin, Clock, X, Save, Search, LogIn, LogOut, Lock, User, RefreshCw, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const Admin = () => {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("jobs"); // "jobs" or "applications"

    // Jobs states
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentJob, setCurrentJob] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Applications states
    const [applications, setApplications] = useState([]);
    const [appLoading, setAppLoading] = useState(true);

    // Login states
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        department: "Engineering",
        location: "Remote",
        type: "Full-time",
        description: "",
        hasDuration: false,
        startDate: "",
        endDate: ""
    });

    // Delete Confirmation states
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [jobToDelete, setJobToDelete] = useState(null);
    const [deleteType, setDeleteType] = useState("job"); // "job" or "application"

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setAuthLoading(false);
            if (currentUser) {
                fetchJobs();
                fetchApplications();
            }
        });
        return () => unsubscribe();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError("");
        try {
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        } catch (error) {
            setLoginError("Invalid email or password. Please try again.");
            console.error("Login error:", error);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "jobs"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const jobsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setJobs(jobsList);
        } catch (error) {
            console.error("Error fetching jobs: ", error);
        }
        setLoading(false);
    };

    const fetchApplications = async () => {
        setAppLoading(true);
        try {
            const q = query(collection(db, "applications"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const appsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setApplications(appsList);
        } catch (error) {
            console.error("Error fetching applications:", error);
        }
        setAppLoading(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await updateDoc(doc(db, "jobs", currentJob.id), {
                    ...formData,
                    updatedAt: new Date().toISOString()
                });
            } else {
                await addDoc(collection(db, "jobs"), {
                    ...formData,
                    createdAt: new Date().toISOString()
                });
            }
            setIsModalOpen(false);
            resetForm();
            fetchJobs();
        } catch (error) {
            console.error("Error saving job: ", error);
        }
    };

    const handleEdit = (job) => {
        setCurrentJob(job);
        setFormData({
            title: job.title,
            department: job.department,
            location: job.location,
            type: job.type,
            description: job.description,
            hasDuration: job.hasDuration || false,
            startDate: job.startDate || "",
            endDate: job.endDate || ""
        });
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        setJobToDelete(id);
        setDeleteType("job");
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            if (deleteType === "job") {
                await deleteDoc(doc(db, "jobs", jobToDelete));
                fetchJobs();
            } else {
                await deleteDoc(doc(db, "applications", jobToDelete));
                fetchApplications();
            }
            setIsDeleteModalOpen(false);
            setJobToDelete(null);
        } catch (error) {
            console.error("Error deleting: ", error);
        }
    };

    const deleteApplication = (id) => {
        setJobToDelete(id);
        setDeleteType("application");
        setIsDeleteModalOpen(true);
    };

    const resetForm = () => {
        setFormData({
            title: "",
            department: "Engineering",
            location: "Remote",
            type: "Full-time",
            description: "",
            hasDuration: false,
            startDate: "",
            endDate: ""
        });
        setIsEditing(false);
        setCurrentJob(null);
    };

    const formatUrl = (url) => {
        if (!url) return "#";
        if (url.startsWith("http://") || url.startsWith("https://")) return url;
        return `https://${url}`;
    };

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen pt-24 pb-12 bg-background flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md bg-card border border-border rounded-3xl shadow-2xl overflow-hidden p-8"
                >
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4">
                            <Lock className="w-8 h-8" />
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Admin Login</h1>
                        <p className="text-muted-foreground">Please sign in to access the management portal.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email Address</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    required
                                    type="email"
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    placeholder="admin@zayro.com"
                                    className="w-full bg-muted/50 border border-border rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    required
                                    type="password"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-muted/50 border border-border rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                />
                            </div>
                        </div>

                        {loginError && (
                            <p className="text-destructive text-sm bg-destructive/10 p-3 rounded-xl border border-destructive/20">
                                {loginError}
                            </p>
                        )}

                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-lg">
                            <LogIn className="w-5 h-5 mr-2" /> Sign In
                        </Button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 bg-background">
            <div className="container mx-auto px-6">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold">Zayro Studio Management</h1>
                            <span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] uppercase font-bold tracking-wider border border-emerald-500/20">Authorized</span>
                        </div>
                        <p className="text-muted-foreground">Manage your job portal and review student applications.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            onClick={() => {
                                fetchJobs();
                                fetchApplications();
                            }}
                            className="hover:bg-primary/10 hover:text-primary hover:border-primary/20"
                        >
                            <RefreshCw className={`w-4 h-4 mr-2 ${(loading || appLoading) ? 'animate-spin' : ''}`} /> Refresh
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleSignOut}
                            className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20"
                        >
                            <LogOut className="w-4 h-4 mr-2" /> Sign Out
                        </Button>
                        <Button
                            onClick={() => { resetForm(); setIsModalOpen(true); }}
                            className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
                        >
                            <Plus className="w-4 h-4 mr-2" /> Add New Job
                        </Button>
                    </div>
                </header>

                <div className="flex items-center gap-4 border-b border-border mb-8 overflow-x-auto no-scrollbar">
                    <button
                        onClick={() => setActiveTab("jobs")}
                        className={`px-6 py-3 font-medium transition-all relative ${activeTab === "jobs" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}
                    >
                        Posted Jobs ({jobs.length})
                    </button>
                    <button
                        onClick={() => setActiveTab("applications")}
                        className={`px-6 py-3 font-medium transition-all relative ${activeTab === "applications" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}
                    >
                        Applications ({applications.length})
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === "jobs" ? (
                        <motion.div
                            key="jobs"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <div className="mb-8 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search jobs by title or department..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                />
                            </div>

                            {loading ? (
                                <div className="flex justify-center items-center py-20">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                                </div>
                            ) : filteredJobs.length === 0 ? (
                                <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed border-border">
                                    <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                                    <p className="text-muted-foreground">Start by adding your first job posting.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-4">
                                    {filteredJobs.map((job) => (
                                        <motion.div
                                            key={job.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all group"
                                        >
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">
                                                            {job.department}
                                                        </span>
                                                        {job.hasDuration && (
                                                            (() => {
                                                                const now = new Date();
                                                                const start = new Date(job.startDate);
                                                                const end = new Date(job.endDate);
                                                                if (now < start) return <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 font-bold uppercase">Scheduled</span>;
                                                                if (now > end) return <span className="text-[10px] px-2 py-0.5 rounded-full bg-destructive/10 text-destructive border border-destructive/20 font-bold uppercase">Expired</span>;
                                                                return <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold uppercase">Active</span>;
                                                            })()
                                                        )}
                                                        <span className="text-xs text-muted-foreground">
                                                            Added {new Date(job.createdAt).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                                        {job.title}
                                                    </h3>
                                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                        <span className="flex items-center gap-1">
                                                            <MapPin className="w-4 h-4" /> {job.location}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-4 h-4" /> {job.type}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => handleEdit(job)}
                                                        className="hover:text-primary hover:border-primary/50"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => handleDelete(job.id)}
                                                        className="hover:text-destructive hover:border-destructive/50"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="apps"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            {appLoading ? (
                                <div className="flex justify-center items-center py-20">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                                </div>
                            ) : applications.length === 0 ? (
                                <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed border-border">
                                    <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">No applications yet</h3>
                                    <p className="text-muted-foreground">New applications will appear here once students apply.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-6">
                                    {applications.map((app) => (
                                        <motion.div
                                            key={app.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-6 rounded-2xl border border-border bg-card shadow-sm"
                                        >
                                            <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="text-xs font-bold px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded-full uppercase border border-emerald-500/20">
                                                            {app.jobTitle}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-2xl font-bold mb-1">{app.fullName}</h3>
                                                    <p className="text-muted-foreground font-medium">{app.email}</p>
                                                </div>
                                                <div className="flex flex-col md:items-end gap-2">
                                                    <span className="text-sm text-muted-foreground">
                                                        Applied: {new Date(app.createdAt).toLocaleString()}
                                                    </span>
                                                    <div className="flex items-center gap-2">
                                                        <a
                                                            href={formatUrl(app.resumeUrl)}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white">
                                                                <ExternalLink className="w-4 h-4 mr-2" /> Open Drive Link
                                                            </Button>
                                                        </a>
                                                        <Button
                                                            onClick={() => deleteApplication(app.id)}
                                                            variant="outline"
                                                            size="icon"
                                                            className="text-destructive hover:bg-destructive/10"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-border">
                                                <div>
                                                    <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Professional Info</h4>
                                                    <div className="space-y-3">
                                                        <p className="text-sm"><span className="text-muted-foreground font-medium">Experience:</span> {app.experience}</p>
                                                        <p className="text-sm"><span className="text-muted-foreground font-medium">Phone:</span> {app.phone}</p>
                                                        {app.portfolio && (
                                                            <p className="text-sm">
                                                                <span className="text-muted-foreground font-medium">Portfolio:</span>{" "}
                                                                <a href={formatUrl(app.portfolio)} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                                                    Click here
                                                                </a>
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Cover Letter / Note</h4>
                                                    <p className="text-sm text-muted-foreground leading-relaxed italic bg-muted/20 p-4 rounded-xl border border-border">
                                                        "{app.coverLetter || "No note provided."}"
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Form Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                            onClick={() => setIsModalOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-2xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-border flex items-center justify-between">
                                <h2 className="text-2xl font-bold">{isEditing ? "Edit Job Posting" : "Add New Job Posting"}</h2>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-muted rounded-full transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Job Title</label>
                                    <input
                                        required
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Senior Frontend Developer"
                                        className="w-full bg-muted/50 border border-border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Department</label>
                                        <select
                                            name="department"
                                            value={formData.department}
                                            onChange={handleInputChange}
                                            className="w-full bg-muted/50 border border-border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                        >
                                            <option>Engineering</option>
                                            <option>Design</option>
                                            <option>Marketing</option>
                                            <option>Sales</option>
                                            <option>Operations</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Location</label>
                                        <input
                                            required
                                            name="location"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            placeholder="e.g. Remote"
                                            className="w-full bg-muted/50 border border-border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Job Type</label>
                                        <select
                                            name="type"
                                            value={formData.type}
                                            onChange={handleInputChange}
                                            className="w-full bg-muted/50 border border-border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                        >
                                            <option>Full-time</option>
                                            <option>Part-time</option>
                                            <option>Contract</option>
                                            <option>Internship</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Description</label>
                                    <textarea
                                        required
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows={4}
                                        placeholder="Briefly describe the role..."
                                        className="w-full bg-muted/50 border border-border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                                    />
                                </div>
                                <div className="space-y-4 pt-2">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="hasDuration"
                                            name="hasDuration"
                                            checked={formData.hasDuration}
                                            onChange={(e) => setFormData(prev => ({ ...prev, hasDuration: e.target.checked }))}
                                            className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                                        />
                                        <label htmlFor="hasDuration" className="text-sm font-medium cursor-pointer">
                                            Set the duration of this job post
                                        </label>
                                    </div>

                                    {formData.hasDuration && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-2"
                                        >
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Start Date & Time</label>
                                                <input
                                                    type="datetime-local"
                                                    name="startDate"
                                                    value={formData.startDate}
                                                    onChange={handleInputChange}
                                                    required={formData.hasDuration}
                                                    className="w-full bg-muted/50 border border-border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">End Date & Time</label>
                                                <input
                                                    type="datetime-local"
                                                    name="endDate"
                                                    value={formData.endDate}
                                                    onChange={handleInputChange}
                                                    required={formData.hasDuration}
                                                    className="w-full bg-muted/50 border border-border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </div>

                                <div className="pt-4 flex gap-3">
                                    <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-white">
                                        <Save className="w-4 h-4 mr-2" /> {isEditing ? "Update Job" : "Publish Job"}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Custom Delete Confirmation Modal */}
            <AnimatePresence>
                {isDeleteModalOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-background/80 backdrop-blur-md"
                            onClick={() => setIsDeleteModalOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-md bg-card border border-border rounded-[2.5rem] shadow-2xl p-8 text-center"
                        >
                            <div className="w-20 h-20 bg-destructive/10 rounded-3xl flex items-center justify-center text-destructive mx-auto mb-6">
                                <Trash2 className="w-10 h-10" />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">Are you sure?</h2>
                            <p className="text-muted-foreground mb-8">
                                This action cannot be undone. You are about to delete this {deleteType}.
                            </p>
                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="flex-1 h-12 rounded-2xl"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={confirmDelete}
                                    className="flex-1 bg-destructive hover:bg-destructive/90 text-white h-12 rounded-2xl shadow-lg shadow-destructive/20"
                                >
                                    Yes, Delete It
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Admin;
