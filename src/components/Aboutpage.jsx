import aboutimg from "../assets/aboutimg.jpg";
import { Carouseldata } from "../assets/Carouseldata";
import { useState } from "react";

function AboutPage() {
  // State to track the current slide index
  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to go to the next slide
  const handleNext = () => {
    setCurrentSlide((prev) => (prev === Carouseldata.length - 1 ? 0 : prev + 1));
  };

  // Function to go to the previous slide
  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? Carouseldata.length - 1 : prev - 1));
  };

  return (
    <div className="flex flex-col gap-10 bg-orange-100 text-black px-4 py-10 md:px-8 md:py-16 lg:px-20 lg:py-20">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        <section className="lg:w-1/2 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-orange-500">
            About Rashtriya Swayamsevak Sangh (RSS)
          </h1>
          <p className="text-base md:text-lg">
            Welcome to the official page of Rashtriya Swayamsevak Sangh (RSS).
            Established with a profound vision to foster a united and resilient
            society, RSS has been a stalwart in promoting cultural nationalism,
            social harmony, and selfless service for decades. Rooted in the
            principles of Hindutva and dedicated to the welfare of the nation,
            RSS is committed to nurturing individuals to become disciplined,
            responsible citizens who contribute positively to the fabric of our
            diverse nation. Explore our journey, initiatives, and the values
            that drive us as we continue to strive for a prosperous and
            inclusive India.
          </p>
        </section>
        <div className="lg:w-1/2 flex justify-center">
          <img
            src={aboutimg}
            alt="About RSS"
            className="w-full max-w-md drop-shadow-2xl rounded-md"
            style={{ filter: "drop-shadow(0px 10px 10px rgb(255, 104, 31))" }}
          />
        </div>
      </div>
      <div className="relative w-full flex items-center justify-center">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-0 bg-orange-500 p-2 rounded-full shadow-md text-white hover:bg-orange-600 transition-colors focus:outline-none"
        >
          &larr;
        </button>
        <div className="flex transition-transform duration-500 ease-in-out overflow-hidden w-full max-w-xl">
          {Carouseldata.map((data, index) => (
            <div
              className={`min-w-full flex-shrink-0 transition-opacity duration-500 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              key={data.slide}
            >
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-64 object-cover rounded-md"
              />
              <div className="mt-4 text-center">
                <h3 className="text-lg font-bold">{data.title}</h3>
                <p className="text-sm">{data.description}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-0 bg-orange-500 p-2 rounded-full shadow-md text-white hover:bg-orange-600 transition-colors focus:outline-none"
        >
          &rarr;
        </button>
      </div>
    </div>
  );
}

export default AboutPage;
