(function () {
  "use strict";

  window.addEventListener('load', function () {
    AOS.init({
      anchorPlacement: 'top-left',
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
      disable: 'mobile'
    });
  });

  /* Navbar shadow + scroll-to-top on scroll */
  var navbar   = document.getElementById('header-nav');
  var body     = document.getElementsByTagName("body")[0];
  var scrollTop = document.getElementById('scrolltop');

  window.onscroll = function () {
    if (window.scrollY > 0) {
      navbar.classList.add('fixed-top', 'shadow-sm');
      body.style.paddingTop = navbar.offsetHeight + "px";
      scrollTop.style.visibility = "visible";
      scrollTop.style.opacity    = 1;
    } else {
      navbar.classList.remove('fixed-top', 'shadow-sm');
      body.style.paddingTop      = "0px";
      scrollTop.style.visibility = "hidden";
      scrollTop.style.opacity    = 0;
    }
  };

})();
