import initAnimations from "./projectileAnims.js";

export default class Projectile extends Phaser.Physics.Arcade.Sprite {
    static instanceCount = 0;
    constructor(scene, x, y, sprite){
        super(scene, x + 30, y, sprite);

        scene.add.existing(this).setScale(0.8).setDepth(4)
        scene.physics.add.existing(this)

        this.speed = 800
        this.maxDistance = 1000
        this.traveledDistance = 0

        this.setSize(140, 80)
        this.body.setOffset(75, 90)

        this.damage = 1

        // this.init()
        Projectile.instanceCount++
        if (Projectile.instanceCount <= 1)
          initAnimations(this.scene.anims);
    }

    preUpdate(time, delta) {
      super.preUpdate(time, delta)
      this.traveledDistance += this.body.deltaAbsX()

      if (this.traveledDistance >= this.maxDistance) {
        this.destroyProjectile()
        this.traveledDistance = 0
      }
    }

    fire(x, y) {
      this.body.reset(x,y)
      this.setActive(true)
      this.setVisible(true)
      this.setVelocityX(this.speed)
      this.play("projectile_anim", true)
    }

    destroyProjectile() {
      this.body.reset(0,0)
      this.setActive(false)
      this.setVisible(false)
      console.log("destroy projectile");
    }
}
