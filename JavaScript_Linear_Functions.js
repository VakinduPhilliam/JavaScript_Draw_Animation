
/* JavaScript Animation Functions. */
/* Timing functions, like CSS-property transition-timing-function, gets the fraction of time that passed */
/* (0 at start, 1 at the end) and returns the animation completion (like y on the Bezier curve). */

// A Linear Animation Function
// A linear function means that the animation goes on uniformly with the same speed:

function linear(timeFraction) {

  return timeFraction;

}


//draw(progress)
//The function that takes the animation completion state and draws it. 
//The value progress=0 denotes the beginning animation state, and progress=1 – the end state.
//This is that function that actually draws out the animation.

function draw(progress) {

  train.style.left = progress + 'px';

}


//Power of n
//If we want to speed up the animation, we can use progress in the power n.
//For instance, a parabolic curve:

function quad(timeFraction) {

  return Math.pow(timeFraction, 2)

}


//The arc


function circ(timeFraction) {

  return 1 - Math.sin(Math.acos(timeFraction));

}


//Back: bow shooting
//This function does the "bow shooting". First we "pull the bowstring", and then "shoot".
//Unlike previous functions, it depends on an additional parameter x, the "elasticity coefficient". 
//The distance of “bowstring pulling” is defined by it.

function back(x, timeFraction) {

  return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)

}


//Bounce
//Imagine we are dropping a ball. It falls down, then bounces back a few times and stops.
//The bounce function does the same, but in the reverse order: "bouncing" starts immediately. It uses few special coefficients for that:

function bounce(timeFraction) {

  for (let a = 0, b = 1, result; 1; a += b, b /= 2) {

    if (timeFraction >= (7 - 4 * a) / 11) {

      return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)

    }
  }
}


//Elastic animation
//One more "elastic" function that accepts an additional parameter x for the "initial range".

function elastic(x, timeFraction) {

  return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction)

}


//Animation Reversal: ease*
//So we have a collection of timing functions. Their direct application is called "easeIn".
//Sometimes we need to show the animation in the reverse order. That’s done with the "easeOut" transform.
//easeOut
//In the "easeOut" mode the timing function is put into a wrapper timingEaseOut:

timingEaseOut(timeFraction) = 1 - timing(1 - timeFraction)

//In other words, we have a "transform" function makeEaseOut that takes a "regular" timing function and returns the wrapper around it:
// accepts a timing function, returns the transformed variant

function makeEaseOut(timing) {

  return function(timeFraction) {

    return 1 - timing(1 - timeFraction);

  }
}



//easeInOut
//We also can show the effect both in the beginning and the end of the animation. 
//The transform is called “easeInOut”.
//Given the timing function, we calculate the animation state like this:

if (timeFraction <= 0.5) { // first half of the animation

  return timing(2 * timeFraction) / 2;

} else { // second half of the animation

  return (2 - timing(2 * (1 - timeFraction))) / 2;

}

//The wrapper code:

function makeEaseInOut(timing) {

  return function(timeFraction) {

    if (timeFraction < .5)

      return timing(2 * timeFraction) / 2;

    else

      return (2 - timing(2 * (1 - timeFraction))) / 2;

  }
}

bounceEaseInOut = makeEaseInOut(bounce);

