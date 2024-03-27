import initAnimations from "./playerAnims.js";
import collidable from "../mixins/collidable.js";
import Projectiles from "./Projectiles.js";
import HealthBar from "../hud/healthBar.js";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  static instanceCount = 0;

  constructor(scene, x, y, selectedPlayer, oldPlayer) {
    super(scene, x, y);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    Object.assign(this, collidable);

    // Which player art will be used as sprite
    if (selectedPlayer) this.selectedPlayer = selectedPlayer;

    // Set old player properties when recreating
    if (oldPlayer) this.oldPlayer = oldPlayer;
    else this.oldPlayer = false;

    // Track how many Npc is in the scene
    Player.instanceCount++;

    this.init();
    this.initEvents();
  }

  init() {
    // Controls
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.dashKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.attackKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

    // Player properties
    this.setDepth(1);
    this.gravity = this.oldPlayer.gravity || 1000;
    this.body.setGravityY(this.gravity);
    this.playerSpeed = this.oldPlayer.playerSpeed || 250;
    this.jumpSpeed = this.oldPlayer.jumpSpeed || 600;
    this.jumpCount = this.oldPlayer.jumpCount || 0;
    this.consecutiveJumps = this.oldPlayer.consecutiveJumps || 1;
    this.bounceVelocity = this.oldPlayer.bounceVelocity || 400
    this.hasBeenHit = false
    this.allowedNextLevel = false
    this.allowedToShot = this.oldPlayer.allowedToShot || false
    this.allowedToDash = this.oldPlayer.allowedToDash || true

    // Health logic and setup
    const leftTopCornerX = (1280 - (1280 / 0.7)) / 2 + 20
    const leftTopCornerY = (720 - (720 / 0.7)) / 2 + 20
    this.health = 100
    this.hp = new HealthBar(this.scene, leftTopCornerX, leftTopCornerY, this.health)

    // Projectile properties
    this.projectileCooldown = this.oldPlayer.projectileCooldown || 800; // Cooldown in milliseconds
    this.lastProjectileTime = 0; // Timestamp of the last projectile shot
    this.projectiles =  new Projectiles(this.scene, "projectile")
    this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT

    // Checkpoint
    this.checkpointCords = {x: this.x, y: this.y}

    // Dash properties
    this.dashDistance = this.oldPlayer.dashSpeed || 150;
    this.dashDuration = this.oldPlayer.dashDuration || 150;
    this.canDash = this.oldPlayer.canDash || false;

    // Sounds
    this.createSounds(this.scene)

    // Allow update (prevent player from moving)
    this.updateEnabled = true;

    // Collider
    this.setSize(40, 115);
    this.body.setOffset(110, 70);
    this.setCollideWorldBounds(true);

    // This if is just to not recriate animations.
    if (Player.instanceCount <= 1)
      initAnimations(this.scene.anims, this.selectedPlayer);
  }

  createSounds(scene) {
    this.jumpSound = scene.sound.add('jump_sound', {loop: false, volume: 0.2, rate: 1.5})
    switch (this.scene.sys.settings.key) {
      case "level1":
        this.walkSound = scene.sound.add("floor_sound", {loop: false, volume: 0.2, rate: 0.55});
        break;
      case "level2":
        this.walkSound = scene.sound.add("grass_sound", {loop: false, volume: 0.8, rate: 0.65});
        break;
      case "level3":
        this.walkSound = scene.sound.add("grass_sound", {loop: false, volume: 0.8, rate: 0.65});
        break;
      // add mais dps
      default:
        break;
    }
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  pauseUpdate() {
    this.updateEnabled = false;
    this.setVelocityX(0);
    this.play('player_idle')
  }

  resumeUpdate() {
    this.updateEnabled = true;
  }

  collectPowerUp(powerup) {
    switch (powerup) {
      case 'rexona':
        console.log("Collect Rexona, allowed to shot, next level allowed");
        this.scene.sound.add("collect_powerup_sound", {loop: false, volume: 0.8, rate: 2}).play()
        this.allowedToShot = true; // Powerup properties
        this.allowedNextLevel = true // Allow player to switch level
        this.powerupTutorial(powerup)
        break;

      case 'omo':
        console.log("Collect Omo, projectile cooldown reduce, next level allowed");
        this.scene.sound.add("collect_powerup_sound", {loop: false, volume: 0.8, rate: 2}).play()
        this.projectileCooldown = 400; // Powerup properties
        this.allowedNextLevel = true // Allow player to switch level
        // this.powerupTutorial(powerup)
        break;

      case 'kibon':
        console.log("Collect Kibon, allowed to dash, next level allowed");
        this.scene.sound.add("collect_powerup_sound", {loop: false, volume: 0.8, rate: 2}).play()
        this.allowedToDash = true; // Powerup properties
        this.allowedNextLevel = true // Allow player to switch level
        this.powerupTutorial(powerup)
        break;

      default:
        break;
    }
  }

  powerupTutorial(powerup) {
    // Set image spawn based on powerup
    let centerX = 0
    let centerY = 0
    if(powerup === 'rexona') {
      centerX = this.scene.cameras.main.centerX;
      centerY = this.scene.cameras.main.centerY;
    } else {
      centerX = this.x;
      centerY = this.y;
    }

    // Create window and close button logic
    if (!this.videoTutorial) this.videoTutorial = this.scene.add.video(centerX, centerY, `${powerup}Tutorial`).setDepth(2).setScale(0.5);
    this.videoTutorial.setLoop(true)
    this.videoTutorial.play()
    if (!this.XBtn) this.XBtn = this.scene.add.image(centerX + 400, centerY - 200, 'hub_close').setInteractive().setDepth(3).setScale(0.065);
    // Close button
    this.XBtn.on('pointerdown', () => {
      console.log("close");
      if (this.XBtn) this.XBtn.destroy();
      if (this.videoTutorial) {
        this.videoTutorial.destroy();
        this.videoTutorial.stop()
      }
      this.XBtn = null
      this.videoTutorial = null
      this.resumeUpdate() // Re-allow player movement
    });
  }

  update() {
    if (this.y > 1960 && this.scene.sys.settings.key === "level2") {
      this.setPosition(this.checkpointCords.x, this.checkpointCords.y);
      this.hp.restoreHp();
      console.log("Player died, respawned at checkpoint")
    }
    else if (this.y > 3100 && this.scene.sys.settings.key === "level3") {
      this.setPosition(this.checkpointCords.x, this.checkpointCords.y);
      this.hp.restoreHp();
      console.log("Player died, respawned at checkpoint")
    }
    console.log(this.y) 
    // If player update is paused, do nothing
    if (!this.updateEnabled || this.hasBeenHit) {
      return;
    }

    const { left, right, down, up } = this.cursors;
    const isWJustDown = Phaser.Input.Keyboard.JustDown(this.dashKey);
    const isQJustDown = Phaser.Input.Keyboard.JustDown(this.attackKey);
    const isUpJustDown = Phaser.Input.Keyboard.JustDown(up);
    const onFloor = this.body.onFloor();

    this.playerVelocityY = this.body.velocity.y;

    if (this.anims.isPlaying && this.anims.getName() === 'player_attack') {
      this.setVelocity(0, 0)
      return
    }

    // Movement and movement sound logic
    if (left.isDown) {
      this.lastDirection = Phaser.Physics.Arcade.FACING_LEFT
      this.setFlip(true, false);
      this.setVelocityX(-this.playerSpeed);
      this.play("player_run", true);
      if (!this.walkSound.isPlaying)
        this.walkSound.play();
    } else if (right.isDown) {
      this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT
      this.setFlip(false, false);
      this.setVelocityX(this.playerSpeed);
      this.play("player_run", true);
      if (!this.walkSound.isPlaying)
        this.walkSound.play();
    } else {
      this.setVelocityX(0);
      this.play("player_idle", true);
        this.walkSound.pause();
    }

    // stops walking sounds when player jumps
    if (!onFloor && this.walkSound.isPlaying) this.walkSound.pause()

    // Jump logic
    if (isUpJustDown && (onFloor || this.jumpCount < this.consecutiveJumps)) {
      this.jumpCount++;
      this.setVelocityY(-this.jumpSpeed)
      this.jumpSound.play()
    }

    // Attack Logic
    if (isQJustDown && this.allowedToShot) {
      const currentTime = this.scene.time.now;

      // Check if enough time has passed
      if (currentTime - this.lastProjectileTime > this.projectileCooldown) {
        // var projectile = new Projectiles(this.scene, this.x, this.y, "projectile", this.flipX);
        this.projectiles.fireProjectile(this)

        // Update the last projectile time
        this.lastProjectileTime = currentTime;

        // Shoot anim
        this.play("player_attack", true);
      }
    }

    // Dash logic
    if (isWJustDown && this.canDash && this.allowedToDash) {
      let dashX = 0;
      let dashY = 0;

      if (left.isDown) dashX = -1;
      else if (right.isDown) dashX = 1;

      if (up.isDown) dashY = -1;
      else if (down.isDown) dashY = 1;

      this.pauseUpdate()
      this.play('player_dash', true)
      this.scene.sound.add("dash_sound", {loop: false, volume: 0.2, rate: 1.2}).play()

      // Calculate the target position for the dash
      const targetX = this.x + dashX * this.dashDistance;
      const targetY = this.y + dashY * this.dashDistance;

      this.scene.tweens.add({
        targets: this,
        x: targetX,
        y: targetY,
        duration: this.dashDuration,
        onStart: () => {
          this.body.setAllowGravity(false);
          this.body.enable = false; // Disable physics body during the dash
        },
        onComplete: () => {
          this.body.setAllowGravity(true);
          this.body.enable = true; // Re-enable physics body
        }
      });
      this.resumeUpdate()

      this.canDash = false;
    }

    // Reset `canDash` when landing on the ground
    if (onFloor && !this.canDash && !Phaser.Input.Keyboard.JustDown(this.dashKey)) {
      this.canDash = true;
    }

    // Animation logic for jumping and falling
    if (!onFloor) {
      this.play("player_jump", true);
      if (this.playerVelocityY > 0) this.play("player_fall", true);
    }
    // Reset jump count and dash availability on landing
    if (onFloor) {
      this.jumpCount = 0
    }

    // Prevents player from falling too fast and passing through the ground
    const maxFallSpeed = 1000
    if (this.playerVelocityY > maxFallSpeed) {
      this.body.setVelocityY(maxFallSpeed)
    }
  }

  takesHit(enemy) {
    if (this.hasBeenHit) return
    this.hasBeenHit = true
    console.log("Hit");

    this.hp.decrease(enemy.damage) // Monster damage
    // Check if player died
    if(this.hp.currentHp() < 1) {
      // Dead
      console.log("Morri");
      this.die()
    } else {
      // Hurt
      this.bounceOff()
    }

    this.scene.time.delayedCall(500, () => {this.hasBeenHit = false})
  }

  die() {
    // Go to checkpointCords and get full hp
    this.setPosition(this.checkpointCords.x, this.checkpointCords.y)
    this.hp.restoreHp()
  }

  bounceOff() {
    // if hitted by right side, bounce to right, else to left
    this.body.touching.right ?
      this.setVelocityX(-this.bounceVelocity) :
      this.setVelocityX(this.bounceVelocity)

    setTimeout(() => this.setVelocityY(-this.bounceVelocity), 0)
  }

  checkPoint() {
    // Update checkpoint
    this.checkpointCords = {x: this.x, y: this.y}
  }
}
