import { useEffect, useRef, RefObject } from "react";

type IntersectionCallback = (
  entry: IntersectionObserverEntry,
  observer: IntersectionObserver
) => void;

interface IntersectionOptions extends IntersectionObserverInit {
  root?: Element | null;
  threshold?: number | number[];
  rootMargin?: string;
}

const useIntersect = (
  onIntersect: IntersectionCallback,
  option: IntersectionOptions = {}
): RefObject<HTMLDivElement> => {
  const ref = useRef<HTMLDivElement>(null);

  const checkIntersect: IntersectionObserverCallback = ([entry], observer) => {
    if (entry.isIntersecting) {
      onIntersect(entry, observer);
    }
  };

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    let observer: IntersectionObserver | undefined;
    if (ref) {
      observer = new IntersectionObserver(checkIntersect, {
        root: null,
        threshold: 0,
        rootMargin: "0px",
        ...option,
      });
      observer.observe(currentRef);
    }
    return () => observer && observer.disconnect();
  }, [ref, option, checkIntersect]);

  return ref;
};

export default useIntersect;
