import React from 'react'
import Carousel from "react-bootstrap/Carousel";


export default function HeroCarousel() {
  return (
  <>
     <div className="hero-container">
        <Carousel data-bs-theme="dark">
          
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://http2.mlstatic.com/D_NQ_651893-MLA76407789078_052024-OO.webp"
              alt="Second slide"
            />
            <Carousel.Caption />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://http2.mlstatic.com/D_NQ_654898-MLA75013053999_032024-OO.webp"
              alt="Third slide"
            />
            <Carousel.Caption />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://http2.mlstatic.com/D_NQ_969608-MLA76603328505_052024-OO.webp"
              alt="First slide"
            />
            <Carousel.Caption />
          </Carousel.Item>
        </Carousel>
      </div>
  </>
  )
}
