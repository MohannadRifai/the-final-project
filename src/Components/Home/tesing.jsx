import React, { useEffect, useState } from "react";
import axios from "axios";
import "./testimonials.css";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get(
          "https://final-project-backend-production-20f3.up.railway.app/api/testimonial"
        );
        setTestimonials(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <div>
      <div className="quotes page-width"></div>
      <div className="">
        <h2 className="testimonial-title">Why Clients Love Us</h2>
        <p className="testimonials-p">
          Many clients are thrilled by the service we deliver and are happy to
          tell us. Read about what some have said about us here.
        </p>
      </div>

      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className={`quotes-slide ${
            index === 0 ? "quotes-slide--active" : ""
          }`}
          data-slider-slide-index={index}
          aria-hidden={index === 0 ? "false" : "true"}
          tabIndex="-1"
          onMouseOver={() => {
            const activeSlide = document.querySelector(".quotes-slide--active");
            activeSlide.classList.remove("quotes-slide--active");
            const currentSlide = document.querySelector(
              `[data-slider-slide-index="${index}"]`
            );
            currentSlide.classList.add("quotes-slide--active");
          }}
        >
          <blockquote className="quotes-slider__text text-left">
            <span className="quote-icon">
              <svg
                aria-hidden="true"
                focusable="false"
                role="presentation"
                className="icon icon-quote"
                viewBox="0 0 41 35"
              >
                <path d="M10.208 17.711h6.124v16.332H0V21.684C0 8.184 5.444.956 16.332 0v6.125c-4.083 1.14-6.124 4.414-6.124 9.82v1.766zm24.498 0h6.124v16.332H24.498V21.684C24.498 8.184 29.942.956 40.83 0v6.125c-4.083 1.14-6.124 4.414-6.124 9.82v1.766z" />
              </svg>
            </span>
            <div className="content">
              <p>{testimonial.description}</p>
            </div>
            <cite>{testimonial.name}</cite>
          </blockquote>
        </div>
      ))}
    </div>
  );
}
