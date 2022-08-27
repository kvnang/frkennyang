import React, { useEffect, useRef, useState } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import { MdChevronRight, MdChevronLeft } from 'react-icons/md';
import debounce from 'just-debounce-it';

if (typeof window !== 'undefined') {
  smoothscroll.polyfill();
}

export function SlideArrow({
  direction,
  sliderInnerRef,
}: {
  direction: 'next' | 'prev';
  sliderInnerRef: HTMLUListElement | null;
}) {
  const [disabled, setDisabled] = useState(false);

  const updateArrowState = () => {
    const sliderInner = sliderInnerRef;

    if (!sliderInner) {
      return;
    }

    const { scrollWidth, clientWidth, scrollLeft } = sliderInner;
    const errorMargin = 5; // sometimes clientWidth + scrollLeft won't ever add up to scrollWidth

    const hasNext = scrollWidth - errorMargin > clientWidth + scrollLeft;
    const hasPrev = scrollLeft > 0;

    if (direction === 'next') {
      setDisabled(!hasNext);
    }

    if (direction === 'prev') {
      setDisabled(!hasPrev);
    }

    sliderInner.classList.remove('is-scrolling-by-click');
  };

  const handleClick = () => {
    const sliderInner = sliderInnerRef;

    if (!sliderInner) {
      return;
    }

    sliderInner.classList.add('is-scrolling-by-click');

    const allSlides = sliderInner.children;

    const currentSlideIndex = Array.from(allSlides).findIndex(
      (el) => el.getBoundingClientRect().left > 0
    );
    const previousSlideIndex =
      currentSlideIndex === 0 ? allSlides.length - 1 : currentSlideIndex - 1;

    const { scrollLeft } = sliderInner;

    if (direction === 'next') {
      sliderInner.scrollTo({
        left: scrollLeft + allSlides[currentSlideIndex].clientWidth,
        behavior: 'smooth',
      });
    } else if (direction === 'prev') {
      sliderInner.scrollTo({
        left: scrollLeft - allSlides[previousSlideIndex].clientWidth,
        behavior: 'smooth',
      });
    }
  };

  const handleWindowResize = debounce(() => updateArrowState(), 500);
  const handleScroll = debounce(() => updateArrowState(), 250);

  useEffect(() => {
    const sliderInner = sliderInnerRef;

    sliderInner?.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleWindowResize);

    updateArrowState();

    return () => {
      sliderInner?.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [sliderInnerRef]);

  useEffect(() => {
    const sliderInner = sliderInnerRef;

    return () => {
      sliderInner?.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className="slider__arrow"
      aria-label={direction === 'next' ? 'Next' : 'Previous'}
    >
      {direction === 'next' && <MdChevronRight />}
      {direction === 'prev' && <MdChevronLeft />}
    </button>
  );
}

export function Slide({ children }: { children: React.ReactNode }) {
  return <li className="slider__slide">{children}</li>;
}

export function Slider({
  children,
  setRef,
}: {
  children: React.ReactNode;
  setRef?: React.Dispatch<React.SetStateAction<HTMLUListElement | null>>;
}) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (ref.current && typeof setRef !== 'undefined') {
      setRef(ref.current);
    }
  }, [ref]);

  return (
    <div className="slider">
      <div className="container">
        <div className="row">
          <div className="slider__col col">
            <ul ref={ref} className="slider__inner">
              {React.Children.map(children, (child, index) => (
                <Slide>{child}</Slide>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
