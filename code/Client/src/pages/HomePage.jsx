import { CarouselComponent } from '../components/Carousel.jsx';

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
    </>
  )
}

export default HomePage;
