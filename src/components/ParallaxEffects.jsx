import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

// Parallax wrapper for sections
export const ParallaxSection = ({ children, offset = 50, className = "" }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
    const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

    return (
        <motion.div ref={ref} style={{ y: smoothY }} className={className}>
            {children}
        </motion.div>
    );
};

// Floating element with parallax
export const ParallaxFloat = ({ children, speed = 0.5, className = "" }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 360 * speed]);

    return (
        <motion.div
            ref={ref}
            style={{ y, rotate }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Scale on scroll
export const ParallaxScale = ({ children, className = "" }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

    return (
        <motion.div
            ref={ref}
            style={{ scale, opacity }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Horizontal parallax
export const ParallaxHorizontal = ({ children, direction = 1, className = "" }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const x = useTransform(scrollYProgress, [0, 1], [100 * direction, -100 * direction]);

    return (
        <motion.div
            ref={ref}
            style={{ x }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Parallax text that reveals on scroll
export const ParallaxReveal = ({ children, className = "" }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.9", "start 0.5"]
    });

    const clipPath = useTransform(
        scrollYProgress,
        [0, 1],
        ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
    );
    const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

    return (
        <motion.div
            ref={ref}
            style={{ clipPath, opacity }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Blur on scroll
export const ParallaxBlur = ({ children, className = "" }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"]
    });

    const filter = useTransform(
        scrollYProgress,
        [0, 1],
        ["blur(10px)", "blur(0px)"]
    );
    const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

    return (
        <motion.div
            ref={ref}
            style={{ filter, opacity }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// 3D Tilt effect on hover
export const Tilt3D = ({ children, className = "" }) => {
    return (
        <motion.div
            className={className}
            whileHover={{
                rotateX: 5,
                rotateY: 5,
                scale: 1.02,
                transition: { duration: 0.3 }
            }}
            style={{ transformStyle: "preserve-3d", perspective: 1000 }}
        >
            {children}
        </motion.div>
    );
};

// Magnetic hover effect
export const MagneticHover = ({ children, className = "" }) => {
    const ref = useRef(null);

    const handleMouseMove = (e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        ref.current.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    };

    const handleMouseLeave = () => {
        if (ref.current) {
            ref.current.style.transform = 'translate(0px, 0px)';
        }
    };

    return (
        <motion.div
            ref={ref}
            className={`transition-transform duration-200 ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </motion.div>
    );
};

// Stagger animation for grids
export const StaggerGrid = ({ children, className = "" }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.8", "start 0.3"]
    });

    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                }
            }}
        >
            {children}
        </motion.div>
    );
};

export const StaggerItem = ({ children, className = "" }) => {
    return (
        <motion.div
            className={className}
            variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.5, ease: "easeOut" }
                }
            }}
        >
            {children}
        </motion.div>
    );
};

// Smooth scroll progress indicator
export const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
            style={{ scaleX }}
        />
    );
};

export default {
    ParallaxSection,
    ParallaxFloat,
    ParallaxScale,
    ParallaxHorizontal,
    ParallaxReveal,
    ParallaxBlur,
    Tilt3D,
    MagneticHover,
    StaggerGrid,
    StaggerItem,
    ScrollProgress
};
