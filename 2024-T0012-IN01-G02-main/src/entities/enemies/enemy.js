import collidable from "../../mixins/collidable.js";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Mixins
        Object.assign(this, collidable);

        this.init();
        this.initEvents();
    }

    // initiate based properties
    init() {
        this.gravity = 1000;
        this.speed = 150;
        this.rayGraphics = this.scene.add.graphics({
            lineStyle: { width: 2, color: 0xaa00aa },
        });

        this.body.setGravityY(this.gravity);
        this.setCollideWorldBounds(true);
        this.setOrigin(0.5, 1);
        this.setImmovable(true);
        this.setSize(this.width, this.height);
    }

    // initiate update function
    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }
}
