import { VotedStudent } from '@/types/voting';
import { Clock, Vote } from 'lucide-react';
import { motion, useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface VotedStudentsMarqueeProps {
    students: VotedStudent[];
    loading: boolean;
    getInitialAvatar: (student: VotedStudent) => string;
}

export default function VotedStudentsMarquee({ students, loading, getInitialAvatar }: VotedStudentsMarqueeProps) {
    // Triple students untuk seamless infinite loop
    const duplicatedStudents = [...students, ...students, ...students];
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);
    
    const baseX = useMotionValue(0);

    useEffect(() => {
        if (!containerRef.current) return;
        setContainerWidth(containerRef.current.offsetWidth);

        const handleResize = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (students.length === 0 || containerWidth === 0) return;

        const itemWidth = 400;
        const singleLoopWidth = students.length * itemWidth;
        const speed = 1; // pixels per frame (smooth constant speed)

        let animationFrameId: number;

        const animateLoop = () => {
            const currentX = baseX.get();
            const newX = currentX - speed;

            // Reset position seamlessly when one loop completes
            if (Math.abs(newX) >= singleLoopWidth) {
                baseX.set(newX + singleLoopWidth);
            } else {
                baseX.set(newX);
            }

            animationFrameId = requestAnimationFrame(animateLoop);
        };

        animationFrameId = requestAnimationFrame(animateLoop);

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [students.length, baseX, containerWidth]);

    return (
        <section className="w-full overflow-hidden border-b border-red-100 bg-white py-12">
            <div className="container mx-auto mb-6 px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4"
                >
                    <div className="flex items-center gap-2 text-xl font-bold text-red-600 sm:gap-3 sm:text-2xl">
                        <Vote className="h-6 w-6 sm:h-8 sm:w-8" />
                        <span>Mahasiswa yang telah memilih:</span>
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2 text-sm sm:gap-3 sm:text-lg">
                        <Clock className="h-5 w-5 sm:h-6 sm:w-6" />
                        <span>Update real-time setiap 5 detik</span>
                    </div>
                </motion.div>
            </div>

            <div className="relative w-full overflow-hidden py-12" ref={containerRef}>
                {loading ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-full p-8 text-center text-base font-medium sm:text-xl"
                    >
                        Memuat data...
                    </motion.div>
                ) : (
                    <div className="relative" style={{ perspective: '1200px' }}>
                        <motion.div
                            className="flex"
                            style={{
                                x: baseX,
                            }}
                        >
                            {duplicatedStudents.map((student, index) => {
                                return (
                                    <MarqueeItem
                                        key={`${student.id}-${index}`}
                                        student={student}
                                        index={index}
                                        baseX={baseX}
                                        containerWidth={containerWidth}
                                        getInitialAvatar={getInitialAvatar}
                                    />
                                );
                            })}
                        </motion.div>
                    </div>
                )}
            </div>
        </section>
    );
}

// Separate component for each marquee item to optimize performance
interface MarqueeItemProps {
    student: VotedStudent;
    index: number;
    baseX: any;
    containerWidth: number;
    getInitialAvatar: (student: VotedStudent) => string;
}

function MarqueeItem({ student, index, baseX, containerWidth, getInitialAvatar }: MarqueeItemProps) {
    const [transform, setTransform] = useState({
        scale: 1,
        opacity: 1,
        rotateY: 0,
        z: 0,
    });

    useEffect(() => {
        if (containerWidth === 0) return;

        const itemWidth = 400;
        const itemOffset = index * itemWidth;

        const updateTransform = () => {
            const x = baseX.get();
            const itemPosition = itemOffset + x;
            const center = containerWidth / 2;
            const itemCenter = itemPosition + itemWidth / 2;
            
            // Calculate distance from center (0 = center, 1 = edge)
            const distance = Math.abs(itemCenter - center);
            const normalizedDistance = Math.min(distance / (containerWidth / 2), 1);

            // Smooth scale: center is bigger (1.3x), edges are smaller (0.85x)
            const scale = 1.3 - normalizedDistance * 0.45;
            
            // Smooth opacity: center is fully visible, edges fade slightly
            const opacity = 1 - normalizedDistance * 0.3;
            
            // Rotation based on position (left vs right)
            const offset = itemCenter - center;
            const rotateY = (offset / containerWidth) * 24 * normalizedDistance;
            
            // Z-axis depth for 3D effect
            const z = 50 - normalizedDistance * 100;

            setTransform({ scale, opacity, rotateY, z });
        };

        // Update on every frame
        let frameId: number;
        const animate = () => {
            updateTransform();
            frameId = requestAnimationFrame(animate);
        };
        frameId = requestAnimationFrame(animate);

        return () => {
            if (frameId) cancelAnimationFrame(frameId);
        };
    }, [baseX, containerWidth, index]);

    return (
        <motion.div
            style={{
                scale: transform.scale,
                opacity: transform.opacity,
                rotateY: transform.rotateY,
                z: transform.z,
                transformStyle: 'preserve-3d',
            }}
            className="mx-4 flex flex-shrink-0 items-center rounded-xl border border-red-200 bg-red-50 px-4 py-3 shadow-lg sm:mx-8 sm:px-6 sm:py-4"
        >
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border-4 border-red-600 shadow-md sm:h-24 sm:w-24">
                <img src={getInitialAvatar(student)} alt={student.name} className="h-full w-full object-cover" />
            </div>
            <div className="ml-3 min-w-[150px] sm:ml-5 sm:min-w-[200px]">
                <p className="text-base font-bold text-gray-800 sm:text-xl">{student.name}</p>
                <p className="mt-1 flex flex-col gap-1 text-sm text-gray-600 sm:flex-row sm:items-center sm:gap-3 sm:text-base">
                    <span className="font-medium">{student.faculty}</span>
                    <span className="hidden h-2 w-2 rounded-full bg-red-600 sm:inline-block"></span>
                    <span className="text-xs sm:text-base">{student.timestamp}</span>
                </p>
            </div>
        </motion.div>
    );
}
