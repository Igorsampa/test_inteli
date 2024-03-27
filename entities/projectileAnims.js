export default anims =>{
  // Animate the sprites
  anims.create({
    key: 'projectile_anim',
    frames: anims.generateFrameNumbers('projectile', { start: 0, end: 5}),
    frameRate: 6,
    repeat: -1
  });
}
