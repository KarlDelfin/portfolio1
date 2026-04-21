/* Encoding is important!!!
//--------------------------------
// ffmpeg settings used:
//--------------------------------

ffmpeg -i part1b.mp4 -vf scale=1920:-1 -movflags faststart -vcodec libx264 -crf 20 -g 1 -pix_fmt yuv420p output.mp4

// scale filtergraph optional
// ffmpeg docs: http://ffmpeg.org/ffmpeg.html

*/
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrambleTextPlugin);

/* HERO */
const coolVideo = document.querySelector(".hero_con video");

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero_con",
    pin: true,
    scrub: 2,
    start: "center center",
    end: "+=1000",
    pinSpacing: false
  }
});

// wait until video metadata is loaded, so we can grab the proper duration before adding the onscroll animation. Might need to add a loader for loonng videos

// Dealing with devices
function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}
if (isTouchDevice()) {
  coolVideo.play();
  coolVideo.pause();
}

function init() {
  coolVideo.src = "../assets/video/glass.mp4";
  coolVideo.onloadedmetadata = function (e) {
    coolVideo.pause();
    tl.to(coolVideo, { currentTime: coolVideo.duration });
  };
}

document.addEventListener("DOMContentLoaded", init, false);

gsap.from('.hero_info', {
  opacity: 0,
  scrollTrigger: {
    trigger: '.hero_info',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 5,
  }
})

/* MAIN */
gsap.from('#main h1', {
  y: 100,
  opacity: 1,
  scrollTrigger: {
    trigger: '#main h1',
    start: 'top bottom',
    scrub: 1,
  }
})
gsap.from('.main1_con img', {
  x: -1750,
  clipPath: 'inset(0% 50% 0% 0% round 30px)',
  scrollTrigger: {
    trigger: '.main1_con',
    start: 'top center',
    scrub: 1,
  }
})


gsap.to('.main1_con p', {
  x: 1750,
  scrollTrigger: {
    trigger: '.main1_con p',
    start: 'top bottom',
    scrub: 1,
  }
})

gsap.from('.main2_con img', {
  x: 1750,
  clipPath: 'inset(0% 0% 0% 50% round 30px)',
  scrollTrigger: {
    trigger: '.main2_con',
    start: 'top center',
    scrub: 1,
  }
})

let split1 = SplitText.create(".main1_con p", { type: "chars" });
gsap.from(split1.chars, {
  y: 20,
  autoAlpha: 0,
  stagger: 0.05,
  scrollTrigger: {
    trigger: '.main1_con p',
  }
});

let split2 = SplitText.create(".main2_con p", { type: "chars" });
gsap.from(split2.chars, {
  y: 20,
  autoAlpha: 0,
  stagger: 0.05,
  scrollTrigger: {
    trigger: '.main2_con p',
  }
});

gsap.to('.main2_con p', {
  x: -1750,
  y: -100,
  scrollTrigger: {
    trigger: '.main2_con p',
    start: 'top bottom',
    scrub: 1,
  }
})

gsap.to("[class^='sparkle']", {
  y: 'random(-25, -50)',
  scrollTrigger: {
    scrub: 1
  }
})

/* BOTTOM */
let images = gsap.utils.toArray('.bottom_images img');
images.forEach(image => {
  gsap.to(image, {
    yPercent: -100 * image.dataset.speed,
    scrollTrigger: {
      trigger: '.bottom_images img',
      scrub: image.dataset.speed,
    }
  })
})

gsap.to('.bottom_info h2', {
  backgroundPositionX: "0%",
  stagger: 1,
  scrollTrigger: {
    trigger: ".bottom_info h2",
    scrub: 1,
    start: "top bottom",
  }
})



/* LENIS SCROLL */
const lenis = new Lenis({
  autoRaf: true,
});