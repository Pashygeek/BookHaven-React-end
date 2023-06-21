import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "./loading-animation.json";

function LoadingAnimation() {
  const containerRef = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData,
    });

    return () => {
      anim.destroy(); // Clean up the animation when the component unmounts
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "white",
        zIndex: 9999,
      }}
    >
      <h2 className="loading-title" style={{ marginBottom: "16px" }}>Loading...</h2>
      <div ref={containerRef} style={{ width: "200px", height: "200px" }} />
    </div>
  );
}

export default LoadingAnimation;
