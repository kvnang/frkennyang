import * as React from "react";
import smoothscroll from "smoothscroll-polyfill";
import debounce from "just-debounce-it";
import { useDraggable } from "react-use-draggable-scroll";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

if (typeof window !== "undefined") {
  smoothscroll.polyfill();
}

export function SlideArrow({
  direction,
  sliderInnerRef,
}: {
  direction: "next" | "prev";
  sliderInnerRef: HTMLUListElement | null;
}) {
  const [disabled, setDisabled] = React.useState(false);

  const updateArrowState = React.useCallback(() => {
    const sliderInner = sliderInnerRef;

    if (!sliderInner) {
      return;
    }

    const { scrollWidth, clientWidth, scrollLeft } = sliderInner;
    const errorMargin = 5; // sometimes clientWidth + scrollLeft won't ever add up to scrollWidth

    const hasNext = scrollWidth - errorMargin > clientWidth + scrollLeft;
    const hasPrev = scrollLeft > 0;

    if (direction === "next") {
      setDisabled(!hasNext);
    }

    if (direction === "prev") {
      setDisabled(!hasPrev);
    }

    sliderInner.classList.remove("is-scrolling-by-click");
  }, [direction, sliderInnerRef]);

  const handleClick = () => {
    const sliderInner = sliderInnerRef;

    if (!sliderInner) {
      return;
    }

    sliderInner.classList.add("is-scrolling-by-click");

    const allSlides = sliderInner.children;

    const currentSlideIndex = Array.from(allSlides).findIndex(
      (el) => el.getBoundingClientRect().left > 0,
    );
    const previousSlideIndex =
      currentSlideIndex === 0 ? allSlides.length - 1 : currentSlideIndex - 1;

    const { scrollLeft } = sliderInner;

    if (direction === "next") {
      sliderInner.scrollTo({
        left: scrollLeft + allSlides[currentSlideIndex].clientWidth,
        behavior: "smooth",
      });
    } else if (direction === "prev") {
      sliderInner.scrollTo({
        left: scrollLeft - allSlides[previousSlideIndex].clientWidth,
        behavior: "smooth",
      });
    }
  };

  const handleWindowResize = debounce(() => updateArrowState(), 500);
  const handleScroll = debounce(() => updateArrowState(), 250);

  React.useEffect(() => {
    const sliderInner = sliderInnerRef;

    sliderInner?.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleWindowResize);

    updateArrowState();

    return () => {
      sliderInner?.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [sliderInnerRef, handleScroll, handleWindowResize, updateArrowState]);

  React.useEffect(() => {
    const sliderInner = sliderInnerRef;

    return () => {
      sliderInner?.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleScroll, handleWindowResize, sliderInnerRef]);

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className="text-[3rem] text-accent inline-flex items-center justify-center disabled:text-body disabled:opacity-25 disabled:pointer-events-none"
      aria-label={direction === "next" ? "Next" : "Previous"}
    >
      {direction === "next" && <ChevronRightIcon />}
      {direction === "prev" && <ChevronLeftIcon />}
    </button>
  );
}

export function Slide({ children }: { children: React.ReactNode }) {
  return (
    <li
      className="slider__slide snap-center"
      style={{
        padding: `0 calc(var(--slider--slide-gap) * 0.5)`,
        width: `var(--slider--slide-width)`,
        minWidth: `var(--slider--slide-width)`,
      }}
    >
      {children}
    </li>
  );
}

export function Slider({
  children,
  setRef,
}: {
  children: React.ReactNode;
  setRef?: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  const { events } = useDraggable(
    ref as React.MutableRefObject<HTMLDivElement>,
  );

  React.useEffect(() => {
    if (ref.current && typeof setRef !== "undefined") {
      setRef(ref.current);
    }
  }, [ref, setRef]);

  return (
    <div className="relative">
      <div
        ref={ref}
        className="relative flex justify-center w-full max-w-full cursor-grab overflow-x-scroll overscroll-x-contain snap-mandatory no-scrollbar"
        {...events}
      >
        <div className="container">
          <div className="grid grid-cols-12 gap-x-4">
            <div className="col-span-full lg:col-span-10 lg:col-start-2">
              <ul
                className="flex items-start"
                style={{
                  margin: "0 calc(var(--slider--slide-gap) * 0.5 * -1)",
                }}
              >
                {React.Children.map(children, (child) => (
                  <Slide>{child}</Slide>
                ))}
                <li
                  className="self-stretch"
                  style={{
                    paddingInlineEnd: `max(var(--slider--slide-gap), (100vw - 100%) / 2 - var(--slider--slide-gap))`,
                  }}
                ></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
