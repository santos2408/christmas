// export default function initTree() {
//   var SwirlNode, Tree, TreeSwirl, height, swirls, width,
//     __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

//   width = 600;
//   height = 450;

//   swirls = [
//     {
//       color: 'gold',
//       nodes: 300,
//       speed: -0.5,
//       radius: 3
//     }, {
//       color: 'green',
//       nodes: 200,
//       speed: 0.5,
//       radius: 1.5
//     }, {
//       color: 'red',
//       nodes: 80,
//       speed: -1,
//       radius: 6
//     }, {
//       color: 'green',
//       nodes: 250,
//       speed: 1,
//       radius: 3
//     }
//   ];

//   Tree = (function() {
//     function Tree(w, h, swirls) {
//       this.run = __bind(this.run, this);
//       var i;
//       this.width = w;
//       this.height = h;
//       this.canvas = document.getElementById('tree');
//       this.context = this.canvas.getContext('2d');
//       this.canvas.width = w;
//       this.canvas.height = h;
//       this.swirls = (function() {
//         var _i, _ref, _results;
//         _results = [];
//         for (i = _i = 0, _ref = swirls.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
//           _results.push(new TreeSwirl(this, swirls[i], i / swirls.length));
//         }
//         return _results;
//       }).call(this);
//       this.run();
//     }

//     Tree.prototype.run = function(t) {
//       if (t == null) {
//         t = 0;
//       }
//       window.requestAnimationFrame(this.run);
//       return this.draw(t);
//     };

//     Tree.prototype.draw = function(t) {
//       var s, _i, _j, _len, _len1, _ref, _ref1, _results;
//       this.context.clearRect(0, 0, this.width, this.height);
//       _ref = this.swirls;
//       for (_i = 0, _len = _ref.length; _i < _len; _i++) {
//         s = _ref[_i];
//         s.drawBack(t);
//       }
//       _ref1 = this.swirls;
//       _results = [];
//       for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
//         s = _ref1[_j];
//         _results.push(s.drawFront(t));
//       }
//       return _results;
//     };

//     return Tree;

//   })();

//   TreeSwirl = (function() {
//     function TreeSwirl(tree, s, offset) {
//       var i;
//       this.tree = tree;
//       this.offset = offset;
//       this.color = s.color;
//       this.speed = s.speed;
//       this.radius = s.radius;
//       this.nodes = (function() {
//         var _i, _ref, _results;
//         _results = [];
//         for (i = _i = 0, _ref = s.nodes; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
//           _results.push(new SwirlNode(this, i / s.nodes));
//         }
//         return _results;
//       }).call(this);
//     }

//     TreeSwirl.prototype.drawBack = function(t) {
//       var n, _i, _len, _ref, _results;
//       _ref = this.nodes;
//       _results = [];
//       for (_i = 0, _len = _ref.length; _i < _len; _i++) {
//         n = _ref[_i];
//         if (n.inBack(t)) {
//           _results.push(n.draw(t));
//         }
//       }
//       return _results;
//     };

//     TreeSwirl.prototype.drawFront = function(t) {
//       var n, _i, _len, _ref, _results;
//       _ref = this.nodes;
//       _results = [];
//       for (_i = 0, _len = _ref.length; _i < _len; _i++) {
//         n = _ref[_i];
//         if (n.inFront(t)) {
//           _results.push(n.draw(t));
//         }
//       }
//       return _results;
//     };

//     return TreeSwirl;

//   })();

//   SwirlNode = (function() {
//     function SwirlNode(swirl, offset) {
//       this.swirl = swirl;
//       this.offset = offset;
//     }

//     SwirlNode.prototype.yPos = function() {
//       var d, od;
//       d = this.t / 800 * this.swirl.speed;
//       od = d + this.offset * this.swirl.tree.height;
//       return (this.swirl.tree.height - od % this.swirl.tree.height) % this.swirl.tree.height;
//     };

