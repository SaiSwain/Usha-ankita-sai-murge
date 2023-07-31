
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css';
import React, { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac eros ac mauris gravida vestibulum et ac ex.',
    image: 'https://media.istockphoto.com/id/519406045/photo/bangalore-skyline-india.jpg?s=612x612&w=0&k=20&c=oxt58BE9hZWWM1r45X4DrGOdnxSiJOtCIvuXD1uC9Yo=',
  },
  {
    id: 2,
    name: 'Jane Smith',
    text: 'Suspendisse potenti. Nam tincidunt nisi vitae nibh fringilla euismod. Cras bibendum tristique justo a dapibus.',
    image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdjlDFiR-NJ_8sJpkgn_pKMdQqMlmr_jdfTA&usqp=CAU',
  },
  {
    id: 3,
    name: 'Michael Johnson',
    text: 'Fusce ut euismod lorem, nec fermentum orci. Suspendisse potenti. Morbi pellentesque est eu purus varius.',
    image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU6Srec6M7n5gKqPoI3p-pDEOJirDJ6Owqag&usqp=CAU'
  },
  {
    id: 3,
    name: 'Michael Johnson',
    text: 'Fusce ut euismod lorem, nec fermentum orci. Suspendisse potenti. Morbi pellentesque est eu purus varius.',
    image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPYcmplIfBSeOIKPXNtn6qLGMkkc2v5zLgS02WFsGjIJLFNvuIbJym20x_OY4wlGTiay0&usqp=CAU'
  },
  {
    id: 3,
    name: 'Michael Johnson',
    text: 'Fusce ut euismod lorem, nec fermentum orci. Suspendisse potenti. Morbi pellentesque est eu purus varius.',
    image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtITUskrAYzaaWhfBGGtK9Nl-ui2u8H1MN8g&usqp=CAU'
  },
  {
    id: 3,
    name: 'Michael Johnson',
    text: 'Fusce ut euismod lorem, nec fermentum orci. Suspendisse potenti. Morbi pellentesque est eu purus varius.',
    image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ55VTI_X3UknJMULjOeDr3ovBvLHzk3dh9JQ&usqp=CAU'
  },
  {
    id: 3,
    name: 'Michael Johnson',
    text: 'Fusce ut euismod lorem, nec fermentum orci. Suspendisse potenti. Morbi pellentesque est eu purus varius.',
    image:'https://cdn3.vectorstock.com/i/1000x1000/17/52/professional-workers-different-jobs-professionals-vector-31651752.jpg'
  },
  {
    id: 3,
    name: 'Michael Johnson',
    text: 'Fusce ut euismod lorem, nec fermentum orci. Suspendisse potenti. Morbi pellentesque est eu purus varius.',
    image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdPGH7Itbk4FK-PVP1qxQM_TxuO-6ajnbIug&usqp=CAU'
  },
];

const Carousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      // Set the previous testimonial to the active class for fade-out animation
      const previousIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
      const previousTestimonial = document.getElementById(`testimonial-${previousIndex}`);
      if (previousTestimonial) {
        previousTestimonial.classList.remove('active');
        previousTestimonial.classList.add('previous');
      }

      // Set the new active testimonial for fade-in animation
      const activeTestimonial = document.getElementById(`testimonial-${activeIndex}`);
      if (activeTestimonial) {
        activeTestimonial.classList.add('active');
        activeTestimonial.classList.remove('previous');
      }

      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000); // Auto slide every 1 minute (60,000 milliseconds)

    return () => clearInterval(interval);
  }, [activeIndex]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    adaptiveHeight: true,
  };

  return (
    <div><br/>
    <div class="input-group">
  <span class="input-group-text">First </span>
  <input type="text" aria-label="First name" class="form-control"/>
  <input type="text" aria-label="Last name" class="form-control"/>
</div><br/>
    <div className="carousel-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="carousel-slide">
            <img src={image} alt={`Slide ${index}`} />
          </div>
        ))}
      </Slider>
      <h2 style={{color:"white"}}>Trusted by<span style={{color:"#14BC9A"}}> top-tier </span>  companies</h2>
      <div className="testimonial-slider">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className={`testimonial ${index === activeIndex ? 'active' : index === activeIndex - 1 ? 'previous' : ''}`}
            id={`testimonial-${index}`}
          >
          
            <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
            <p className="testimonial-name">{testimonial.name}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Carousel;
