//your code here
// Select DOM Elements
const tilesContainer = document.getElementById('tiles-container');
const resetButton = document.getElementById('reset');
const verifyButton = document.getElementById('verify');
const result = document.getElementById('result');

// List of images
const imageClasses = ['img1', 'img2', 'img3', 'img4', 'img5'];
let selectedTiles = [];
let tiles = [];

// Function to shuffle an array
const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

// Initialize the tiles
function initTiles() {
  selectedTiles = [];
  result.textContent = '';
  resetButton.style.display = 'none';
  verifyButton.style.display = 'none';
  
  tilesContainer.innerHTML = '';

  // Prepare tiles (5 unique + 1 duplicate)
  const duplicateIndex = Math.floor(Math.random() * imageClasses.length);
  tiles = [...imageClasses, imageClasses[duplicateIndex]];
  shuffleArray(tiles);

  // Render the tiles
  tiles.forEach((imgClass, index) => {
    const tile = document.createElement('img');
    tile.className = imgClass;
    tile.dataset.index = index;
    tile.src = getImageSource(imgClass);
    tile.addEventListener('click', handleTileClick);
    tilesContainer.appendChild(tile);
  });
}

// Get image source based on class (dummy mapping)
function getImageSource(imgClass) {
  const sources = {
    img1: 'https://picsum.photos/id/237/100',
    img2: 'https://picsum.photos/seed/picsum/100',
    img3: 'https://picsum.photos/100?grayscale',
    img4: 'https://picsum.photos/100/100',
    img5: 'https://picsum.photos/100/100.jpg',
  };
  return sources[imgClass];
}

// Handle tile click
function handleTileClick(event) {
  const clickedTile = event.target;

  // Prevent selecting the same tile twice
  if (selectedTiles.some(tile => tile.index === clickedTile.dataset.index)) return;

  // Highlight the selected tile
  clickedTile.classList.add('selected');
  selectedTiles.push({
    index: clickedTile.dataset.index,
    imgClass: clickedTile.className,
  });

  // Show reset button after first click
  if (selectedTiles.length === 1) {
    resetButton.style.display = 'block';
  }

  // Show verify button after two clicks
  if (selectedTiles.length === 2) {
    verifyButton.style.display = 'block';
  }
}

// Handle verification
function verifySelection() {
  if (selectedTiles.length !== 2) return;

  const [firstTile, secondTile] = selectedTiles;

  if (firstTile.imgClass === secondTile.imgClass) {
    result.textContent = 'You are a human. Congratulations!';
  } else {
    result.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }

  // Hide verify button after verification
  verifyButton.style.display = 'none';
}

// Reset the game
resetButton.addEventListener('click', initTiles);
verifyButton.addEventListener('click', verifySelection);

// Initialize the game on page load
initTiles();