//     SwirlNode.prototype.xDeg = function() {
//       return this.yPos() * 5 + 100 * this.swirl.offset;
//     };

//     SwirlNode.prototype.xRad = function() {
//       return this.xDeg() * Math.PI / 60;
//     };

//     SwirlNode.prototype.xPos = function() {
//       return Math.sin(this.xRad()) * this.swirl.tree.width * this.yPos() / this.swirl.tree.height / 3 + this.swirl.tree.width / 2;
//     };

//     SwirlNode.prototype.shade = function() {
//       return (Math.cos(this.xRad()) + 1) / 2;
//     };

//     SwirlNode.prototype.inBack = function(t) {
//       this.t = t;
//       return Math.cos(this.xRad()) > 0;
//     };

//     SwirlNode.prototype.inFront = function(t) {
//       this.t = t;
//       return !this.inBack(t);
//     };

//     SwirlNode.prototype.draw = function(t) {
//       this.t = t - 600;
//       this.drawNode(this.swirl.radius * 0.6, this.shade() + 0.9);
//       this.t = t - 180;
//       this.drawNode(this.swirl.radius * 0.8, this.shade() + 0.4);
//       this.t = t;
//       return this.drawNode(this.swirl.radius, this.shade());
//     };

//     SwirlNode.prototype.drawNode = function(size, shade) {
//       var c;
//       c = this.swirl.tree.context;
//       c.beginPath();
//       c.arc(this.xPos(), this.yPos(), size, 0, 2 * Math.PI);
//       c.fillStyle = this.swirl.color;
//       c.fill();
//       c.fillStyle = "rgba(23,23,32," + shade + ")";
//       return c.fill();
//     };

//     return SwirlNode;

//   })();

//   new Tree(width, height, swirls);

// }

// import DrawSVGPlug

//MorphSVGPlugin.convertToPath('polygon');
var xmlns = "http://www.w3.org/2000/svg",
  xlinkns = "http://www.w3.org/1999/xlink",
select = function(s) {
    return document.querySelector(s);
  },
  selectAll = function(s) {
    return document.querySelectorAll(s);
  },
  pContainer = select('.pContainer'),
  mainSVG = select('.mainSVG'),
  star = select('#star'),
  sparkle = select('.sparkle'),
  tree = select('#tree'),
  showParticle = true,
  particleColorArray = ['#E8F6F8', '#ACE8F8', '#F6FBFE','#A2CBDC','#B74551', '#5DBA72', '#910B28', '#910B28', '#446D39'],
  particleTypeArray = ['#star','#circ','#cross','#heart'],
  particleTypeArray = ['#star'],
  particlePool = [],
  particleCount = 0,
  numParticles = 200


gsap.set('svg', {
  visibility: 'visible'
})

gsap.set(sparkle, {
	transformOrigin:'50% 50%',
	y:-100
})

let getSVGPoints = (path) => {
	let arr = []
	var rawPath = MotionPathPlugin.getRawPath(path)[0];
	rawPath.forEach((el, value) => {
		let obj = {}
		obj.x = rawPath[value * 2]
		obj.y = rawPath[(value * 2) + 1]
		if(value % 2) {
			arr.push(obj)
		}
		//console.log(value)
	})
	
	return arr;
}
let treePath = getSVGPoints('.treePath')

var treeBottomPath = getSVGPoints('.treeBottomPath')

//console.log(starPath.length)
var mainTl = gsap.timeline({delay:2, repeat:0}), starTl;


//tl.seek(100).timeScale(1.82)

function flicker(p){
  
  //console.log("flivker")
  gsap.killTweensOf(p, {opacity:true});
  gsap.fromTo(p, {
    opacity:1
  }, {
		duration: 0.07,
    opacity:Math.random(),
    //ease: RoughEase.ease.config({ template: Power0.easeNone, strength: 3, points: 6, taper: "both", randomize: true, clamp: false}),
    repeat:-1
  })
}

