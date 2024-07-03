import PropTypes from 'prop-types';

export default function ServiceBox({ serviceImage, title, text }) {
  return (
    <div
      className="relative bg-cover bg-center text-white p-4 flex flex-col justify-center items-center w-full h-full"
      style={{ backgroundImage: `url(${serviceImage})` }}
    >
      {/* Overlay semi-transparente */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      {/* Contenido de la caja */}
      <div className="relative z-10 p-6 md:p-20">
        <h2 className="text-2xl md:text-5xl font-bold text-center mb-6 md:mb-10 font-poppins tracking-tighter">{title}</h2>
        <div className="text-lg md:text-xl text-justify font-nunito font-normal tracking-tight space-y-4">
          <h3>
            {text}  
          </h3>
        </div>
      </div>
    </div>
  );
}

ServiceBox.propTypes = {
  serviceImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.object.isRequired,
};
