import React, { Children } from 'react';
import styled from 'styled-components';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import { breakpoints } from '../styles/breakpoints';

export interface ICarouselProps {
  /**
   * Items that going to be showed
   */
  children: React.ReactNode;

  /**
   * Indicate how many to show at once
   */
  show: number;

  /**
   * Is the carousel repeating
   */
  infiniteLoop?: boolean;

  /**
   * Is the carousel changes automatically
   */
  autoPlay?: boolean;

  /**
   * Render with indicator
   */
  // withIndicator?: boolean;

  /**
   * Render custom previous button
   * @param previousItem function to navigate to previous item
   * @param defaultClass default class for the button, it contain styles to position the button correctly. (not the arrow icon)
   * @example
   * <Carousel
   *   renderPreviousButton={(previousItem, defaultClass) => (
   *     <button onClick={previousItem} className={defaultClass}>
   *       previous
   *     </button>
   *   )}
   * >
   *   ...
   * </Carousel>
   */
  renderPreviousButton?: (
    previousItem: () => void,
    defaultClass?: string
  ) => JSX.Element;

  /**
   * Render custom next button
   * @param nextItem function to navigate to next item
   * @param defaultClass default class for the button, it contain styles to position the button correctly. (not the arrow icon)
   * @example
   * <Carousel
   *   renderNextButton={(nextItem, defaultClass) => (
   *     <button onClick={nextItem} className={defaultClass}>
   *       next
   *     </button>
   *   )}
   * >
   *   ...
   * </Carousel>
   */
  renderNextButton?: (
    nextItem: () => void,
    defaultClassName?: string
  ) => JSX.Element;

  /**
   * additional className for container element
   */
  containerClassName?: string;

  /**
   * props for container element, be aware that if you supply className props here, it will overwrite the default one
   */
  containerProps?: React.HTMLProps<HTMLDivElement>;

  /**
   * additional className for wrapper element
   */
  wrapperClassName?: string;

  /**
   * props for wrapper element, be aware that if you supply className props here, it will overwrite the default one
   */
  wrapperProps?: React.HTMLProps<HTMLDivElement>;

  /**
   * additional className for content wrapper element
   */
  contentWrapperClassName?: string;

  /**
   * props for content wrapper element, be aware that if you supply className props here, it will overwrite the default one
   */
  contentWrapperProps?: React.HTMLProps<HTMLDivElement>;

  /**
   * additional className for content element
   */
  contentClassName?: string;

  /**
   * props for content element, be aware that if you supply className props here, it will overwrite the default one
   */
  contentProps?: React.HTMLProps<HTMLDivElement>;

  /**
   * Classname for indicator container
   */
  indicatorContainerClassName?: string;

  /**
   * props for indicator container element, be aware that if you supply className and ref props here, it will overwrite the default one
   */
  indicatorContainerProps?: React.HTMLProps<HTMLDivElement>;

  /**
   * className for each classes in the indicator,
   * active: current item,
   * close: item that close with current item,
   * far: item that far from current item
   */
  // indicatorClassNames?: {
  //   active?: string;
  //   close?: string;
  //   far?: string;
  // };

  /**
   * Render custom dot element
   * @param index dot's index
   * @param defaultClassName default class for the dot element, it contain styles to display the dot correctly
   * @example
   * <Carousel
   *   renderDot={(index, defaultClassName) => (
   *     // data-index is required for scrolling purposes
   *     <div key={index} data-index={index} className={defaultClassName} />
   *   )}
   * >
   *   ...
   * </Carousel>
   */
  // renderDot?: (index: number, defaultClassName: string) => JSX.Element;
}

