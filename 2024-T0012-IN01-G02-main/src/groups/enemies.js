import collidable from "../mixins/collidable.js";
import GreenSlime from "../entities/enemies/greenSlime.js";
import PurpleSlime from "../entities/enemies/purpleSlime.js";


export default class enemies extends Phaser.GameObjects.Group {
    constructor(scene) {
        super(scene);

        Object.assign(this, collidable);
    }

    getTypes() {
        const enemyTypes = {
            GreenSlime: GreenSlime,
            PurpleSlime: PurpleSlime,
        }
        return enemyTypes
    }
}   