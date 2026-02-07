"use client";

import { useId } from "react";
import styles from "./AnimatedLogo.module.css";

interface AnimatedLogoProps {
  size?: number;
  className?: string;
}

const CIRCLE_PATH =
  "M531.1,0C237.78,0,0,237.78,0,531.1s237.78,531.1,531.1,531.1,531.1-237.78,531.1-531.1S824.43,0,531.1,0ZM531.1,1043.4c-282.93,0-512.3-229.36-512.3-512.3S248.17,18.81,531.1,18.81s512.3,229.36,512.3,512.3-229.36,512.3-512.3,512.3Z";

const LEFT_BAR_PATH =
  "M59.19,531.1c0,161.15,80.77,303.42,204.04,388.56V142.54c-123.27,85.14-204.04,227.42-204.04,388.56Z";

const KNEE_PATH =
  "M597.63,686.97c-42.35-36.42-55.15-54.02-33.69-83.39,21.46-29.36,57.98-4.14,71.91-13.18s23.34-47.44,59.86-44.8c36.52,2.64,41.22,32.38,40.28,38.4s-25.6,59.86,8.28,133.65c21.42,46.66,64.29,122.88,92.92,172.64,101.47-86.56,165.82-215.35,165.82-359.18s-69.62-282.94-178.23-369.4c-37.22,47.65-112.69,144.21-139.91,178.54-36.71,46.31-24.28,79.06-22.59,92.05,1.69,12.99,11.29,36.14,5.08,73.98s-49.13,54.78-49.13,54.78c0,0-29.93,8.47-64.38-6.78-34.45-15.25-49.69-37.84-60.99-68.89-11.29-31.06-.56-83.39,20.33-103.62,20.89-20.24,66.64-72.28,66.64-72.28l155.25-204.02c-61.74-29.64-130.93-46.25-203.99-46.25-49.67,0-97.54,7.68-142.51,21.91v900.01c44.96,14.23,92.84,21.91,142.51,21.91,86.12,0,166.85-23.07,236.35-63.37-34.11-56.93-134.86-222.62-169.82-252.68ZM531.85,597.74c-9.79,12.42-24.09,14.68-39.15,4.52s-28.8-28.61-28.8-28.61c0,0-27.39-32.75-28.42-56.85-1.04-24.09,5.27-26.73,10.16-28.61,4.89-1.88,16.94-8.66,25.98,12.05,9.04,20.71,23.34,38.4,23.34,38.4l27.86,27.11s18.82,19.58,9.04,32Z";

const ANIM_X = 450;
const ANIM_Y = 500;

export default function AnimatedLogo({
  size = 48,
  className,
}: AnimatedLogoProps) {
  const id = useId();

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1062.21 1062.21"
      width={size}
      height={size}
    >
      <defs>
        <clipPath id={`${id}-anim`}>
          <rect x={ANIM_X} y={ANIM_Y} width={1062.21 - ANIM_X} height={1062.21 - ANIM_Y} />
        </clipPath>
      </defs>

      {/* Left bar - static */}
      <path fill="#beaf89" d={LEFT_BAR_PATH} />

      {/* Full K-shape - static base */}
      <path fill="#beaf89" d={KNEE_PATH} />

      {/* Animated lower-right region */}
      <g clipPath={`url(#${id}-anim)`} className={styles.lowerLeg}>
        {/* Opaque background - fully covers static base in this area */}
        <rect width="2200" height="2200" fill="#405144" />
        {/* K-shape on top - creates rotated bone pattern */}
        <path fill="#beaf89" d={KNEE_PATH} />
      </g>

      {/* Circle ring on top - covers any overflow at circle edges */}
      <path fill="#beaf89" d={CIRCLE_PATH} />
    </svg>
  );
}