const CarouselStyles = styled.div`
  --carousel-item-width: 100%;

  width: 100%;

  .carousel-container {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .carousel-wrapper {
    display: flex;
    width: 100%;
    position: relative;
  }

  .carousel-content-wrapper {
    width: 100%;
    height: 100%;
  }

  .carousel-content {
    display: flex;
    transition: var(--transition);
    transition-duration: 0.5s;
    -ms-overflow-style: none; // hide scrollbar in IE and Edge
    scrollbar-width: none; // hide scrollbar in Firefox

    &::-webkit-scrollbar {
      display: none; // hide scrollbar in webkit browser
    }
    > * {
      flex: 0 0 var(--carousel-item-width);
      max-width: var(--carousel-item-width);
    }

    &.show-0 {
      display: flex;
      flex-flow: wrap;
      transition: none !important;
    }

    &.show-2 > * {
      --carousel-item-width: 50%;
    }

    &.show-3 > * {
      --carousel-item-width: 33.333%;
    }

    &.show-4 > * {
      --carousel-item-width: 25%;
    }

    &.show-5 > * {
      --carousel-item-width: 20%;
    }
  }

  .arrow-wrapper {
    position: absolute;
    top: 0;
    width: 4rem;
    height: 100%;
    z-index: 1;

    @media ${breakpoints.laptop} {
      width: 5rem;
    }

    @media ${breakpoints.desktop} {
      width: 6rem;
    }

    &--next {
      right: 0;

      @media ${breakpoints.laptop} {
        background: var(--offwhite);
        background: linear-gradient(
          90deg,
          rgba(var(--offwhite-rgb), 0) 0%,
          rgba(var(--offwhite-rgb), 0.7) 30%,
          rgba(var(--offwhite-rgb), 1) 70%
        );
      }
    }

    &--prev {
      left: 0;

      @media ${breakpoints.laptop} {
        background: var(--offwhite);
        background: linear-gradient(
          -90deg,
          rgba(var(--offwhite-rgb), 0) 0%,
          rgba(var(--offwhite-rgb), 0.7) 30%,
          rgba(var(--offwhite-rgb), 1) 70%
        );
      }
    }
  }

  .left-arrow-button,
  .right-arrow-button {
    position: absolute;
    z-index: 1;
    top: 50%;
    padding: 0.5rem 0.5rem;
    color: var(--color-p);
    transform: translate(0, -50%);
    transition: color var(--transition);
    background-color: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;

    @media ${breakpoints.laptop} {
      box-shadow: none;
      background: none;
    }

    &:hover {
      color: var(--color-accent);

      &::before {
        @media ${breakpoints.laptop} {
          opacity: 0.8;
        }
      }
    }

    svg {
      display: block;
      height: auto;
      width: 1.5rem;

      @media ${breakpoints.laptop} {
        width: 2.5rem;
      }
    }

    &::before {
      content: '';
      z-index: -1;
      background-color: var(--offwhite);
      transition: opacity var(--transition);
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  .left-arrow-button {
    left: 0;
    @media ${breakpoints.laptop} {
      width: 100%;
      height: 100%;
    }
  }
  .right-arrow-button {
    right: 0;
    @media ${breakpoints.laptop} {
      width: 100%;
      height: 100%;
    }
  }

  @media (hover: none) and (pointer: coarse) {
    .arrow-wrapper {
      display: none;
    }
  }
`;

