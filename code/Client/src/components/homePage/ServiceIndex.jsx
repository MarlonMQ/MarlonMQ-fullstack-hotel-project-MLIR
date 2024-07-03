import ServiceBox from "./ServiceBox";
import image from '../../assets/hotelPictures/food.jpg'
import image2 from '../../assets/hotelPictures/pool.jpg'

export default function ServiceIndex() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        <div className="">
          <ServiceBox
            serviceImage={image}
            title={"24-Hour Room Service"}
            text={"Enjoy our 24-hour room service. Our friendly staff will be delighted to attend to all your needs and make your stay as comfortable as possible."}
          />
        </div>
        <div className="">
          <ServiceBox
            serviceImage={image2}
            title={"Outdoor Pool"}
            text={"Relax and take a refreshing dip in our beautiful outdoor pool. With spacious lounging areas and a bar service, it's the perfect place to unwind under the sun and enjoy your vacation."}
          />
        </div>
      </div>
    </>
  );
}
