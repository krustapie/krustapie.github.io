/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
  };

  var walker = {
    Xcoordinate: 0,
    Ycoordinate: 0,
    Xspeed: 0,
    Yspeed: 0,
  };

  // Game Item Objects

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL); // execute newFrame every 0.0166 seconds (60 Frames per second)
  //change 'eventType' to the type of event you want to handle
  $(document).on("keydown", handleKeyDown); // change 'eventType' to the type of event you want to handle
  $(document).on("keyup", handleKeyUp);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    wallCollision();
    redrawGameItem();
  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT) {
      walker.Xspeed = -5;
    }
    if (event.which === KEY.UP) {
      walker.Yspeed = -5;
    }
    if (event.which === KEY.RIGHT) {
      walker.Xspeed = 5;
    }
    if (event.which === KEY.DOWN) {
      walker.Yspeed = 5;
    }
  }

  function handleKeyUp(event) {
    if (
      event.which === KEY.LEFT ||
      event.which === KEY.UP ||
      event.which === KEY.RIGHT ||
      event.which === KEY.DOWN
    ) {
      walker.Xspeed = 0;
      walker.Yspeed = 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function repositionGameItem() {
    walker.Xcoordinate = walker.Xcoordinate + walker.Xspeed;
    walker.Ycoordinate = walker.Ycoordinate + walker.Yspeed;
  }

  function redrawGameItem() {
    $("#walker").css("left", walker.Xcoordinate);
    $("#walker").css("top", walker.Ycoordinate);
  }

  function wallCollision() {
    var bWidth = $("#board").width() -  50;
    var bHeight = $("#board").height() - 50;
    if (walker.Xcoordinate < 0) {
      walker.Xcoordinate = 0;
    }
    if (walker.Xcoordinate > bWidth) {
      walker.Xcoordinate = bWidth;
    }
    if (walker.Ycoordinate < 0) {
      walker.Ycoordinate = 0;
    }
    if (walker.Ycoordinate > bHeight) {
      walker.Ycoordinate = bHeight;
    }
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
}
