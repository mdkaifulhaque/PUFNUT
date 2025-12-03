document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const aside = document.querySelector('aside');
    
    if (!menuToggle || !aside) return;

    let menuStatus = false;

    const menuTL = gsap.timeline({ 
        defaults: { 
            duration: 0.3,
            ease: 'power4.inOut'
        }
    });

    menuTL
        .to(aside, {
            x: '0%' // Slide in from right (0% means back to natural position from translateX(100%))
        })
        .from('aside ul li a', {
            xPercent: 100, // Match the animation style from After/menu.html
            opacity: 0,
            stagger: 0.1
        }, "-=0.2"); // Overlap slightly with the slide-in

    menuTL.paused(true);

    menuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        if (!menuStatus) {
            menuTL.play();
            menuStatus = true;
        } else {
            menuTL.reverse();
            menuStatus = false;
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (menuStatus && !aside.contains(e.target) && !menuToggle.contains(e.target)) {
            menuTL.reverse();
            menuStatus = false;
        }
    });
});
