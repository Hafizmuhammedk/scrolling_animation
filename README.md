# Scrolling Animation Landing Page

This is a Next.js landing page project showcasing Apple-style cinematic scroll animations using image sequences, built with GSAP and Lenis.

## Features

- **Smooth Scrolling**: Implemented using [Lenis](https://lenis.darkroom.engineering/) for a fluid user experience.
- **Sequence Animation**: High-performance scrolling animation that progresses through image frames using [GSAP (GreenSock)](https://gsap.com/).
- **Responsive Design**: Built with Tailwind CSS to ensure it looks great on all devices.
- **Next.js 15**: Leveraging the latest React and Next.js features.

## Asset Generation Workflow

The stunning visuals in this project were generated and processed using the following tools:

1. **Whisk**: Used to generate the initial base pictures/visuals.
2. **Flow**: Used to transform the still pictures into a dynamic, seamless video.
3. **EZGIF**: Used to extract and split the generated video into individual high-quality image frames. These frames are then sequenced together by the application to create the scroll-bound interactive animation.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **Animation**: GSAP (GreenSock Animation Platform)
- **Smooth Scroll**: Lenis

## Project Structure

- `src/components/ScrollSequence.tsx`: The core component that handles the scroll-bound image sequence animation using a canvas and GSAP.
- `src/components/SmoothScroll.tsx`: Wrapper component implementing Lenis for hijacking the native scroll.
- `public/`: Directory containing all the generated frames for the animation sequence (processed from EZGIF).
