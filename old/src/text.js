// import anime from 'animejs/lib/anime.es.js';


// document.querySelectorAll('.letters').forEach(function(element) {
//   element.innerHTML = element.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter' data-letter='$&'>$&</span>");
// });

// document.querySelectorAll('.letters2').forEach(function(element) {
//   element.innerHTML = element.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter2' data-letter='$&'>$&</span>");
// });

// // Configuração da animação com anime.js
// anime.timeline({ loop: true })
//   .add({
//     targets: '.letter',
//     scale: {
//       value: [0, 1],
//       duration: 950
//     },
//     translateY: [function() { return anime.random(-360, 360); }, 0],
//     translateX: [function() { return anime.random(-360, 0); }, 0],
//     opacity: [0, 1],
//     filter: {
//       value: ["blur(15px)", "blur(0px)"],
//       duration: 800
//     },
//     duration: 750,
//     elasticity: 300,
//     delay: function(el, i) {
//       return 35 * (i + 1);
//     },
//     update: function(anim) {
//       // console.log(anim.currentTime + 'ms'); // Pega o tempo atual da animação com `myAnimation.currentTime`, o valor é em ms.
//       // console.log(anim.progress + '%'); // Pega o progresso atual da animação com `myAnimation.progress`, o valor é em %
//     },
//     begin: function(anim, target) {
//       // console.log(anim.began); // true após 1000ms
//     }
//   })
//   .add({
//     targets: '.letter',
//     opacity: 0,
//     duration: 8000,
//     easing: "easeOutExpo",
//     delay: 8000
//   });

//   anime.timeline({ loop: false })
//   .add({
//     targets: '.letter2',
//     scale: {
//       value: [0, 1],
//       duration: 950
//     },
//     translateY: [function() { return anime.random(-360, 360); }, 0],
//     translateX: [function() { return anime.random(-360, 0); }, 0],
//     opacity: [0, 1],
//     filter: {
//       value: ["blur(15px)", "blur(0px)"],
//       duration: 800
//     },
//     duration: 750,
//     elasticity: 300,
//     delay: function(el, i) {
//       return 35 * (i + 1);
//     },
//     update: function(anim) {
//       // console.log(anim.currentTime + 'ms'); // Pega o tempo atual da animação com `myAnimation.currentTime`, o valor é em ms.
//       // console.log(anim.progress + '%'); // Pega o progresso atual da animação com `myAnimation.progress`, o valor é em %
//     },
//     begin: function(anim, target) {
//       // console.log(anim.began); // true após 1000ms
//     }
//   })
//   .add({
//     targets: '.letter',
//     opacity: 0,
//     duration: 8000,
//     easing: "easeOutExpo",
//     delay: 8000
//   });
