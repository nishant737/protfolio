// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
  el: document.querySelector('#main'),
  smooth: true
});

// Page load animation
function animatePage() {
  const tl = gsap.timeline();

  tl.from("#nav", {
    y: -10,
    opacity: 0,             // Fixed: should be between 0 and 1
    duration: 1.5,
    ease: "expo.out"
  });

gsap.to(".boundingelem", {
  y: 0,
  ease: "expo.inOut", // Correct easing string
  duration: 2,
  stagger: 0.2
});
}

// Circle mouse follower
function circleMouseFollower() {
  const circle = document.querySelector("#circle");
  if (!circle) return;

  window.addEventListener("mousemove", function (e) {
    circle.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });


}
document.querySelectorAll(".elem").forEach(function (elem) {
  let lastX = 0;

  elem.addEventListener("mousemove", function (details) {
    // Get mouse position relative to the element
    const bounds = elem.getBoundingClientRect();
    const relX = details.clientX - bounds.left;
    const relY = details.clientY - bounds.top;

    // Calculate difference for rotation
    const difr = relX - lastX;
    lastX = relX;

    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: "power1.out",
      top: relY - (elem.querySelector("img").offsetHeight / 2), // Center vertically
      left: relX - (elem.querySelector("img").offsetWidth / 2), // Center horizontally
      rotate: gsap.utils.clamp(-20, 20, difr),
    });
  });

  elem.addEventListener("mouseleave", function () {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
    });
  });
});




// Call functions
circleMouseFollower();
animatePage();
