
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrambleTextPlugin);
gsap.registerPlugin(SplitText);

/* LENIS SCROLL */
let lenis = new Lenis()
gsap.ticker.add((time)=>{ lenis.raf(time * 400) })
gsap.ticker.lagSmoothing(0)

// let splitLines = new SplitText('.header_info h2 span', { type: "lines" });
let splitWords = new SplitText('.header_info h2 span', { type: "words" });
// let splitChars = new SplitText('.header_info h2 span', { type: "chars" });

/* LINES *
// gsap.from(splitLines.lines, {
//   y: 100,
//   opacity: 0,
//   duration: 0.8,
//   ease: "power4.out",
//   stagger: 0.1
// });

/* WORDS */
gsap.from(splitWords.words, {
  y: 50,
  opacity: 0,
  duration: 0.6,
  ease: "power3.out",
  stagger: 0.05
});

/* CHARACTERS */
// gsap.from(splitChars.chars, {
//   x: 20,
//   y: 20,
//   opacity: 0,
//   duration: 0.4,
//   ease: "power2.out",
//   stagger: 0.03
// });

/* HERO */
console.clear();

let canvas = document.querySelector(".hero_con canvas");
let context = canvas.getContext("2d");

canvas.width = 1920;
canvas.height = 1080;

let frameCount = 157;
let currentFrame = (index) =>
  `./assets/image/frames/${( index + 1 ).toString().padStart(3, "0")}.webp`;

let frameImages = [];
let fruits = {
  frame: 0
};

for (let i = 0; i < frameCount; i++) {
  let img = new Image();
  img.src = currentFrame(i);
  frameImages.push(img);
}

gsap.to(fruits, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    trigger: ".hero_con",
    start: "top top",
    end: "+=2000",
    pin: true,
    pinSpacing: false,
    scrub: 0.5
  },
  onUpdate: render // use animation onUpdate instead of scrollTrigger's onUpdate
});

frameImages[0].onload = render;

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(frameImages[fruits.frame], 0, 0);
}

/* Encoding is important!!!
//--------------------------------
// ffmpeg settings used:
//--------------------------------

ffmpeg -i part1b.mp4 -vf scale=1920:-1 -movflags faststart -vcodec libx264 -crf 20 -g 1 -pix_fmt yuv420p output.mp4

// scale filtergraph optional
// ffmpeg docs: http://ffmpeg.org/ffmpeg.html

*/

// let coolVideo = document.querySelector(".hero_con video");

// let tl = gsap.timeline({
//   filter: 'blur(5px)',
//   scrollTrigger: {
//     trigger: ".hero_con",
//     pin: true,
//     scrub: 2,
//     start: "center center",
//     end: "+=1000",
//     pinSpacing: false
//   }
// });

// wait until video metadata is loaded, so we can grab the proper duration before adding the onscroll animation. Might need to add a loader for loonng videos

// Dealing with devices
// function isTouchDevice() {
//   return (
//     "ontouchstart" in window ||
//     navigator.maxTouchPoints > 0 ||
//     navigator.msMaxTouchPoints > 0
//   );
// }
// if (isTouchDevice()) {
//   coolVideo.play();
//   coolVideo.pause();
// }

// function init() {
//   coolVideo.src = "./assets/video/glass.mp4";
//   coolVideo.onloadedmetadata = function (e) {
//     coolVideo.pause();
//     tl.to(coolVideo, { currentTime: coolVideo.duration });
//   };
// }

// document.addEventListener("DOMContentLoaded", init, false);

gsap.from('.hero_info', {
  opacity: 0,
  scrollTrigger: {
    trigger: '.hero_con canvas',
    start: 'top top',
    scrub: 5,
    
  }
})

/* MAIN */
let images = gsap.utils.toArray('.main_images img');
images.forEach(image => {
  gsap.to(image, {
    yPercent: -100 * image.dataset.speed,
    scrollTrigger: {
      trigger: '.main_images img',
      scrub: image.dataset.speed,
    }
  })
})

gsap.to('.main_info h2', {
  backgroundPositionX: "0%",
  stagger: 1,
  scrollTrigger: {
    trigger: "#main",
    scrub: 1,
    start: "top 20%",
    end: "bottom center",
   }
})

let bottomFooters = gsap.utils.toArray('.main_footer p');
gsap.to(bottomFooters, {
  color: '#fff',
  stagger: 1,
  duration: 3,
  scrollTrigger: {
    trigger: '.main_footer p',
    scrub: 1
  }
});

/* BOTTOM */
let bottomHeading = new SplitText('#bottom h2', { type: "chars" });
gsap.from(bottomHeading.chars, {
  x: 50,
  y: 30,
  opacity: 0,
  duration: 0.6,
  ease: "power3.out",
  stagger: {
    each: 0.03,
    from: "start" // "start", "end", "edges", "center", "random" or index number
  },
  scrollTrigger: {
    trigger: '#bottom h2',
    start: 'top center',
    end: 'bottom center',
    scrub: 1,
  }
})

gsap.from('#bottom h2', {
  y: 100,
  opacity: 1,
  scrollTrigger: {
    trigger: '#bottom h2',
    start: 'top bottom',
    scrub: 1,
  }
})

document.querySelectorAll('.bottom_con').forEach((section, i) => {
  gsap.from(section.querySelector('img'), {
    x: i % 2 === 0 ? -1500 : 1500,
    clipPath: `inset(0% ${i % 2 === 0 ? '50%' : '0%'} 0% ${i % 2 === 0 ? '0%' : '50%'} round 30px)`,
    scrollTrigger: {
      trigger: section,
      start: 'top bottom', 
      end: "bottom bottom",
      scrub: 1, 
    }
  })

  gsap.fromTo(section.querySelector('.bottom_info'),
    {
      filter: 'blur(5px)',
      x: i % 2 === 0 ? -1500 : 1500,
    }, 
    {
    filter: 'blur(0px)',
     x: 0,
    scrollTrigger: {
      trigger: section,
      start: 'top center', 
      end: "bottom center",
      scrub: true, 
    }
  })
})

/* FOOTER */
gsap.to('#footer', {
  clipPath: 'inset(4% 1% 4% round 50px)',
  scrollTrigger: {
    trigger: '#footer',
    scrub: 1,
    start: 'top bottom',
    end: 'bottom center',
  }
});

gsap.from('.footer_image', {
  backgroundPosition: 'center bottom -100%',
  backgroundAttachment: 'fixed',
  scrollTrigger: {
    trigger: '#footer',
    scrub: 1,
    start: 'top bottom',
  }
})

/* MATCH MEDIA */
let mm = gsap.matchMedia();

mm.add("(max-width: 1010px)", () => {
  
});

mm.add("(max-width: 800px)", () => {

});

mm.add("(max-width: 600px)", () => {
  
});