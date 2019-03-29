//For animations that CSS can’t handle well, or those that need tight control, JavaScript can help. 
//JavaScript animations should be implemented via requestAnimationFrame. 
//That built-in method allows to setup a callback function to run when the browser will be preparing a repaint.

function animate({timing, draw, duration}) {

  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction goes from 0 to 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // calculate the current animation state
    let progress = timing(timeFraction);

    draw(progress); // draw it

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }

  });
}