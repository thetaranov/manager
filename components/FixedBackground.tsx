
import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useMouse } from '../context/MouseContext';

interface FixedBackgroundProps {
  onReady?: () => void;
}

const VIDEO_URL = "https://www.dropbox.com/scl/fi/fbmpio988osl16shfuein/t-vid-3mb.mp4?rlkey=bezgqj834k9rmzv09wry1h1p1&st=i7p9n8cm&raw=1";

export const FixedBackground: React.FC<FixedBackgroundProps> = ({ onReady }) => {
  const { scrollY } = useScroll();
  const { mouseX, mouseY } = useMouse();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  // Smooth spring animation for the rotation
  const springConfig = { damping: 30, stiffness: 80 }; 
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [2, -2]), springConfig); 
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2, 2]), springConfig); 
  
  // Scroll effects
  const blur = useTransform(scrollY, [0, 600], ["blur(0px)", "blur(16px)"]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0.6]);

  return (
    <div className="fixed inset-0 z-0 w-full h-full overflow-hidden bg-black [perspective:1000px] pointer-events-none">
        {/* Moving 3D Plane - Added pointer-events-none */}
        <motion.div 
            style={{ 
                rotateX, 
                rotateY,
                filter: blur, 
                opacity 
            }} 
            className="absolute inset-0 w-full h-full origin-center scale-[1.25] will-change-transform pointer-events-none"
        >
             <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                src={VIDEO_URL}
                autoPlay
                loop
                muted
                playsInline
                onCanPlayThrough={onReady}
             />

            {/* Macro Pixels Texture */}
            <div 
                className="absolute inset-0 z-20 pointer-events-none opacity-25"
                style={{
                    backgroundImage: `
                    linear-gradient(to right, rgba(0, 0, 0, 0.9) 50%, transparent 50%),
                    linear-gradient(to bottom, rgba(0, 0, 0, 0.9) 50%, transparent 50%)
                    `,
                    backgroundSize: '3px 3px'
                }}
            />
            
            {/* Subtle Scanlines */}
            <div className="absolute inset-0 z-30 pointer-events-none opacity-10 bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0)_50%,rgba(0,0,0,0.4)_50%,rgba(0,0,0,0.4))]" style={{ backgroundSize: '100% 4px' }} />
        </motion.div>

        {/* Vignette */}
        <div className="absolute inset-0 z-40 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,1)_100%)]" />
    </div>
  );
};
