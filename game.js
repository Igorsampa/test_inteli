import TitleScreen from "./scenes/TitleScreen.js";
import Preload from "./scenes/Preload.js";
import Level1 from "./scenes/Level1.js";
import Level2 from "./scenes/Level2.js";
import PlayerSelect from "./scenes/PlayerSelect.js";
import TutorialScreen from "./scenes/TutorialScreen.js";
import Level3 from "./scenes/Level3.js";

// Phaser config to instanciate game
const WIDTH = 1280;
const HEIGHT = 720;
const ZOOM_FACTOR = 0.7

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
}

const Scenes = [TitleScreen, Level1, Level2, Level3, Preload, PlayerSelect, TutorialScreen];
const createScenes = Scene => new Scene(SHARED_CONFIG);
const initScene = () => Scenes.map(createScenes)

var config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 0 },
        debug: false
    }
  },
  pixelArt: true,
    render: {
        antialias: false,
        pixelArt: true,
        roundPixels: true
    },
  scene: initScene()
};

var game = new Phaser.Game(config);
