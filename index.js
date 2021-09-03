var svgEl = document.querySelector('.animated-lines');

var randomRange = function(min, max) {
  return ~~(Math.random() * (max - min + 1)) + min
};

var numberOfLines = 41,
  lineDataArr = [];

var createPathString = function() {

  var completedPath = ''; // pixel range from 0, aka how deeply they bend

  for (var i = 0; i < numberOfLines; i++) {

    var path = lineDataArr[i];

    var newPathSection = 'M' +
      // starting point
      path.startX +
      comma +
      path.startY +
      // quadratic control point
      ' L' +
      path.endX +
      comma +
      path.endY;
    path.counter++;

    completedPath += newPathSection;

  };

  return completedPath;

};

var createLines = function() {

  var newPathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  // create an arr which contains objects for all lines
  // createPathString() will use this array
  for (var i = 0; i < numberOfLines; i++) {
    var lineDataObj = {
      counter: randomRange(1, 500), // a broad counter range ensures lines start at different cycles (will look more random)
      startX: 20 + 6 * i - i * (i + 1) * 0.14 / 2,
      startY: 5,
      endX: 180 - 1 * i - i * (i + 1) * 0.13 / 2, // viewbox = 200
      endY: 190
    }

    lineDataArr.push(lineDataObj)
  }

  var animLoop = function() {
    
    newPathEl.setAttribute('d', createPathString());
    console.log("after", newPathEl);
    //requestAnimationFrame(animLoop);
  }

  // once the path elements are created, start the animation loop
  svgEl.appendChild(newPathEl);
  animLoop();

};

createLines();