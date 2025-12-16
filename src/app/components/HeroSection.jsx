"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";

const ThreeBackground = dynamic(() => import("./ThreeBackground"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/10 to-purple-700/10 blur-3xl" />
  ),
});

const HeroOrbitScene = dynamic(() => import("./HeroOrbitScene"), {
  ssr: false,
  loading: () => null,
});

const HeroSection = () => {
  return (
    <section className="lg:py-16 relative overflow-hidden">
      <ThreeBackground />
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
        >
          <h1 className="text-white mb-2 text-3xl sm:text-4xl lg:text-6xl lg:leading-tight font-extrabold">
            Dharsan Guruparan
          </h1>
          <div className="relative h-12 sm:h-14 lg:h-16 mb-4 overflow-hidden text-2xl lg:text-4xl font-semibold text-primary-400">
            <TypeAnimation
              sequence={[
                "Software Engineer",
                1200,
                "Mobile Developer",
                1200,
                "SDET Engineer",
                1500,
                "Embedded Systems Software Developer",
                1800,
              ]}
              wrapper="span"
              speed={45}
              repeat={Infinity}
              className="absolute inset-0 flex items-center"
            />
          </div>
          <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl">
            Gamer By Night
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="https://www.linkedin.com/in/dharsanguruparan/"
              className="px-6 inline-block py-3 w-full sm:w-fit rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-200 text-white"
            >
              Linkedin
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="col-span-4 place-self-center mt-12 lg:mt-0 w-full"
        >
          <div className="relative rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 opacity-70 bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-600/20" />
            <div className="relative rounded-[2rem] bg-[#050505]/70 p-4">
              <div className="relative rounded-[1.5rem] bg-gradient-to-br from-[#0f172a] to-[#030712] p-6 flex flex-col items-center gap-6 overflow-hidden">
                <HeroOrbitScene />
                <Image
                  src="./images/dharzan2.png"
                  alt="dharzan image"
                  className="relative z-10 rounded-[1.5rem] shadow-2xl saturate-125"
                  width={260}
                  height={260}
                  priority
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
