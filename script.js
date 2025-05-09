const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let circles = [];
let selectedCircle = null;
let isDragging = false;

function getPosition(e) {
  const rect = canvas.getBoundingClientRect();
  if (e.touches) {
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    };
  } else {
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }
}

function isInsideCircle(pos, circle) {
  const dx = pos.x - circle.x;
  const dy = pos.y - circle.y;
  return Math.sqrt(dx * dx + dy * dy) <= circle.radius;
}

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

function handleDown(e) {
  e.preventDefault();
  const pos = getPosition(e);
  selectedCircle = null;

  for (let i = circles.length - 1; i >= 0; i--) {
    if (isInsideCircle(pos, circles[i])) {
      selectedCircle = circles[i];
      isDragging = true;
      break;
    }
  }

  if (!selectedCircle) {
    circles.push({
      x: pos.x,
      y: pos.y,
      radius: 20,
      selected: false,
      color: 'blue'
    });
  }

  circles.forEach(c => c.selected = false);
  if (selectedCircle) selectedCircle.selected = true;

  drawCircles();
}

function handleMove(e) {
  if (!isDragging || !selectedCircle) return;
  const pos = getPosition(e);
  selectedCircle.x = pos.x;
  selectedCircle.y = pos.y;
  drawCircles();
}

function handleUp() {
  isDragging = false;
}

function handleWheel(e) {
  if (selectedCircle) {
    e.preventDefault();
    selectedCircle.radius += e.deltaY < 0 ? 2 : -2;
    if (selectedCircle.radius < 5) selectedCircle.radius = 5;
    drawCircles();
  }
}

function handleKeyDown(e) {
  if (e.key === 'Delete' && selectedCircle) {
    circles = circles.filter(c => c !== selectedCircle);
    selectedCircle = null;
    drawCircles();
  }
}

canvas.addEventListener('mousedown', handleDown);
canvas.addEventListener('mousemove', handleMove);
canvas.addEventListener('mouseup', handleUp);
canvas.addEventListener('wheel', handleWheel);

canvas.addEventListener('touchstart', handleDown);
canvas.addEventListener('touchmove', handleMove);
canvas.addEventListener('touchend', handleUp);

document.addEventListener('keydown', handleKeyDown);
