export default class TutorialScreen extends Phaser.Scene {
  constructor() {
    super("tutorialScreen");
  }

  create() {
    this.video = this.add.video(0, 0, 'tutorial').setOrigin(0, 0); // Create and position video
    this.video.play() // Play video

    this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E); // Interact key

    this.playerSelecionado = this.sys.settings.data.playerSelecionado; // Pass selected player to level1
  }

  update() {
    // Start Game
    if(Phaser.Input.Keyboard.JustDown(this.interactKey)) {
      this.video.stop() // Stop video
      this.sound.add('select_sound', {loop: false, volume: 0.7}).play() // Select Sound
      this.startGame() // Start game
    }
  }

  startGame() {
    // Fade effect to transition and pass the scene when the effect is done with personagemSelecionado
    this.cameras.main.fadeOut(500, 0, 0, 0, (camera, progress) => {
      console.log('StartLevel1');
      this.sys.settings.data.titleMusicObject.stop();
      if(progress === 1) this.scene.start("level1", { playerSelecionado: this.playerSelecionado})
    })
  }
}
