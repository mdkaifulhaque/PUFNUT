function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function loaderAnimation() {
  const progress = document.getElementsByClassName("progress");
  const heading = document.getElementsByTagName("h1");

  gsap.to(progress, {
    width: "100%",
    duration: 2,
    ease: "power4.out",
  });

  gsap.from(heading, {
    y: -300,
    duration: 2,
    ease: "elastic.out(1,0.3)",
  });

  gsap.to(progress, {
    height: "100%",
    top: 0,
    delay: 2,
    onComplete: () => {
      document.getElementById("loader").style.display = "none";
      heroAnimation(); 
    },
  });
}

function heroAnimation() {
  var tl = gsap.timeline();

  tl.from("#nav h3", {
    y: -50,
    opacity: 0,
    delay: 0.4,
    duration: 0.7,
    stagger: 0.3,
  });

  tl.from("#page1 h1", {
    x: -500,
    opacity: 0,
    duration: 0.8,
    stagger: 0.3,
  });

  tl.from("#page1 > img", {
    x: 100,
    rotate: 45,
    opacity: 0,
    duration: 0.5,
    stagger: 0.5,
  });

  tl.from(".button", {
    y: 50,
    opacity: 0,
    duration: 0.7,
    stagger: 0.3,
  });
}
function cursorAnimation() {
  Shery.mouseFollower({
    skew: true,
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
  });
  Shery.makeMagnet("#nav-part2 h4");

  var videoContainer = document.querySelector("#video-container");
  var video = document.querySelector("#video-container video");
  videoContainer.addEventListener("mouseenter", function () {
    videoContainer.addEventListener("mousemove", function (dets) {
      gsap.to(".mousefollower", {
        opacity: 0,
      });
      gsap.to("#video-cursor", {
        left: dets.x - 570,
        y: dets.y - 300,
      });
    });
  });
  videoContainer.addEventListener("mouseleave", function () {
    gsap.to(".mousefollower", {
      opacity: 1,
    });
    gsap.to("#video-cursor", {
      left: "70%",
      top: "-15%",
    });
  });

  var flag = 0;
  videoContainer.addEventListener("click", function () {
    if (flag == 0) {
      video.play();
      video.style.opacity = 1;
      document.querySelector(
        "#video-cursor"
      ).innerHTML = `<i class="ri-pause-mini-fill"></i>`;
      gsap.to("#video-cursor", {
        scale: 0.5,
      });
      flag = 1;
    } else {
      video.pause();
      video.style.opacity = 0;
      document.querySelector(
        "#video-cursor"
      ).innerHTML = `<i class="ri-play-mini-fill"></i>`;
      gsap.to("#video-cursor", {
        scale: 1,
      });
      flag = 0;
    }
  });
}

function capsuleButton() {
  const capsules = document.querySelectorAll(".capsule");
  capsules.forEach((capsule) => {
    const fullWidth = capsule.querySelector(".fullWidth");
    if (fullWidth) {
      capsule.addEventListener("mouseenter", () => {
        gsap.to(fullWidth, {
          duration: 0.5,
          width: "100%",
          ease: "power1.out",
        });
      });
      capsule.addEventListener("mouseleave", () => {
        gsap.to(fullWidth, {
          duration: 0.5,
          width: "0%",
          ease: "power1.in",
        });
      });
    }
  });
}

function sheryAnimation() {
  Shery.imageEffect(".image-div", {
    style: 5,
    gooey: true,
    // debug:true,
    config: {
      a: { value: 2, range: [0, 30] },
      b: { value: 0.75, range: [-1, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.7241195453907675 },
      gooey: { value: true },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.23, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 0 },
      noise_speed: { value: 0.5, range: [0, 10] },
      metaball: { value: 0.33, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0.01, range: [0, 0.1] },
      noise_height: { value: 0.5, range: [0, 2] },
      noise_scale: { value: 10, range: [0, 100] },
    },
  });
}

function reviewAnimation() {
gsap.registerPlugin(ScrollTrigger);

const slideWrappers = gsap.utils.toArray(".Content__wrapper");
const slides = gsap.utils.toArray(".Content__slide");

let mm = gsap.matchMedia();

mm.add("(min-width: 1200px) and (prefers-reduced-motion: no-preference)", () => {
  slideWrappers.forEach((wrapper, i) => {
    const card = slides[i];

    let scale = 1;
    let rotationZ = 0;
    let rotationX = 0;

    if (i !== slides.length - 1) {
      scale = 0.4 + 0.025 * i;
      rotationZ = 5;
      rotationX = 40;
    }

    gsap.to(card, {
      scale,
      rotationX,
      rotationZ,
      transformOrigin: "50% center",
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        scroller: "#main",
        start: "top top",
        end: "bottom bottom",
        endTrigger: slides[slides.length - 1],
        scrub: 1,
        pin: wrapper,
        pinSpacing: false,
        id: i + 1
      }
    });
  });
});
 ScrollTrigger.refresh();
}
locomotiveAnimation();
loaderAnimation();
cursorAnimation();
capsuleButton();
sheryAnimation();
reviewAnimation();