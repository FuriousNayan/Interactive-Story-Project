window.onload = function() {
  document.getElementById('backgroundMusic').play();
}

document.addEventListener('click', function playOnClick() {
  document.getElementById('backgroundMusic').play();
  document.removeEventListener('click', playOnClick);
});

let scenes = [];
let currentSceneId = null;
let gameStarted = false;

initializeScenes();



function createScene(id, text, image, choices) {
  const existingSceneIndex = scenes.findIndex(scene => scene[0] === id);
  
  const newScene = [id, text, image, choices];
  
  if (existingSceneIndex >= 0) {
      scenes[existingSceneIndex] = newScene;
  } else {
      scenes.push(newScene);
  }
}

function findScene(id) {
  const scene = scenes.find(scene => scene[0] === id);
  return scene || null;
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
      choices.forEach(choice => {
          const button = document.createElement('button');
          button.textContent = choice[0];
          button.addEventListener('click', () => goToScene(choice[1]));
          buttonContainer.appendChild(button);
      });
  }
  
  const existingContainer = document.getElementById('button-container');
  if (existingContainer) {
      existingContainer.replaceWith(buttonContainer);
  } else {
      const storyContainer = document.querySelector('.story-container') || document.body;
      storyContainer.appendChild(buttonContainer);
  }
}

document.getElementById('continue-button').addEventListener('click', function() {
  goToScene('intro');
});

function addNewScene(id, text, image, choices) {
  createScene(id, text, image, choices);
}

function initializeScenes() {
  createScene(
      'intro',
      "Returning to Varesth\nElias arrives at the ruined capital, now infested with Hollowborn, twisted remnants of humanity. A dark presence watches him from the shadows.",
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

}