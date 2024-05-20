import React, { useState, useRef, useEffect } from "react";
import "./swiper.css";

function Swiper({ children }) {
  const [startX, setStartX] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(0);

  const swiperRef = useRef(null);

  // Sensitivity factors
  const mouseSensitivity = 0.115;
  const touchSensitivity = 0.15; // Adjust this value for desired touch sensitivity

  // Duplicate the children
  const duplicatedChildren = [...children, ...children];

  function handleOnMouseDown(event) {
    setStartX(event.clientX);
    setIsMouseDown(true);
  }

  function handleOnTouchStart(event) {
    setStartX(event.touches[0].clientX);
    setIsMouseDown(true);
  }

  function handleOnMouseMove(event) {
    if (!isMouseDown || !swiperRef.current) return;
    event.preventDefault();
    const deltaX = (event.clientX - startX) * mouseSensitivity;
    swiperRef.current.scrollLeft = scrollLeft - deltaX;
  }

  function handleOnTouchMove(event) {
    if (!isMouseDown || !swiperRef.current) return;
    const deltaX = (event.touches[0].clientX - startX) * touchSensitivity;
    swiperRef.current.scrollLeft = scrollLeft - deltaX;
  }

  function handleOnMouseUp() {
    setIsMouseDown(false);
  }

  function handleOnTouchEnd() {
    setIsMouseDown(false);
  }

  function handleOnScroll() {
    if (!swiperRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = swiperRef.current;

    // If scrolled to the end of the first set, jump to the start of the second set
    if (scrollLeft >= scrollWidth / 2) {
      swiperRef.current.scrollLeft = scrollLeft - scrollWidth / 2;
    }

    // If scrolled to the start of the second set, jump to the end of the first set
    if (scrollLeft <= 0) {
      swiperRef.current.scrollLeft = scrollLeft + scrollWidth / 2;
    }

    setScrollLeft(swiperRef.current.scrollLeft);
  }

  // Initialize the scroll position to the middle
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.scrollLeft = swiperRef.current.scrollWidth / 4;
      setScrollLeft(swiperRef.current.scrollLeft);
    }
  }, []);

  return (
    <div>
      <div
        onMouseDown={(event) => {
          handleOnMouseDown(event);
        }}
        onMouseMove={(event) => {
          handleOnMouseMove(event);
        }}
        onMouseUp={() => {
          handleOnMouseUp();
        }}
        onMouseLeave={() => {
          handleOnMouseUp();
        }}
        onTouchStart={(event) => {
          handleOnTouchStart(event);
        }}
        onTouchMove={(event) => {
          handleOnTouchMove(event);
        }}
        onTouchEnd={() => {
          handleOnTouchEnd();
        }}
        onScroll={() => {
          handleOnScroll();
        }}
        ref={swiperRef}
        className="swiperRootContainer"
      >
        <div className="swiperItemsContainer">
          {React.Children.map(duplicatedChildren, (child, index) => (
            <div key={index} className="swiperItem">
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Swiper;
