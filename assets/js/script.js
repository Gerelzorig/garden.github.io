$(document).ready(function () {
  var mySwiper = new Swiper(".swiper", {
    loop: false, // Enable loop mode
    pagination: {
      el: ".swiper-pagination", // Add pagination bullets
    },
    navigation: {
      nextEl: ".swiper-button-next", // Add this line
      prevEl: ".swiper-button-prev", // Add this line
    },
  });

  const classesToObserve = [".fade-in", ".fade-in-left", ".fade-in-right"];

  const observers = [];

  const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if ($(entry.target).hasClass("fade-in")) {
          anime({
            targets: entry.target,
            opacity: 1,
            translateY: 0,
            duration: 1000,
            easing: "easeInOutQuad",
          });
        } else if ($(entry.target).hasClass("fade-in-left")) {
          anime({
            targets: entry.target,
            keyframes: [
              {
                opacity: 0,
                translateX: -100,
              },
              {
                opacity: 1,
                translateX: 0,
              },
            ],
            duration: 1000,
            easing: "easeInOutQuad",
          });
        } else {
          anime({
            targets: entry.target,
            keyframes: [
              {
                opacity: 0,
                translateX: 100,
              },
              {
                opacity: 1,
                translateX: 0,
              },
            ],
            duration: 1000,
            easing: "easeInOutQuad",
          });
        }

        observer.unobserve(entry.target);
      }
    });
  };

  // Create an observer for each class
  classesToObserve.forEach((className) => {
    const elements = document.querySelectorAll(className);

    if (elements.length > 0) {
      const observer = new IntersectionObserver(handleIntersection, {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      });

      elements.forEach((element) => {
        observer.observe(element);
      });

      observers.push(observer);
    }
  });
});
