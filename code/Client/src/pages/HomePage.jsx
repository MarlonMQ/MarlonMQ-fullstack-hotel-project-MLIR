import { CarouselComponent } from '../components/Carousel.jsx';
import ColourCard from '../components/homePage/ColourCard.jsx'
import ServiceIndex from '../components/homePage/ServiceIndex.jsx';
import image from '../assets/hotelPictures/Hotel-image01.jpg'

function HomePage() {
  const images = {
    desktopImages: [
      "../src/assets/hotelPictures/Hotel-image01.jpg", 
      "../src/assets/hotelPictures/Hotel-image02.jpg",
      "../src/assets/hotelPictures/Hotel-image03.jpg"
    ],
    mobileImages: [
      "../src/assets/hotelPictures/Hotel-image04.jpg", 
      "../src/assets/hotelPictures/Hotel-image06.jpg",
      "../src/assets/hotelPictures/Hotel-image07.jpg"
    ],
  };

  return (
    <>
      <CarouselComponent images={images} />
      <ColourCard 
        title="WELCOME TO HAZBIN HOTEL"
        text="We are a hotel located in the heart of the city. We offer the best service to make your stay as pleasant as possible. We have a variety of rooms, from simple to luxury suites. We also have a restaurant, a bar, a gym and a swimming pool. We are waiting for you!"
        serviceImage={image}
      />
      <ServiceIndex />
    </>
  )
}

export default HomePage;
