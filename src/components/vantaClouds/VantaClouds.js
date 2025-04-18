// src/components/vantaClouds/VantaClouds.jsx
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import CLOUDS from "vanta/dist/vanta.clouds.min";
import "./VantaCloud.css";

const VantaClouds = ({ weatherCondition, isHidden }) => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  const getVantaColors = (condition) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return {
          skyColor: 0x87ceeb,
          cloudColor: 0xffffff,
          sunColor: 0xffd700,
        };
      case "rain":
      case "drizzle":
        return {
          skyColor: 0x4a4e69,
          cloudColor: 0x7d7d7d,
          sunColor: 0x555555,
        };
      case "clouds":
        return {
          skyColor: 0x8fa5b6,
          cloudColor: 0xd3d3d3,
          sunColor: 0xffc107,
        };
      case "snow":
        return {
          skyColor: 0xe0f7fa,
          cloudColor: 0xffffff,
          sunColor: 0xfff9c4,
        };
      case "thunderstorm":
        return {
          skyColor: 0x2c3e50,
          cloudColor: 0x34495e,
          sunColor: 0xe74c3c,
        };
      default:
        return {
          skyColor: 0x67b4d1,
          cloudColor: 0xcce2f4,
          sunColor: 0xf9991f,
        };
    }
  };

  useEffect(() => {
    const colors = getVantaColors(weatherCondition || "default");

    if (vantaEffect) vantaEffect.destroy();

    const effect = CLOUDS({
      el: vantaRef.current,
      THREE: THREE,
      mouseControls: true,
      touchControls: true,
      minHeight: 200.0,
      minWidth: 200.0,
      skyColor: colors.skyColor,
      cloudColor: colors.cloudColor,
      cloudShadowColor: 0x183651,
      sunColor: colors.sunColor,
      sunGlareColor: 0xff6937,
      sunlightColor: colors.sunColor,
      speed: 1,
    });

    setVantaEffect(effect);

    return () => {
      if (effect) effect.destroy();
    };
  }, [weatherCondition]);

  return (
    <div
      id="vanta-bg"
      ref={vantaRef}
      className={isHidden ? "hidden" : ""}
      style={{ width: "100%", height: "100vh" }}
    />
  );
};

export default VantaClouds;
