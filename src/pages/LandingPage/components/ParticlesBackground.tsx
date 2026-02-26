import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        particles: {
          number: {
            value: 8,
            density: {
              enable: true,
              area: 800,
            },
          },
          color: {
            value: ["#60A5FA", "#3B82F6", "#93C5FD"],
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.3,
            random: true,
            animation: {
              enable: true,
              speed: 0.5,
              minimumValue: 0.1,
              sync: false,
            },
          },
          size: {
            value: { min: 40, max: 120 },
            random: true,
            animation: {
              enable: true,
              speed: 2,
              minimumValue: 30,
              sync: false,
            },
          },
          move: {
            enable: true,
            speed: 0.8,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
              default: "out",
            },
            attract: {
              enable: false,
            },
          },
        },
        interactivity: {
          detectsOn: "canvas",
          events: {
            onHover: {
              enable: true,
              mode: "bubble",
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 200,
              size: 80,
              duration: 2,
              opacity: 0.4,
            },
          },
        },
        detectRetina: true,
      }}
      className="absolute inset-0"
    />
  );
}
