export default class Goal
{
    /**
     *
     * @param {Phaser.Scene} scene scene in which to spawn the goal
     * @param {int} x x coordinate in which to spawn the goal
     * @param {int} y y coordinate in which to spawn the goal
     * @param {string} Gkey key for the gaol
     * @param {int} ang Angle to rotate the goal by
     */
    constructor(scene, x, y,Gkey, ang)
    {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.key = Gkey;
        this.ang = ang

        this._goal = this.scene.add.sprite(this.x, this.y, this.key)
        this.createSprite()
        this._goal.play('Goal')

        this.rotate()


        this.scene.physics.add.existing(this._goal)
        this._goal.body.immovable = true;
        this._goal.body.allowGravity = false;
    }

    createSprite(){
        // Create 'Goal' animation
        this._goal.anims.create({
            key: 'Goal',
            frames: this._goal.anims.generateFrameNames(this.key, {start: 0, end: 11, zeroPad: 4, prefix: "", suffix: ".png"}),
            frameRate: 20,
            repeat: -1              // set to (-1) to repeat forever
        }); // end of create 'Goal' animation
    }

    rotate(){
        this.goal.setAngle(this.ang)
    }


    /**
     * @returns {Phaser.GameObjects.Rectangle}
     */
    get goal()
    {
        return this._goal
    }
}