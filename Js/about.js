gsap.registerPlugin(ScrollTrigger);

/* NAVBAR */
gsap.to(".nav", {
    opacity: 1,
    y: 0,
    duration: 1
});

/* HERO TEXT ANIMATIONS */
gsap.to(".px-title", {
    opacity: 1,
    y: 0,
    duration: 1.3,
    ease: "power3.out"
});

gsap.to(".px-sub", {
    opacity: 1,
    y: 0,
    duration: 1.1,
    delay: 0.25
});

/* HERO PARAGRAPHS */
gsap.utils.toArray(".px-paragraphs p").forEach((p, i) => {
    gsap.to(p, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5 + i * 0.2
    });
});

/* FLOATING HERO IMAGE */
gsap.to(".hero-floating-img", {
    opacity: 1,
    y: 0,
    duration: 1.4,
    delay: 0.6,
    ease: "power3.out"
});

/* IMAGE STRIP SECTION */
gsap.utils.toArray(".wide-img").forEach((img, i) => {
    gsap.to(img, {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        delay: 0.2 + i * 0.2,
        scrollTrigger: {
            trigger: img,
            start: "top 90%",
            end: "top 40%",
            scrub: true
        }
    });
});

/* VALUES HEADER ANIMATION */
gsap.to(".values-title", {
    scrollTrigger: {
        trigger: ".values-header",
        start: "top 80%",
    },
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out"
});

gsap.to(".values-subtitle", {
    scrollTrigger: {
        trigger: ".values-header",
        start: "top 80%",
    },
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.2,
    ease: "power3.out"
});

/* ===== SCROLL TEXT ANIMATION ===== */
gsap.utils.toArray(".scroll-item").forEach((line) => {
    ScrollTrigger.create({
        trigger: line,
        start: "top 75%", /* Trigger earlier */
        end: "top 25%",
        onEnter: () => line.classList.add("active"),
        onLeave: () => line.classList.remove("active"), /* Fade out when scrolling past */
        onEnterBack: () => line.classList.add("active"),
        onLeaveBack: () => line.classList.remove("active")
    });
});

/* PROCESS TIMELINE ANIMATION */
// Animate the line drawing down
gsap.to(".timeline-line::after", {
    height: "100%",
    scrollTrigger: {
        trigger: ".timeline-container",
        start: "top 60%",
        end: "bottom 80%",
        scrub: 1,
    }
});

// Animate each timeline item
gsap.utils.toArray(".timeline-item").forEach((item, i) => {
    gsap.to(item, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse"
        }
    });
});

/* AVAILABILITY MARQUEE ANIMATION */
gsap.to(".marquee-content h1", {
    xPercent: -25, /* Move less drastically since text is longer */
    ease: "none",
    scrollTrigger: {
        trigger: ".availability-marquee",
        start: "top bottom",
        end: "bottom top",
        scrub: 2, /* Slower, smoother scrub */
    }
});
