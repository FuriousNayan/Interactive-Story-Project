window.onload = function() {
  // Start background music
  document.getElementById('backgroundMusic').play();
  
  // Request player name
  const playerName = prompt("Enter your character's name:", "Elias");
  initializeGame(playerName || "Elias");
}

// Play music on first click 
document.addEventListener('click', function playOnClick() {
  document.getElementById('backgroundMusic').play();
  document.removeEventListener('click', playOnClick);
});

// Game state variables
let scenes = [];
let currentSceneId = null;
let gameStarted = false;
let playerName = "Elias";

function initializeGame(name) {
  playerName = name;
  initializeScenes();
  setupImageTooltips();
  
  // Set up continue button
  document.getElementById('continue-button').addEventListener('click', function() {
    goToScene('intro');
  });
}

// Adding tooltip functionality to images
function setupImageTooltips() {
  const storyImage = document.getElementById('story-image');
  
  // Creates tooltip element
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.style.display = 'none';
  tooltip.style.position = 'absolute';
  tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  tooltip.style.color = 'white';
  tooltip.style.padding = '5px';
  tooltip.style.borderRadius = '3px';
  tooltip.style.zIndex = '100';
  document.body.appendChild(tooltip);
  
  // Add event listeners to the story image
  storyImage.addEventListener('mouseover', function() {
    const scene = findScene(currentSceneId);
    if (!scene) return;
    
    // Update tooltip content based on current scene
    tooltip.textContent = `Scene: ${currentSceneId} - ${scene[1].split('\n')[0]}`;
    
    // Positions tooltip near the image
    const rect = storyImage.getBoundingClientRect();
    tooltip.style.top = (rect.bottom + window.scrollY + 5) + 'px';
    tooltip.style.left = (rect.left + window.scrollX) + 'px';
    tooltip.style.display = 'block';
  });
  
  storyImage.addEventListener('mouseout', function() {
    tooltip.style.display = 'none';
  });
}

function createScene(id, text, image, choices) {
  const existingSceneIndex = scenes.findIndex(scene => scene[0] === id);
  
  // Replaces"Elias" with player's name in scene text
  const personalizedText = text.replace(/Elias/g, playerName);
  
  const newScene = [id, personalizedText, image, choices];
  
  if (existingSceneIndex >= 0) {
    scenes[existingSceneIndex] = newScene;
  } else {
    scenes.push(newScene);
  }
}

function findScene(id) {
  return scenes.find(scene => scene[0] === id) || null;
}

function goToScene(id) {
  const scene = findScene(id);
  if (!scene) {
    console.error(`Scene ${id} does not exist!`);
    return;
  }
  
  currentSceneId = id;
  gameStarted = true;
  
  updateStory(scene[1], scene[2]);
  createChoiceButtons(scene[3]);
  
  const continueButton = document.getElementById('continue-button');
  if (continueButton) {
    continueButton.remove();
  }
}

function updateStory(text, imageSrc) {
  document.getElementById('story-text').textContent = text;
  document.getElementById('story-image').src = imageSrc;
}

function createChoiceButtons(choices) {
  const buttonContainer = document.getElementById('button-container') || document.createElement('div');
  buttonContainer.id = 'button-container';
  
  buttonContainer.innerHTML = '';
  
  if (!choices || choices.length === 0) {
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart Story';
    restartButton.addEventListener('click', () => goToScene('intro'));
    buttonContainer.appendChild(restartButton);
  } else {
    // Using a for loop for creating buttons 
    for (let i = 0; i < choices.length; i++) {
      const choice = choices[i];
      const button = document.createElement('button');
      button.textContent = `${i+1}. ${choice[0]}`;  // Add numbers to buttons
      button.addEventListener('click', () => goToScene(choice[1]));
      buttonContainer.appendChild(button);
    }
  }
  
  const existingContainer = document.getElementById('button-container');
  if (existingContainer) {
    existingContainer.replaceWith(buttonContainer);
  } else {
    const storyContainer = document.querySelector('.story-container') || document.body;
    storyContainer.appendChild(buttonContainer);
  }
}

// Allow adding new scenes programmatically
function addNewScene(id, text, image, choices) {
  createScene(id, text, image, choices);
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
  // If key '0' is pressed, reload the page to restart
  if (event.key === '0') {
    location.reload();
  }
});