function Carousel({
  children,
  show,
  infiniteLoop,
  autoPlay,
  // withIndicator,
  renderPreviousButton,
  renderNextButton,
  containerClassName,
  wrapperClassName,
  contentWrapperClassName,
  contentClassName,
  containerProps,
  wrapperProps,
  contentWrapperProps,
  // indicatorContainerClassName,
  // indicatorContainerProps,
  // indicatorClassNames,
  contentProps,
}: ICarouselProps): JSX.Element {
  // const indicatorContainerRef = React.useRef<HTMLDivElement>(null);

  /**
   * Total item
   */
  const length = React.useMemo(() => Children.count(children), [children]);

  /**
   * Is the carousel repeating its item
   */
  const isRepeating = React.useMemo(
    () => infiniteLoop && Children.count(children) > show,
    [children, infiniteLoop, show]
  );

  /**
   * Current Index Item of the Carousel
   */
  const [currentIndex, setCurrentIndex] = React.useState<number>(
    isRepeating ? show : 0
  );

  /**
   * Is the carousel's transition enabled
   */
  const [isTransitionEnabled, setTransitionEnabled] =
    React.useState<boolean>(true);

  /**
   * Is the carousel transitioning?
   */
  const [isTransitioning, _setTransitioning] = React.useState<boolean>(false);
  const isTransitioningRef = React.useRef(isTransitioning);
  const setTransitioning = (data: boolean) => {
    isTransitioningRef.current = data;
    _setTransitioning(data);
  };

  /**
   * First touch position to be used in calculation for the swipe speed
   */
  const [touchPosition, setTouchPosition] = React.useState<null | number>(null);

  /**
   * Handle if the carousel is repeating
   * and the currentIndex have been set to the last or first item
   */
  React.useEffect(() => {
    if (isRepeating) {
      if (currentIndex === show || currentIndex === length) {
        setTransitionEnabled(true);
      }
    }
  }, [currentIndex, isRepeating, show, length]);

  // React.useEffect(() => {
  //   if (withIndicator) {
  //     const active =
  //       indicatorContainerRef.current?.querySelector('.dots-active');
  //     if (active) {
  //       const index = active.getAttribute('data-index');
  //       if (index !== null && indicatorContainerRef.current?.scrollTo) {
  //         indicatorContainerRef.current?.scrollTo({
  //           left: ((Number(index) - 2) / 5) * 50,
  //           behavior: 'smooth',
  //         });
  //       }
  //     }
  //   }
  // }, [withIndicator, currentIndex]);

  React.useEffect(() => {
    setCurrentIndex(0);
  }, [show]);

  /**
   * Move forward to the next item
   */
  const nextItem = () => {
    if (isTransitioningRef.current) return;

    if (isRepeating || currentIndex < length - show) {
      setCurrentIndex((prevState) => prevState + 1);
      setTransitioning(true);
    }
  };

  /**
   * Move backward to the previous item
   */
  const previousItem = () => {
    if (isTransitioningRef.current) return;

    if (isRepeating || currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
      setTransitioning(true);
    }
  };

  /**
   * Handle autoPlay
   */
  React.useEffect(() => {
    if (autoPlay) {
      const timer1 = setTimeout(() => {
        nextItem();
      }, 8000);

      return () => {
        clearTimeout(timer1);
      };
    }
  }, [currentIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Handle when the user start the swipe gesture
   * @param e TouchEvent
   */
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    // Proceed only if carousel is active
    if (!show) {
      return;
    }

    // Save the first position of the touch
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  /**
   * Handle when the user move the finger in swipe gesture
   * @param e TouchEvent
   */
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    // Proceed only if carousel is active
    if (!show) {
      return;
    }

    // Get initial location
    const touchDown = touchPosition;

    // Proceed only if the initial position is not null
    if (touchDown === null) {
      return;
    }

    // Get current position
    const currentTouch = e.touches[0].clientX;

    // Get the difference between previous and current position
    const diff = touchDown - currentTouch;

    // Go to next item
    if (diff > 5) {
      nextItem();
    }

    // Go to previous item
    if (diff < -5) {
      previousItem();
    }

    // Reset initial touch position
    setTouchPosition(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      nextItem();
    }

    if (e.key === 'ArrowLeft') {
      previousItem();
    }
  };

  /**
   * Handle when carousel transition's ended
   */
  const handleTransitionEnd = () => {
    setTransitioning(false);

    // Proceed only if carousel is active
    if (!show) {
      return;
    }

    if (isRepeating) {
      if (currentIndex === 0) {
        setTransitionEnabled(false);
        setCurrentIndex(length);
      } else if (currentIndex === length + show) {
        setTransitionEnabled(false);
        setCurrentIndex(show);
      }
    }
  };

  /**
   * Render previous items before the first item
   */
  const extraPreviousItems = React.useMemo(() => {
    const output = [];
    for (let index = 0; index < show; index += 1) {
      output.push(Children.toArray(children)[length - 1 - index]);
    }
    output.reverse();
    return output;
  }, [children, length, show]);

  /**
   * Render next items after the last item
   */
  const extraNextItems = React.useMemo(() => {
    const output = [];
    for (let index = 0; index < show; index += 1) {
      output.push(Children.toArray(children)[index]);
    }
    return output;
  }, [children, show]);

  // const renderDots = React.useMemo(() => {
  //   const output = [];

  //   const localShow = isRepeating ? show : 0;
  //   const localLength = isRepeating ? length : Math.ceil(length / show);
  //   const calculatedActiveIndex =
  //     currentIndex - localShow < 0
  //       ? length + (currentIndex - localShow)
  //       : currentIndex - localShow;

  //   for (let index = 0; index < localLength; index += 1) {
  //     let className = '';
  //     if (calculatedActiveIndex === index) {
  //       className = indicatorClassNames?.active || 'dots-active';
  //     } else if (calculatedActiveIndex === 0) {
  //       if (calculatedActiveIndex + index <= 2) {
  //         className = indicatorClassNames?.close || 'dots-close';
  //       } else {
  //         className = indicatorClassNames?.far || 'dots-far';
  //       }
  //     } else if (calculatedActiveIndex === localLength - 1) {
  //       if (Math.abs(calculatedActiveIndex - index) <= 2) {
  //         className = indicatorClassNames?.close || 'dots-close';
  //       } else {
  //         className = indicatorClassNames?.far || 'dots-far';
  //       }
  //     } else if (Math.abs(calculatedActiveIndex - index) === 1) {
  //       className = indicatorClassNames?.close || 'dots-close';
  //     } else {
  //       className = indicatorClassNames?.far || 'dots-far';
  //     }
  //     output.push(<div key={index} data-index={index} className={className} />);
  //   }

  //   return output;
  // }, [currentIndex, indicatorClassNames, isRepeating, length, show]);

  React.useEffect(() => {
    const items = document.querySelectorAll('.carousel-content > *');
    items.forEach((item, i) => {
      if (i >= currentIndex && i < currentIndex + show) {
        item.removeAttribute('aria-hidden');
        item
          .querySelectorAll('a')
          ?.forEach((link) => link.removeAttribute('tabindex'));
      } else {
        item.setAttribute('aria-hidden', 'true');
        item
          .querySelectorAll('a')
          ?.forEach((link) => link.setAttribute('tabindex', '-1'));
      }
    });
  }, [currentIndex, show]);

  return (
    <CarouselStyles>
      {(show &&
        (isRepeating || currentIndex > 0) &&
        (renderPreviousButton ? (
          renderPreviousButton(previousItem, 'left-arrow-button')
        ) : (
          <div className="arrow-wrapper arrow-wrapper--prev">
            <button
              type="button"
              onClick={previousItem}
              className="left-arrow-button"
            >
              <VscChevronLeft title="previous slide" />
            </button>
          </div>
        ))) ||
        null}

      {(show &&
        (isRepeating || currentIndex < length - show) &&
        (renderNextButton ? (
          renderNextButton(nextItem, 'right-arrow-button')
        ) : (
          <div className="arrow-wrapper arrow-wrapper--next">
            <button
              type="button"
              onClick={nextItem}
              className="right-arrow-button"
            >
              <VscChevronRight title="next slide" />
            </button>
          </div>
        ))) ||
        null}

      <div
        className={`carousel-container ${containerClassName || ''}`}
        onKeyDown={handleKeyDown}
        {...containerProps}
        role="presentation"
      >
        <div
          className={`carousel-wrapper ${wrapperClassName || ''}`}
          {...wrapperProps}
        >
          <div
            className={`carousel-content-wrapper ${
              contentWrapperClassName || ''
            }`}
            {...contentWrapperProps}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            <div
              className={`carousel-content show-${show} ${
                contentClassName || ''
              }`}
              {...contentProps}
              style={{
                transform: show
                  ? `translateX(-${currentIndex * (100 / show)}%)`
                  : ``,
                transition: !isTransitionEnabled ? 'none' : undefined,
              }}
              onTransitionEnd={() => handleTransitionEnd()}
            >
              {length > show && isRepeating && extraPreviousItems}
              {children}
              {length > show && isRepeating && extraNextItems}
            </div>
          </div>
        </div>
        {/* {withIndicator && (
          <div
            data-testid="indicator-container"
            ref={indicatorContainerRef}
            className={`indicator-container ${
              indicatorContainerClassName || ''
            }`}
            {...indicatorContainerProps}
          >
            {renderDots}
          </div>
        )} */}
      </div>
    </CarouselStyles>
  );
}

export default Carousel;
