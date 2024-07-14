import aboutimg from "../assets/aboutimg.jpg";
import { Carouseldata } from "../assets/Carouseldata";
import Carousel from "./Carousel";
function AboutPage() {
  return (
    <div className="lg:pl-20 lg:pt-20 lg:p-20 flex flex-col gap-20 bg-orange-100 text-black">
      <div className="flex flex-col lg:flex-row items-center gap-5 mx-10">
        <section className="w-1/2 space-y-4">
          {/* Ensure that the h1 tag has the appropriate classes */}
          <h1 className="text-4xl font-bold text-orange-500">About Rashtriya Swayamsevak Sangh (RSS)</h1>
          <p>Welcome to the official page of Rastriya Swayamsevak Sangh (RSS). Established with a profound vision to foster a united and resilient society, RSS has been a stalwart in promoting cultural nationalism, social harmony, and selfless service for decades. Rooted in the principles of Hindutva and dedicated to the welfare of the nation, RSS is committed to nurturing individuals to become disciplined, responsible citizens who contribute positively to the fabric of our diverse nation. Explore our journey, initiatives, and the values that drive us as we continue to strive for a prosperous and inclusive India.</p>
        </section>
        <div className="w1/2">
        <img src={aboutimg} alt="" style={{filter:"drop-shadow(0px 10px 10pxrgb(255, 104, 31))"}} className="drop-shadow-2xl rounded-md" /></div>
      </div>
      <div className="carousel w-full">
        {Carouseldata && Carouseldata.map((Data)=><Carousel description={Data.description} title={Data.title} image={Data.image} slide={Data.slide} totalslide={Carouseldata.length} key={Data.slide}></Carousel>)}
 
</div>
    </div>
  );
}

export default AboutPage;
