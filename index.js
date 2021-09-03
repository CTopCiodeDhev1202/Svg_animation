var svgEl = document.querySelector('.animated-lines');

var randomRange = function(min, max) {
  return ~~(Math.random() * (max - min + 1)) + min
};

var numberOfLines = 41, index = 0,
  lineDataArr = [];

var createPathString = function() {

  index++;

  var completedPath = '', comma = ','; // pixel range from 0, aka how deeply they bend

  var path = lineDataArr[index];

  if (index < 41) {
    for (var i = 0; i < numberOfLines; i++){    
      starty = path.startY - 4 * i + i * (i + 1) * 0.1 / 2;
      endy = path.endY + index * 0.3 * i - i * (i + 1) * index * 0.3 / 80;
      var newPathSection = 'M' +
      // starting point
      path.startX +
      comma +
      starty +
      // quadratic control point
      ' L' +
      path.endX +
      comma +
      endy;
  
      completedPath += newPathSection;
    }
  }else{
    for (var i = 0; i < numberOfLines; i++){    
      startx = path.startX + index * 0.1 * i - i * (i + 1) * index * 0.1 / 80;
      endx = path.endX - index * 0.02 * i - i * (i + 1) * index * 0.02 / 80;
      var newPathSection = 'M' +
      // starting point
      startx +
      comma +
      path.startY +
      // quadratic control point
      ' L' +
      endx +
      comma +
      path.endY;
  
      completedPath += newPathSection;
    }
  }

  return completedPath;

};

var createLines = function() {

  var newPathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  // create an arr which contains objects for all lines
  // createPathString() will use this array
  for (var i = 0; i < 41; i++) {
    var lineDataObj = {
      startX: 20,
      startY: 100 - i * 2,
      endX: 280, // viewbox = 200
      endY: 100 + i * 2
    }

    lineDataArr.push(lineDataObj)
  }

  for (var i = 0; i < 41; i++) {
    var lineDataObj = {
      startX: 22 + 2 * i,
      startY: 20,
      endX: 278 - 2 * i, // viewbox = 200
      endY: 180
    }

    lineDataArr.push(lineDataObj)
  }

  var animLoop = function() {
    newPathEl.setAttribute('d', createPathString());
    if (index < 82) requestAnimationFrame(animLoop);
  }

  // once the path elements are created, start the animation loop
  svgEl.appendChild(newPathEl);
  console.log(lineDataArr);
  animLoop();

};

createLines();