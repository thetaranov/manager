
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useTime, useMotionValue } from 'framer-motion';
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
  const [isMobile, setIsMobile] = useState(false);

  // Gyroscope Motion Values
  const gyroX = useMotionValue(0); // Beta (front/back tilt)
  const gyroY = useMotionValue(0); // Gamma (left/right tilt)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  // Initialize Gyroscope Listener
  useEffect(() => {
    if (!isMobile) return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      // Gamma: Left/Right tilt (-90 to 90). Map to rotateY.
      // Beta: Front/Back tilt (-180 to 180). Map to rotateX.
      
      const gamma = e.gamma || 0;
      const beta = e.beta || 0;

      // Normalize and Clamp values for subtle effect
      // Gamma (Left/Right): Direct mapping, max +/- 20 deg
      const targetY = Math.max(-20, Math.min(20, gamma));
      
      // Beta (Front/Back): Offset by ~45 deg (holding position), max +/- 20 deg
      // Assuming user holds phone at ~45 degrees, so 45 is "neutral"
      const targetX = Math.max(-20, Math.min(20, beta - 45));

      gyroX.set(targetX);
      gyroY.set(targetY);
    };

    const requestAccess = async () => {
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        try {
          const permissionState = await (DeviceOrientationEvent as any).requestPermission();
          if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          }
        } catch (error) {
          console.error('Gyroscope permission failed', error);
        }
      } else {
        // Non-iOS 13+ devices
        window.addEventListener('deviceorientation', handleOrientation);
      }
    };

    // iOS requires a user gesture to request permission.
    // We attach a one-time click listener to the window to trigger this.
    const handleInteraction = () => {
      requestAccess();
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    
    // Attempt immediate connection for non-iOS devices
    if (!((DeviceOrientationEvent as any).requestPermission)) {
         window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [isMobile, gyroX, gyroY]);


  // 1. Physics Configuration
  const springConfig = { damping: 30, stiffness: 50 }; 
  
  // 2. Mouse Transforms (Desktop)
  const mouseRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig); 
  const mouseRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig); 

  // 3. Gyro Transforms (Mobile)
  // Invert X because tilting phone forward (positive beta) should tilt plane top-away (negative rotateX) for natural feel
  const gyroRotateXSpring = useSpring(useTransform(gyroX, (val) => -val / 1.5), springConfig);
  const gyroRotateYSpring = useSpring(useTransform(gyroY, (val) => val / 1.5), springConfig);

  // 4. Time Interaction (Drift)
  const driftAmplitude = isMobile ? 12 : 3; 
  
  const driftRotateX = useTransform(time, (t) => Math.sin(t / 3000) * driftAmplitude); 
  const driftRotateY = useTransform(time, (t) => Math.cos(t / 4000) * driftAmplitude); 

  // 5. Combine transforms based on device type
  const rotateX = useTransform(() => {
    const drift = driftRotateX.get();
    return isMobile 
        ? gyroRotateXSpring.get() + drift 
        : mouseRotateX.get() + drift;
  });

  const rotateY = useTransform(() => {
    const drift = driftRotateY.get();
    return isMobile 
        ? gyroRotateYSpring.get() + drift 
        : mouseRotateY.get() + drift;
  });
  
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
                opacity,
                y: "7%",
                scale: 1.1 // Increased scale to prevent edge clipping during high rotation
            }} 
            className="absolute inset-0 w-full h-full flex items-center justify-center origin-center will-change-transform pointer-events-none"
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

            {/* Video-specific Vignette */}
            <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)]" />

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
