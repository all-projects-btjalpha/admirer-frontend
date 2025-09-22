import { useLocation } from 'react-router-dom';
import { useLayoutEffect, useEffect } from 'react';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  // Disable browser scroll restore
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    return () => {
      window.history.scrollRestoration = 'auto';
    };
  }, []);

  useLayoutEffect(() => {
    const skipScrollRestore = sessionStorage.getItem("listingScrollY");

    // If scroll position is saved, let the page handle it
    if (pathname.includes("/listing") && skipScrollRestore) {
      return;
    }

    // Default: scroll to top
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