function createParticles() {
  
  //var step = numParticles/starPath.length;
  //console.log(starPath.length)
  var i = numParticles, p, particleTl, step = numParticles/treePath.length, pos;
  while (--i > -1) {
    
    p = select(particleTypeArray[i%particleTypeArray.length]).cloneNode(true);
    mainSVG.appendChild(p);
    p.setAttribute('fill', particleColorArray[i % particleColorArray.length]);
    p.setAttribute('class', "particle");   
    particlePool.push(p);
    //hide them initially
    gsap.set(p, {
                 x:-100, 
                 y:-100,
   transformOrigin:'50% 50%'
                 })
    
    

  }

}
function getScale(){
  return gsap.utils.random(0.5, 2);
}
function playParticle(p){
  if(!showParticle){return};
  var p = particlePool[particleCount]
 gsap.set(p, {
	 x: gsap.getProperty('.pContainer', 'x'),
	 y: gsap.getProperty('.pContainer', 'y'),
	 scale:getScale()
      //}
    }
    );
var tl = gsap.timeline();
  tl.to(p, {
		duration: gsap.utils.random(0.61,6),
      //paused:true,
      physics2D: {
        velocity: gsap.utils.random(-13, 16),
        angle:gsap.utils.random(-180, 180),
        gravity:gsap.utils.random(-13, 44)
      },

      scale:0,
      rotation:gsap.utils.random(-123,360),
      //skewY:(Math.random() * 180),
      ease: 'power1',
      onStart:flicker,
      onStartParams:[p],
      //repeat:-1,
      onRepeat: function(p) {        
        gsap.set(p, {         
            scale:getScale()
        })

      },
      onRepeatParams: [p]

    });
  

  //
  //particlePool[particleCount].play();
  particleCount++;
  //mainTl.add(tl, i / 1.3)
  particleCount = (particleCount >=numParticles) ? 0 : particleCount
  
}

function drawStar(){
  
  starTl = gsap.timeline({onUpdate:playParticle})
  starTl.to('.pContainer, .sparkle', {
		duration: 6,
		motionPath :{
			path: '.treePath',
      autoRotate: false
		},
    ease: 'linear'
  })  
  .to('.pContainer, .sparkle', {
		duration: 1,
    onStart:function(){showParticle = false},
    x:treeBottomPath[0].x,
    y:treeBottomPath[0].y
  })
  .to('.pContainer, .sparkle',  {
		duration: 2,
    onStart:function(){showParticle = true},
		motionPath :{
			path: '.treeBottomPath',
      autoRotate: false
		},
    ease: 'linear'    
  },'-=0')
.from('.treeBottomMask', {
		duration: 2,
  drawSVG:'0% 0%',
  stroke:'#FFF',
  ease:'linear'
},'-=2')  
  

  //gsap.staggerTo(particlePool, 2, {})
  
}


createParticles();
drawStar();
//ScrubGSAPTimeline(mainTl)

mainTl.from(['.treePathMask','.treePotMask'],{
	duration: 6,
  drawSVG:'0% 0%',
  stroke:'#FFF',
	stagger: {
		each: 6
	},
    duration: gsap.utils.wrap([6, 1,2]),
  ease:'linear'
})
.from('.treeStar', {
	duration: 3,
  //skewY:270,
  scaleY:0,
  scaleX:0.15,
  transformOrigin:'50% 50%',
  ease: 'elastic(1,0.5)'
},'-=4')

 .to('.sparkle', {
	duration: 3,
    opacity:0,
    ease:"rough({strength: 2, points: 100, template: linear, taper: both, randomize: true, clamp: false})"
  },'-=0')
  .to('.treeStarOutline', {
	duration: 1,
    opacity:1,
    ease:"rough({strength: 2, points: 16, template: linear, taper: none, randomize: true, clamp: false})"
  },'+=1')


mainTl.add(starTl, 0)
gsap.globalTimeline.timeScale(1.5);