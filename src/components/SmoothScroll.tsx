import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactNode } from "react";

interface SmoothScrollProps {
    children: ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
    const lenisOptions = {
        lerp: 0.1,
        duration: 1.5,
        smoothTouch: true, //smooth scroll for touch devices
        smooth: true,
    };

    return (
        <ReactLenis root options={lenisOptions}>
            {children}
        </ReactLenis>
    );
};

export default SmoothScroll;
