"use client";

import Tag from "@/components/Tag";
import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const text = `You're racing to create exceptional work, but traditional design tools slow you down with unnecessary complexity and steep learning curves.`;
const words = text.split(" ");

export default function Introduction() {
  const scrollTarget = useRef<HTMLDivElement>(null);

  // Capture the scroll progress for the specified target
  const { scrollYProgress } = useScroll({
    target: scrollTarget,
    offset: ["start end", "end end"],
  });

  // Transform scroll progress to word indices
  const wordIndex = useTransform(scrollYProgress, [0, 1], [0, words.length]);

  // State to track the currently highlighted word
  const [currentWord, setCurrentWord] = useState(0);

  // Sync the transformed scroll value to update `currentWord`
  useEffect(() => {
    const unsubscribe = wordIndex.on("change", (latest) => {
      setCurrentWord(Math.floor(latest));
    });

    return () => unsubscribe(); // Clean up the subscription
  }, [wordIndex]);

  return (
    <section className="py-28 lg:py-40">
      <div className="container">
        {/* Sticky Header */}
        <div className="sticky top-20 md:top-28 lg:top-40">
          <div className="flex justify-center">
            <Tag>Introducing Layers</Tag>
          </div>
          <div className="text-4xl md:text-6xl lg:text-7xl text-center font-medium mt-10">
            <span>Your creative process deserves better.</span>
            {""}
            <span className="">
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  className={twMerge(
                    "transition duration-500 text-white/15",
                    index < currentWord && "text-white"
                  )}
                >
                  {`${word} `}
                </motion.span>
              ))}
            </span>
            <span className="text-lime-400 block">
              That&apos;s why we built Layers
            </span>
          </div>
        </div>
        {/* Scroll Target Area */}
        <div className="h-[150vh]" ref={scrollTarget}></div>
      </div>
    </section>
  );
}