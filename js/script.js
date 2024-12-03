//MorphSVGPlugin.convertToPath('polygon');
function initSnow() {
  var COUNT = 100;
  var masthead = document.querySelector('.sky');
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var width = masthead.clientWidth;
  var height = masthead.clientHeight;
  var i = 0;
  var active = false;

  function onResize() {
    width = masthead.clientWidth;
    height = masthead.clientHeight;
    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = '#FFF';

    var wasActive = active;
    active = width > 100;

    if (!wasActive && active)
      requestAnimFrame(update);
  }

  var Snowflake = function () {
    this.x = 0;
    this.y = 0;
    this.vy = 0;
    this.vx = 0;
    this.r = 0;

    this.reset();
  }

  Snowflake.prototype.reset = function () {
    this.x = Math.random() * width;
    this.y = Math.random() * -height;
    this.vy = 1 + Math.random() * 3;
    this.vx = 0.5 - Math.random();
    this.r = 1 + Math.random() * 2;
    this.o = 0.5 + Math.random() * 0.5;
  }

  canvas.style.position = 'absolute';
  canvas.style.left = canvas.style.top = '0';

  var snowflakes = [], snowflake;
  for (i = 0; i < COUNT; i++) {
    snowflake = new Snowflake();
    snowflake.reset();
    snowflakes.push(snowflake);
  }

  function update() {

    ctx.clearRect(0, 0, width, height);

    if (!active)
      return;

    for (i = 0; i < COUNT; i++) {
      snowflake = snowflakes[i];
      snowflake.y += snowflake.vy;
      snowflake.x += snowflake.vx;

      ctx.globalAlpha = snowflake.o;
      ctx.beginPath();
      ctx.arc(snowflake.x, snowflake.y, snowflake.r, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fill();

      if (snowflake.y > height) {
        snowflake.reset();
      }
    }

    requestAnimFrame(update);
  }

  // shim layer with setTimeout fallback
  window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();

  onResize();
  window.addEventListener('resize', onResize, false);

  masthead.appendChild(canvas);
}

function initTree() {
  var xmlns = "http://www.w3.org/2000/svg",
    xlinkns = "http://www.w3.org/1999/xlink",
    select = function (s) {
      return document.querySelector(s);
    },
    selectAll = function (s) {
      return document.querySelectorAll(s);
    },
    pContainer = select('.pContainer'),
    mainSVG = select('.mainSVG'),
    star = select('#star'),
    sparkle = select('.sparkle'),
    tree = select('#tree'),
    showParticle = true,
    particleColorArray = ['#E8F6F8', '#ACE8F8', '#F6FBFE', '#A2CBDC', '#B74551', '#5DBA72', '#910B28', '#910B28', '#446D39'],
    particleTypeArray = ['#star', '#circ', '#cross', '#heart'],
    particleTypeArray = ['#star'],
    particlePool = [],
    particleCount = 0,
    numParticles = 200


  gsap.set('svg', {
    visibility: 'visible'
  })

  gsap.set(sparkle, {
    transformOrigin: '50% 50%',
    y: -100
  })

  let getSVGPoints = (path) => {

    let arr = []
    var rawPath = MotionPathPlugin.getRawPath(path)[0];
    rawPath.forEach((el, value) => {
      let obj = {}
      obj.x = rawPath[value * 2]
      obj.y = rawPath[(value * 2) + 1]
      if (value % 2) {
        arr.push(obj)
      }
      //console.log(value)
    })

    return arr;
  }
  let treePath = getSVGPoints('.treePath')

  var treeBottomPath = getSVGPoints('.treeBottomPath')

  //console.log(starPath.length)
  var mainTl = gsap.timeline({ delay: 2, repeat: 0 }), starTl;


  //tl.seek(100).timeScale(1.82)

  function flicker(p) {

    //console.log("flivker")
    gsap.killTweensOf(p, { opacity: true });
    gsap.fromTo(p, {
      opacity: 1
    }, {
      duration: 0.07,
      opacity: Math.random(),
      //ease: RoughEase.ease.config({ template: Power0.easeNone, strength: 3, points: 6, taper: "both", randomize: true, clamp: false}),
      repeat: -1
    })
  }

  function createParticles() {

    //var step = numParticles/starPath.length;
    //console.log(starPath.length)
    var i = numParticles, p, particleTl, step = numParticles / treePath.length, pos;
    while (--i > -1) {

      p = select(particleTypeArray[i % particleTypeArray.length]).cloneNode(true);
      mainSVG.appendChild(p);
      p.setAttribute('fill', particleColorArray[i % particleColorArray.length]);
      p.setAttribute('class', "particle");
      particlePool.push(p);
      //hide them initially
      gsap.set(p, {
        x: -100,
        y: -100,
        transformOrigin: '50% 50%'
      })



    }

  }
  function getScale() {
    return gsap.utils.random(0.5, 2);
  }
  function playParticle(p) {
    if (!showParticle) { return };
    var p = particlePool[particleCount]
    gsap.set(p, {
      x: gsap.getProperty('.pContainer', 'x'),
      y: gsap.getProperty('.pContainer', 'y'),
      scale: getScale()
      //}
    }
    );
    var tl = gsap.timeline();
    tl.to(p, {
      duration: gsap.utils.random(0.61, 6),
      //paused:true,
      physics2D: {
        velocity: gsap.utils.random(-13, 16),
        angle: gsap.utils.random(-180, 180),
        gravity: gsap.utils.random(-13, 44)
      },

      scale: 0,
      rotation: gsap.utils.random(-123, 360),
      //skewY:(Math.random() * 180),
      ease: 'power1',
      onStart: flicker,
      onStartParams: [p],
      //repeat:-1,
      onRepeat: function (p) {
        gsap.set(p, {
          scale: getScale()
        })

      },
      onRepeatParams: [p]

    });


    //
    //particlePool[particleCount].play();
    particleCount++;
    //mainTl.add(tl, i / 1.3)
    particleCount = (particleCount >= numParticles) ? 0 : particleCount

  }

  function drawStar() {

    starTl = gsap.timeline({ onUpdate: playParticle })
    starTl.to('.pContainer, .sparkle', {
      duration: 6,
      motionPath: {
        path: '.treePath',
        autoRotate: false
      },
      ease: 'linear'
    })
      .to('.pContainer, .sparkle', {
        duration: 1,
        onStart: function () { showParticle = false },
        x: treeBottomPath[0].x,
        y: treeBottomPath[0].y
      })
      .to('.pContainer, .sparkle', {
        duration: 2,
        onStart: function () { showParticle = true },
        motionPath: {
          path: '.treeBottomPath',
          autoRotate: false
        },
        ease: 'linear'
      }, '-=0')
      .from('.treeBottomMask', {
        duration: 2,
        drawSVG: '0% 0%',
        stroke: '#FFF',
        ease: 'linear'
      }, '-=2')


    //gsap.staggerTo(particlePool, 2, {})

  }


  createParticles();
  drawStar();
  //ScrubGSAPTimeline(mainTl)

  mainTl.from(['.treePathMask', '.treePotMask'], {
    duration: 6,
    drawSVG: '0% 0%',
    stroke: '#FFF',
    stagger: {
      each: 6
    },
    duration: gsap.utils.wrap([6, 1, 2]),
    ease: 'linear'
  })
    .from('.treeStar', {
      duration: 3,
      //skewY:270,
      scaleY: 0,
      scaleX: 0.15,
      transformOrigin: '50% 50%',
      ease: 'elastic(1,0.5)'
    }, '-=4')

    .to('.sparkle', {
      duration: 3,
      opacity: 0,
      ease: "rough({strength: 2, points: 100, template: linear, taper: both, randomize: true, clamp: false})"
    }, '-=0')
    .to('.treeStarOutline', {
      duration: 1,
      opacity: 1,
      ease: "rough({strength: 2, points: 16, template: linear, taper: none, randomize: true, clamp: false})"
    }, '+=1')


  mainTl.add(starTl, 0)
  gsap.globalTimeline.timeScale(1.5);

  // starTl.vars.onComplete = function () {
  //   gsap.to('foreignObject', {
  //     opacity: 1
  //   })
  // }
}

initSnow()
initTree()
