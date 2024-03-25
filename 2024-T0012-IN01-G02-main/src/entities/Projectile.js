export default class Projectile extends Phaser.Physics.Arcade.Sprite{
    static instanceCount = 0;
    constructor(scene, x, y, sprite, facingDirection){
        super(scene, x + 30, y, sprite);
        this.facingDirection = facingDirection;
        this.init()
        this.initEvents()
        Projectile.instanceCount++
    }

    init() {
        this.scene.physics.world.enable(this)
          this.setSize(140, 80);
          this.body.setOffset(75, 90)
        this.play("projectile_anim", true)
        this.scene.add.existing(this).setDepth(4).setScale(0.8)
        this.isDestroyed = false;
        this.projetileVelocity = 5
        this.projetileAcceleration = 0.25
        this.timeToDestroy = 1100
        this.scene.time.delayedCall(this.timeToDestroy, () => {
          this.destroyInstance()
          
        })

        if(this.facingDirection)
        {
          this.projetileVelocity *= -1
          this.projetileAcceleration *= -1
          this.setFlipX(true)
        }
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {
        this.x += this.projetileVelocity
        this.projetileVelocity += this.projetileAcceleration
    }

    checkProjectileSlimeCollision(Slime) {
        this.scene.physics.overlap(this, Slime, () => {
          this.destroy();
      
        });
      }


    destroyInstance() {
      // If already destroyed, do nothing
      if (this.isDestroyed) return;

      // Mark this instance as destroyed
      this.isDestroyed = true;

      // Unregister the update function from the scene's update event
      this.scene.events.removeListener(Phaser.Scenes.Events.UPDATE, this.update, this);

      // Remove physics from NPC
      if (this.body) {
        this.scene.physics.world.remove(this.body)
      }

      Projectile.instanceCount--;

      // Finally, call the superclass destroy method
      super.destroy();
    }
}
