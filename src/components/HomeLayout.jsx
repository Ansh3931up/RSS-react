import { useEffect, useState } from 'react';

import bgimg1 from "../assets/bgimg.jpg";
import bgimg2 from "../assets/bgimg2.jpg";
import bgimg3 from "../assets/gettyimages-1239745009-612x612.jpg";
import img1 from "../assets/img1.jpg"
import img2 from "../assets/img2.jpg"
import img3 from "../assets/img3.jpg"
// import logo from "../assets/rss-logo.jpg"

function HomeLayout() {
  const [backgroundImage, setBackgroundImage] = useState(bgimg1);
  const backgroundImageUrls = [bgimg1, bgimg2, bgimg3];
  const transitionDuration = 1000;
  const intervalTime = 2000;
  let intervalId;

  useEffect(() => {
    intervalId = setInterval(() => {
      const currentIndex = backgroundImageUrls.indexOf(backgroundImage);
      const nextIndex = (currentIndex + 1) % backgroundImageUrls.length;
      setBackgroundImage(backgroundImageUrls[nextIndex]);
    }, intervalTime);

    return () => {
      clearInterval(intervalId);
    };
  }, [backgroundImage]);

  const bgStyle = {
    backgroundImage: `url(${backgroundImage})`,
    transition: `opacity ${transitionDuration / 1000}s ease`,
    opacity: 0.2,
    zIndex: -1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000" style={bgStyle}></div>
      <div className="absolute inset-0 bg-orange-500 opacity-50" style={{ mixBlendMode: 'multiply', transition: `opacity ${transitionDuration / 1000}s ease` }}></div>
      <div className="relative z-10 text-center py-10 lg:py-24 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-12 lg:gap-x-8">
          <div className="flex flex-col justify-center lg:col-span-7 lg:gap-x-6 lg:text-left">
            <h1 className="mt-8 text-3xl font-bold tracking-tight text-orange-400 md:text-4xl lg:text-6xl">
              Unite The People Of<br /> The Nation
            </h1>
            <p className="mt-8 text-lg text-orange-300">
              Explore the rich history and impactful initiatives of Rashtriya Swayamsevak Sangh (RSS) on our comprehensive website. Discover insightful articles, historical perspectives, and updates on RSS's social, cultural, and educational activities. Stay informed and engaged with our dedicated platform celebrating the ethos and contributions of RSS
            </p>
          </div>
          <div className="flex lg:col-span-5 lg:-mr-8 gap-4">
            <img src={img1} alt="Image 1" className="rounded-xl shadow-xl h-[90%] object-cover mb-4" />
            <div className="flex flex-wrap flex-col gap-8">
              <img src={img2} alt="Image 2" className="rounded-xl shadow-lg lg:h-52 lg:w-64 object-cover mb-4 lg:mb-0" />
              <img src={img3} alt="Image 3" className="rounded-xl lg:h-52 lg:w-64 object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default HomeLayout;
