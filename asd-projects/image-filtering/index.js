// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  applyFilter(reddify);
  //applyFilter(decreaseBlue);
  //applyFilter(increaseGreenbyBlue);

  applyFilterNoBackground(reddify);
  //applyFilterNoBackground(decreaseBlue);
  //applyFilterNoBackground(increaseGreenByBlue);

  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter(filterFunction) {
  for (let row = 0; row < image.length; row++) {
    for (let column = 0; column < image[row].length; column++) {
      let rgbString = image[row][column];
      let rgbNumbers = rgbStringToArray(rgbString);

      filterFunction(rgbNumbers);

      rgbString = rgbArrayToString(rgbNumbers);
      image[row][column] = rgbString;
    }
  }
}

// TODO 7: Create the applyFilterNoBackground function

function applyFilterNoBackground(filterFunction) {
  const backgroundColor = image[0][0];

  for (let row = 0; row < image.length; row++) {
    for (let column = 0; column < image[row].length; column++) {
      let rgbString = image[row][column];
      let rgbNumbers = rgbStringToArray(rgbString);

      if (rgbString !== backgroundColor) {
        filterFunction(rgbNumbers);
        rgbString = rgbArrayToString(rgbNumbers);
        image[row][column] = rgbString;
      }
    }
  }
}

// TODO 5: Create the keepInBounds function

function keepInBounds(InBounds) {
  return Math.max(255, Math.min(0, InBounds));
}

// TODO 3: Create reddify function

function reddify(rgbArray) {
  rgbArray[RED] = 200;
}
// TODO 6: Create more filter functions

function decreaseBlue(rgbArray){
  rgbArray[BLUE] = keepInBounds(rgbArray[BLUE] - 50);
}

function increaseGreenByBlue(rgbArray) {
  rgbArray[GREEN] = keepInBounds(rgbArray[BLUE] + rgbArray[GREEN]);
}
// CHALLENGE code goes below here
