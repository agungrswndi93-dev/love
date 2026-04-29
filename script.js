// script.js

/* =========================
   LOADING 1 2 3
========================= */

const loadingNumber =
document.getElementById("loadingNumber");

const loadingScreen =
document.getElementById("loadingScreen");

const main =
document.getElementById("main");

let count = 1;

const interval = setInterval(() => {

  count++;

  loadingNumber.innerText = count;

  if(count >= 3){

    clearInterval(interval);

    setTimeout(() => {

      loadingScreen.classList.add("hide");

      main.classList.remove("hidden");

      startLove();

    },1000);

  }

},1000);

/* =========================
   LOVE PARTICLE
========================= */

function startLove(){

  const canvas =
  document.getElementById("canvas");

  const ctx =
  canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  function heart(t){

    return{

      x:
      16 * Math.pow(Math.sin(t),3),

      y:
      -(13*Math.cos(t)
      -5*Math.cos(2*t)
      -2*Math.cos(3*t)
      -Math.cos(4*t))

    };

  }

  class Particle{

    constructor(x,y,size,color){

      this.x = x;
      this.y = y;

      this.size = size;

      this.color = color;

      this.speedX =
      (Math.random()-0.5)*0.7;

      this.speedY =
      (Math.random()-0.5)*0.7;

      this.alpha = 1;

    }

    update(){

      this.x += this.speedX;
      this.y += this.speedY;

      this.alpha -= 0.008;

    }

    draw(){

      ctx.globalAlpha = this.alpha;

      ctx.fillStyle = this.color;

      ctx.beginPath();

      ctx.arc(
        this.x,
        this.y,
        this.size,
        0,
        Math.PI*2
      );

      ctx.fill();

      ctx.globalAlpha = 1;

    }

  }

  function createHeart(){

    for(let i=0; i<120; i++){

      const t =
      Math.random() * Math.PI * 2;

      const pos =
      heart(t);

      const x =
      canvas.width/2 + pos.x * 20;

      const y =
      canvas.height/2 + pos.y * 20;

      const colors = [
        "#ff4d88",
        "#ff7ca8",
        "#ffb3cc",
        "#ffffff"
      ];

      particles.push(

        new Particle(
          x,
          y,
          Math.random()*3+1,
          colors[
            Math.floor(
              Math.random()*colors.length
            )
          ]
        )

      );

    }

  }

  function animate(){

    ctx.fillStyle =
    "rgba(0,0,0,0.1)";

    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    createHeart();

    for(let i=0; i<particles.length; i++){

      particles[i].update();

      particles[i].draw();

      if(particles[i].alpha <= 0){

        particles.splice(i,1);

        i--;

      }

    }

    requestAnimationFrame(animate);

  }

  animate();

  window.addEventListener("resize",()=>{

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

  });

}
