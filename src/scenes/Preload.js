export default class Preload extends Phaser.Scene {
  constructor() {
    super("preload");
  }

  preload() {
    this.load.image("bg1", "assets/level2/back.png");

    // ------------------------------------------------------------------
    // playerSelect
    this.load.spritesheet("frame1F", "assets/selection/selection1F.png", { frameWidth: 256, frameHeight: 256 })
    this.load.spritesheet("frame1M", "assets/selection/selection1M.png", { frameWidth: 256, frameHeight: 256 })
    this.load.spritesheet("frame2F", "assets/selection/selection2F.png", { frameWidth: 256, frameHeight: 256 })
    this.load.spritesheet("frame2M", "assets/selection/selection2M.png", { frameWidth: 256, frameHeight: 256 })
    this.load.image("blue-bg", "assets/selection/bg-lightblue.png")
    // ------------------------------------------------------------------
    // Tutorial
    this.load.video('tutorial', 'assets/links/videoTutorial1.mp4');
    this.load.image('rexonaTutorial', 'assets/links/paginaTutorialTeclaQ.png')
    // ------------------------------------------------------------------
    // level1
    this.load.tilemapTiledJSON('level1', 'assets/level1/sceneInterior.json');
    this.load.image('level1_t1', 'assets/level1/level1_t1.png');
    this.load.image('level1_t2', 'assets/level1/level1_t2.png');
    this.load.image('level1_t3', 'assets/level1/level1_t3.png');
    // ------------------------------------------------------------------
    // Level2
    this.load.tilemapTiledJSON('level2', 'assets/level2/mundo_ludico.json');
    this.load.image('level2_t1', 'assets/level2/level2_t1.png');
    this.load.image('level2_t2', 'assets/level2/level2_t2.png');
    this.load.image('bg_cloud', 'assets/level2/background/bg-cloud.png');
    this.load.image('bg_color_blue', 'assets/level2/background/bg-color-blue.png');
    this.load.image('bg_color_green', 'assets/level2/background/bg-color-green.png');
    this.load.image('bg_foreground', 'assets/level2/background/foreground.png');
    this.load.image('bg_hills', 'assets/level2/background/hills.png');
    this.load.image('placa_unilever', 'assets/level2/placa_unilever.png');
    this.load.spritesheet('aviao_unilever', 'assets/level2/aviao_unilever.png', { frameWidth: 256, frameHeight: 144 });
    this.load.spritesheet('balao_unilever', 'assets/level2/balao_unilever.png', { frameWidth: 192, frameHeight: 256 });
    // ------------------------------------------------------------------
    // Level3
    this.load.tilemapTiledJSON('level3', 'assets/level3/mundo_cidade.json');
    this.load.image('buildings', 'assets/level3/buildings_t1.png')
    this.load.image('road', 'assets/level3/road.png')
    this.load.image('predios_env', 'assets/level3/predios.png')
    this.load.image('ceu_bg', 'assets/level3/ceu.png')
    this.load.image('nuvem_bg', 'assets/level3/nuvem.png')
    this.load.image('predios_bg', 'assets/level3/predios_bg.png')

    // ------------------------------------------------------------------
    // Hub
    this.load.spritesheet('hub_sprite', 'assets/level2/dvd_npc.png', { frameWidth: 256, frameHeight: 160 });
    this.load.image('hub_screen', 'assets/links/links_screen.png');
    this.load.image('hub_close', 'assets/links/x_button.png');
    this.load.spritesheet('hub_link_button', 'assets/links/link_button.png', { frameWidth: 128, frameHeight: 128 })
  // ------------------------------------------------------------------
    // Quiz
    this.load.image('quiz_window', 'assets/quiz/quiz_window.png');
    this.load.image('quiz_button_A', 'assets/quiz/quiz_button_A.png');
    this.load.image('quiz_button_B', 'assets/quiz/quiz_button_B.png');
    this.load.image('quiz_button_C', 'assets/quiz/quiz_button_C.png');
    // ------------------------------------------------------------------
    // Players
    this.load.spritesheet("projectile", "./assets/player/projectiles/projectile_rexonna2.png", { frameWidth: 254, frameHeight: 232 });
    this.load.spritesheet("player1", "assets/player/player1.png", { frameWidth: 256, frameHeight: 256 });
    this.load.spritesheet("player2", "assets/player/player2.png", { frameWidth: 256, frameHeight: 256 });
    this.load.spritesheet("player3", "assets/player/player3.png", { frameWidth: 256, frameHeight: 256 });
    this.load.spritesheet("player4", "assets/player/player4.png", { frameWidth: 256, frameHeight: 256 });
    this.load.spritesheet("dash_anim", "assets/player/dash.png", { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet("collect_sprite", "assets/player/collect_sprite.png", { frameWidth: 256, frameHeight: 208 });
    //-------------------------------------------------------------------
    // enemies
    this.load.spritesheet('green_slime', 'assets/enemies/green_slime.png', {frameWidth:128,frameHeight:128});
    this.load.spritesheet('purple_slime', 'assets/enemies/purple_slime.png', {frameWidth:128,frameHeight:128});
    this.load.spritesheet('graySmoke', 'assets/enemies/smoke.png', {frameWidth:128,frameHeight:128});
    this.load.spritesheet('boss_level2', 'assets/sprites/Enemy/treeboss.png', {frameWidth:192,frameHeight:176});

    // ------------------------------------------------------------------
    // Npcs
    this.load.spritesheet("computer_sprite", "assets/level1/computer.png", { frameWidth: 320, frameHeight: 192 });
    this.load.spritesheet("rexona_sprite", "assets/level1/rexona.png", { frameWidth: 128, frameHeight: 192 });
    this.load.image('reuniaoTeams', 'assets/level1/reuniaoTeams.png');
    this.load.image("Ekey", "assets/player/E.png");
    this.load.spritesheet('omo_sprite', 'assets/level2/omo.png', {frameWidth: 100, frameHeight: 160})
    // ------------------------------------------------------------------
    // Sound effects and music
    this.load.audio("grass_sound", "assets/sounds/level2/lvl_2_grass_walk.ogg");
    this.load.audio("floor_sound", "assets/sounds/level1/lvl_1_floor_walk.ogg");
    this.load.audio("jump_sound", "assets/sounds/jump_sound.mp3");
    this.load.audio("music_level1", "assets/sounds/level1/music_level_1.mp3");
    this.load.audio("open_level1", "assets/sounds/level1/open_level_1.ogg");
    this.load.audio("dialog_sound", "assets/sounds/dialog_sound.ogg");
    this.load.audio("hover_sound", "assets/sounds/hover_sound.wav");
    this.load.audio("select_sound", "assets/sounds/select_sound.wav");
    this.load.audio("music_level2", "assets/sounds/level2/lvl_2_theme.mp3");
    this.load.audio("door_sound", "assets/sounds/level1/door_sound.mp3");
    this.load.audio("collect_powerup_sound", "assets/sounds/collect_powerup_sound.mp3");
    this.load.audio("dash_sound", "assets/sounds/dash_sound.wav");


    // Completed
    this.load.once('complete', () => {
      console.log('Assets Loaded');
      this.startSelectScreen();
    })
  }

  startSelectScreen() {
    console.log('Player Select');
    this.scene.start("playerSelect", {titleMusicObject: this.sys.settings.data.titleMusicObject})
  }
}
