import Projectile from "./Projectile.js";

export default class Projectiles extends Phaser.Physics.Arcade.Group {
  constructor(scene, projectileSprite) {
    super(scene.physics.world, scene)

    this.createMultiple({
      frameQuantity: 5,
      active: false,
      visible: false,
      key: projectileSprite,
      classType: Projectile
    })
  }

  fireProjectile(initiator){
    const projectile = this.getFirstDead(false)

    if (!projectile) return

    if(initiator.lastDirection === Phaser.Physics.Arcade.FACING_RIGHT) {
      projectile.speed = Math.abs(projectile.speed)
      projectile.setFlipX(false)
    } else {
      projectile.speed = -Math.abs(projectile.speed)
      projectile.setFlipX(true)
    }

    projectile.fire(initiator.x, initiator.y)
  }
}
