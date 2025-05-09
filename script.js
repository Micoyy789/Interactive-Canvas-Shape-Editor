const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let circles = [];
let selectedCircle = null;
let isDragging = false;

canvas.addEventListener('mousedown', function (e) {
  const mousePos = getMousePos(e);
  selectedCircle = null;

  for (let i = circles.length - 1; i >= 0; i--) {
    const circle = circles[i];
    if (isInsideCircle(mousePos, circle)) {
      selectedCircle = circle;
      isDragging = true;
      break;
    }
  }

  if (!selectedCircle) {
    circles.push({
      x: mousePos.x,
      y: mousePos.y,
      radius: 20,
      selected: false,
      color: 'blue'
    });
  }

  circles.forEach(c => c.selected = false);
  if (selectedCircle) {
    selectedCircle.selected = true;
  }

  drawCircles();
});

canvas.addEventListener('mousemove', function (e) {
  if (isDragging && selectedCircle) {
    const mousePos = getMousePos(e);
    selectedCircle.x = mousePos.x;
    selectedCircle.y = mousePos.y;
    drawCircles();
  }
});

canvas.addEventListener('mouseup', function () {
  isDragging = false;
});

canvas.addEventListener('wheel', function (e) {
  if (selectedCircle) {
    e.preventDefault();
    selectedCircle.radius += e.deltaY < 0 ? 2 : -2;
    if (selectedCircle.radius < 5) {
      selectedCircle.radius = 5;
    }
    drawCircles();
  }
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Delete' && selectedCircle) {
    circles = circles.filter(c => c !== selectedCircle);
    selectedCircle = null;
    drawCircles();
  }
});

function drawCircles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circles.forEach(circle => {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fillStyle = circle.selected ? 'red' : circle.color;
    ctx.fill();
    ctx.closePath();
  });
}

function getMousePos(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

function isInsideCircle(pos, circle) {
  const dx = pos.x - circle.x;
  const dy = pos.y - circle.y;
  return Math.sqrt(dx * dx + dy * dy) <= circle.radius;
}
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let circles = [];
let selectedCircle = null;
let isDragging = false;

canvas.addEventListener('mousedown', function (e) {
  const mousePos = getMousePos(e);
  selectedCircle = null;

  for (let i = circles.length - 1; i >= 0; i--) {
    const circle = circles[i];
    if (isInsideCircle(mousePos, circle)) {
      selectedCircle = circle;
      isDragging = true;
      break;
    }
  }

  if (!selectedCircle) {
    circles.push({
      x: mousePos.x,
      y: mousePos.y,
      radius: 20,
      selected: false,
      color: 'blue'
    });
  }

  circles.forEach(c => c.selected = false);
  if (selectedCircle) {
    selectedCircle.selected = true;
  }

  drawCircles();
});

canvas.addEventListener('mousemove', function (e) {
  if (isDragging && selectedCircle) {
    const mousePos = getMousePos(e);
    selectedCircle.x = mousePos.x;
    selectedCircle.y = mousePos.y;
    drawCircles();
  }
});

canvas.addEventListener('mouseup', function () {
  isDragging = false;
});

canvas.addEventListener('wheel', function (e) {
  if (selectedCircle) {
    e.preventDefault();
    selectedCircle.radius += e.deltaY < 0 ? 2 : -2;
    if (selectedCircle.radius < 5) {
      selectedCircle.radius = 5;
    }
    drawCircles();
  }
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Delete' && selectedCircle) {
    circles = circles.filter(c => c !== selectedCircle);
    selectedCircle = null;
    drawCircles();
  }
});

function drawCircles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circles.forEach(circle => {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fillStyle = circle.selected ? 'red' : circle.color;
    ctx.fill();
    ctx.closePath();
  });
}

function getMousePos(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

function isInsideCircle(pos, circle) {
  const dx = pos.x - circle.x;
  const dy = pos.y - circle.y;
  return Math.sqrt(dx * dx + dy * dy) <= circle.radius;
}
