import collidable from "../mixins/collidable.js";
import GreenSlime from "../entities/enemies/greenSlime.js";
import PurpleSlime from "../entities/enemies/purpleSlime.js";
import graySmoke from "../entities/enemies/graySmoke.js"


export default class Enemies extends Phaser.GameObjects.Group {
    constructor(scene) {
        super(scene);

        Object.assign(this, collidable);
    }

    getTypes() {
        const enemyTypes = {
            GreenSlime: GreenSlime,
            PurpleSlime: PurpleSlime,
            graySmoke: graySmoke
        }
        return enemyTypes
    }
}   