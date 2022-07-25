import React from "react";
import Image from "next/image";
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const Featured = () => {
  const images = ["/img/pizza1.png", "/img/pizza2.png", "/img/pizza3.png"];

  const zoomInProperties = {
    indicators: true,
    scale: 1.4,
  };
  return (
    <div className="bg-gray-200 py-20">
      <Zoom {...zoomInProperties}>
        {images.map((each, index) => (
          <div
            key={index}
            className="w-[100vw] h-[100%] flex justify-center items-center"
          >
            <Image
              width={400}
              height={400}
              src={each}
              objectFit="contain"
              alt="pizza"
            />
          </div>
        ))}
      </Zoom>
    </div>
  );
};

export default Featured;
