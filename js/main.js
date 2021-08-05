
//slick slider animation properties
$(document).ready(function(){
    $('.product__slider').slick({
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        slidesToShow: 5,
        infinite: true,
        prevArrow:'.arrow_prev',
        nextArrow:".arrow_next",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    })
})

$(document).ready(function(){
    $('.featured__container').slick({
        autoplay: false,
        autoplaySpeed: 5000,
        arrows: true,
        slidesToShow: 1,
        infinite: true,
        prevArrow:'.arrow_prev-2',
        nextArrow:".arrow_next-2"
    })
})


//Scroll Trigger

gsap.registerPlugin(ScrollTrigger);

//LOCOMOTIVE SCROLL
const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".scrollContainer"),
    smooth: true
});

// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".scrollContainer", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".scrollContainer").style.transform ? "transform" : "fixed"
});

if (window.innerWidth > 600) {
    
    function scrollAnimation() {
        gsap.from([".box__left",".box__right"], {
            transform: "translateY(230px)",
            scrollTrigger: {
                trigger: ".section-about",
                start: 'top bottom',
                stop: "bottom bottom",
                scroller: ".scrollContainer",
                scrub: true,
                // markers: true
            }
        })
        
        gsap.from(".box__center", {
            transform: "translateY(-80px)",
            scrollTrigger: {
                trigger: ".section-about",
                start: 'top bottom',
                stop: 'bottom bottom',
                scroller: ".scrollContainer",
                scrub: true
            }
        })
    
        gsap.from(".featured__bg", {
            transform: "translateX(-80px)",
            scrollTrigger: {
                trigger: ".section-featured",
                start: 'top bottom',
                scroller: ".scrollContainer",
                scrub: true,
                // markers: true
            }
        })
    
        gsap.from(".featured__heading", {
            transform: "translateX(40px)",
            opacity: 0,
            scrollTrigger: {
                trigger: ".section-featured",
                start: 'top bottom',
                end: 'bottom bottom-=200',
                scroller: ".scrollContainer",
                scrub: true,
                // markers: true
            }
        })
    
        gsap.from([".featured__paragraph"], {
            transform: "translateX(40px)",
            opacity: 0,
            scrollTrigger: {
                trigger: ".section-featured",
                start: 'top bottom',
                end: 'bottom bottom-=200',
                scroller: ".scrollContainer",
                scrub: true
            }
        })

        gsap.from([".featured__btn"], {
            transform: "translateX(40px)",
            opacity: 0,
            scrollTrigger: {
                trigger: ".section-featured",
                start: 'top bottom',
                end: 'bottom bottom-=200',
                scroller: ".scrollContainer",
                scrub: true
            }
        })
        
        // gsap.from(".recipe__heading", {
        //     transform: "translateX(-100px)",
        //     scrollTrigger: {
        //         trigger: ".section-recipe",
        //         start: 'top bottom',
        //         stop: 'bottom top-=100',
        //         scrub: true
        //     }
        // })
    }
    
    window.addEventListener('load', function(){
        scrollAnimation();
    })
    /* the viewport is less than 768 pixels wide */
    $('.slider').slick();
  } 


  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();