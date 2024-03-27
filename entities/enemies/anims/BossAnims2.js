export default (anims) => {
    anims.create({
        key: 'boss3_idle',
        frames: anims.generateFrameNumbers('boss_level3', { start: 0, end: 7 }),
        frameRate: 5,
        repeat: -1,
    });

    anims.create({
        key: 'boss3_hurt',
        frames: anims.generateFrameNumbers('boss_level3', { start: 8, end: 11 }),
        frameRate: 4,
        repeat: 0
    });
  };