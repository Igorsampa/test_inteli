import collidable from "../../mixins/collidable.js";
import initAnimations from "./anims/BossAnims.js";

export default class BossLevel2 extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Mixins
    Object.assign(this, collidable);

    this.init();
    this.initEvents();

    // Create Enemy anims
    initAnimations(scene.anims);

    // store the last attack time and setup attack interval and flag
    this.lastAttackTime = 0;
    this.attackInterval = 0;
    this.isAttacking = false;
  }

  init() {
    this.gravity = 1000;
    this.speed = 150;
    this.damage = 25
    this.health = 5

    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
    this.setOrigin(0.5, 1);
    this.setImmovable(true);
    this.setSize(110, 125);
    this.body.offset.y = 19;
    this.setFlipX(true);
    this.setScale(2);
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  isAnimationPlaying(animationName) {
    return (
      this.anims.currentAnim &&
      this.anims.currentAnim.key === animationName &&
      this.anims.isPlaying
    );
  }

  update(time) {
    this.attackInterval = Phaser.Math.Between(1000, 4000)
    // Check if it's time to attack
    if (time - this.lastAttackTime >= this.attackInterval && !this.isAttacking) {
      this.lastAttackTime = time;
      this.isAttacking = true;

      this.play("boss2_attack", true).once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        this.play("boss2_idle", true);
        this.isAttacking = false;
      });
    }
  }

  takesHit(source) {
    this.health -= source.damage
    if(this.health <= 0){
      this.setTint(0xff0000)
      this.setVelocity(0, -200)
      this.body.checkCollision.none = true
      this.setCollideWorldBounds(false)
    } else {
      this.play("boss2_hurt", true)
    }
    source.destroyProjectile()
  }
}
