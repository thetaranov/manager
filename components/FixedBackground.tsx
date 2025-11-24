
import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useTime } from 'framer-motion';
import { useMouse } from '../context/MouseContext';

interface FixedBackgroundProps {
  onReady?: () => void;
}

const VIDEO_URL = "https://www.dropbox.com/scl/fi/fbmpio988osl16shfuein/t-vid-3mb.mp4?rlkey=bezgqj834k9rmzv09wry1h1p1&st=i7p9n8cm&raw=1";

export const FixedBackground: React.FC<FixedBackgroundProps> = ({ onReady }) => {
  const { scrollY } = useScroll();
  const { mouseX, mouseY } = useMouse();
  const time = useTime();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  // 1. Mouse Interaction
  const springConfig = { damping: 30, stiffness: 50 }; 
  
  // Reduced dynamics by 2x (was 12, now 6 degrees)
  const mouseRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig); 
  const mouseRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig); 

  // 2. Scroll Interaction (Removed as requested)
  // const scrollTiltX = useTransform(scrollY, [0, 1500], [0, 20]); 

  // 3. Time Interaction (Drift)
  const driftRotateX = useTransform(time, (t) => Math.sin(t / 3000) * 3); 
  const driftRotateY = useTransform(time, (t) => Math.cos(t / 4000) * 3); 

  // Combine transforms (Removed scrollTiltX)
  const rotateX = useTransform(() => mouseRotateX.get() + driftRotateX.get());
  const rotateY = useTransform(() => mouseRotateY.get() + driftRotateY.get());
  
  // Visual effects
  const blur = useTransform(scrollY, [0, 600], ["blur(0px)", "blur(12px)"]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0.5]);

  return (
    // Perspective kept at 350px
    <div className="fixed inset-0 z-0 w-full h-full overflow-hidden bg-black [perspective:350px] pointer-events-none">
        {/* Moving 3D Plane */}
        <motion.div 
            style={{ 
                rotateX, 
                rotateY,
                filter: blur, 
                opacity 
            }} 
            // Scale kept at 3.7
            // Set vertical translate to 70% (40% + 30%)
            className="absolute inset-0 w-full h-full flex items-center justify-center origin-center scale-[3.7] translate-y-[70%] will-change-transform pointer-events-none"
        >
             <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover object-center"
                src={VIDEO_URL}
                autoPlay
                loop
                muted
                playsInline
                onCanPlayThrough={onReady}
             />

            {/* Texture: Pixels - Opacity 20% */}
            <div 
                className="absolute inset-0 z-20 pointer-events-none opacity-20"
                style={{
                    backgroundImage: `
                    linear-gradient(to right, rgba(0, 0, 0, 0.8) 50%, transparent 50%),
                    linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 50%, transparent 50%)
                    `,
                    backgroundSize: '4px 4px'
                }}
            />
            
            {/* Texture: Scanlines - Opacity 10% */}
            <div className="absolute inset-0 z-30 pointer-events-none opacity-10 bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0)_50%,rgba(0,0,0,0.2)_50%,rgba(0,0,0,0.2))]" style={{ backgroundSize: '100% 4px' }} />
        </motion.div>

        {/* Darker Vignette: Middle stop increased to 0.45, End stop increased to 1.0 (pure black) */}
        <div className="absolute inset-0 z-40 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.45)_50%,rgba(0,0,0,1)_100%)]" />
    </div>
  );
};
