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

        this._goal = this.scene.add.rectangle(this.x, this.y, 200, 50, 0x00ff2f)

        this.scene.physics.add.existing(this._goal)
        this._goal.body.immovable = true;
        this._goal.body.allowGravity = false;
    }

    get goal()
    {
        return this._goal
    }
}