function initializeScenes() {
  createScene(
      'intro',
      "Returning to Varesth,\nElias arrives at the ruined capital, now infested with Hollowborn, twisted remnants of humanity. A dark presence watches him from the shadows.",
      "secondScene.webp",
      [
          ["Explore Ruins", "ruinsExplore"],
          ["Head Straight to Cathedral", "cathedral"]
      ]
  );

  createScene(
      'ruinsExplore',
      "Elias dies from the Hollowborn for being too curious",
      "eliasDieHollowborn.webp",
      []
  );

  createScene(
      'cathedral',
      "The cursed Father Malgath lingers within, speaking in riddles. He tells Elias the Heart of the Hollow Veil lies beyond Ebonwood Forest, but warns that it is not a gift, it is a choice",
      "eliasRiddle.webp",
      [
          ["Demand the truth from Father Malgath", "demandTruth"],
          ["Ponder upon his words and leave", "ponderWords"],
      ]
  );

  createScene(
    'demandTruth',
    "Father Malgath rips out your lungs, because you talked too much",
    "eliasMalgath.webp",
    []
  );

  createScene(
    'ponderWords',
    "A ruined village stands on the path ahead, its dead still whispering for release",
    "eliasVillage.webp",
    [
        ["Perform the burial Ritual to grant them peace, but risk drawing their attention", "burialRitual"],
        ["Leave them be and continue on your journey", "leaveVillage"],
    ]
  );

  createScene(
    'burialRitual',
    "The dead are thankful, and grant you with the power of death",
    "eliasDeathPower.webp",
    [
        ["Continue on your journey", "leaveVillage"],
    ]
  );

  createScene(
    'leaveVillage',
    "The Cursed woods twist reality. As Elias ventures deeper he encounters the Wraith of the Forgotten, a being that speaks of his past",
    "eliasPast.webp",
    [
        ["Confront the Wraith", "confrontWraith"],
        ["Avoid it and press on", "avoidWraith"],
    ]
  );

  createScene(
    'avoidWraith',
    "You die from the Wraiths aura",
    "eliasAuraDeath.webp",
    []
  );

  createScene(
    'confrontWraith',
    "The Wraith trembles in Elias's Aura, and tells him of the past of the Hollowkeep Gates",
    "eliasAura.webp",
    [
        ["Continue on your journey", "continueJourney"],
    ]
  );

  createScene(
    'continueJourney',
    "The ruined fortress of the Veilbound King looms ahead, its gates sealed with blood iron",
    "eliasStandingPalace.webp",
    [
        ["Search for another entrance", "searchEntrance"],
        ["Call out to the king - if he still lives, he may answer", "callKing"],
    ]
  );

  createScene(
    'searchEntrance',
    "Encounter Ruggul the Wrathful and scream until your lungs tear",
    "eliasRuggul.webp",
    []
  );

  createScene(
    'callKing',
    "The Veilbound King, the first soul cursed by the Hollow Veil stands before Elias, twisted yet aware. He does not attack",
    "eliasVeilboundKing.webp",
    [
      ["Speak with him about the Hollow Veil", "speakKing"],
      ["Challenge him to a duel", "duelKing"],
    ]
  );

  createScene(
    'speakKing',
    "The Veilbound King has no mercy, he ripped out the essence of your soul",
    "eliasDeathKing.webp",
    []
  );

  createScene(
    'duelKing',
    "Impaled the Veilbound King with the Sword of the Oathbringer and claim the Heart of the Hollow Veil",
    "eliasFighting.webp",
    [
      ["Continue on your journey", "endGame"]
    ]
  );

  createScene(
    'endGame',
    "Elias has claimed the Heart of the Hollow Veil, what will he do?",
    "eliasHeart.webp",
    [
      ["Destroy the Heart of the Hollow Veil", "destroyHeart"],
      ["Absorb the Power of the Heart of the Hollow Veil", "absorbHeart"],
      ["Attempt to reshape the Heart of the Hollow Veil", "shapeHeart"]
    ]
  );

  createScene(
    'destroyHeart',
    "Elias destroys the heart, unleashing a cleansing fire that purges the land. The Hollowborn and cursed souls are freed, but so is Elias. His body crumbles to ash, his sacrifice erasing the last remnants of the kingdom",
    "eliasDestroy.webp",
    []
  );

  createScene(
    'absorbHeart',
    "Elias absorbs the Heart's power, becoming the new Veilbound King. The curse stabilizes, but Varesth is forever trapped in darkness, ruled by an eternal king who ensures balance between life and death.",
    "eliasAbsorb.webp",
    []
  );

  createScene(
    'shapeHeart',
    "Elias attempts to reshape the Heart's power, but the cycle resets. He awakens at the beginning of his journey, doomed to repeat it forever. The whispers return, and the Hollow Veil endures. ",
    "eliasReshape.webp",
    []
  );
}