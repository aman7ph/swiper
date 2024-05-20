import React, { useState, useRef, useEffect } from "react";

function Swiper({ children }) {
  const [startX, setStartX] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(0);

  const swiperRef = useRef(null);

  const mouseSensitivity = 0.115;
  const touchSensitivity = 0.15;

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

    if (scrollLeft >= scrollWidth / 2) {
      swiperRef.current.scrollLeft = scrollLeft - scrollWidth / 2;
    }

    if (scrollLeft <= 0) {
      swiperRef.current.scrollLeft = scrollLeft + scrollWidth / 2;
    }

    setScrollLeft(swiperRef.current.scrollLeft);
  }

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
        className="w-[900px] h-[600px] overflow-x-hidden flex items-center rounded-[10px]"
      >
        <div className="flex h-[90%] w-max ml-[9px]">
          {React.Children.map(duplicatedChildren, (child, index) => (
            <div
              key={index}
              className="w-[400px] bg-[white] flex items-center justify-center text-3xl m-3 rounded-[10px]"
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Swiper;
