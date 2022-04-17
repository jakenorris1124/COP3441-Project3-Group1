export default class Goal
{
    /**
     *
     * @param {Phaser.Scene} scene scene in which to spawn the goal
     * @param {int} x x coordinate in which to spawn the goal
     * @param {int} y y coordinate in which to spawn the goal
     */
    constructor(scene, x, y)
    {
        this.scene = scene;
        this.x = x;
        this.y = y;

        this._group = this.scene.add.rectangle(this.x, this.y, 200, 50, 0x00ff2f)
        this.scene.physics.add.existing(this._group)
        this._group.body.immovable = true;
        this._group.body.allowGravity = false;
    }

    get group()
    {
        return this._group
    }
}