export default class Balls
{
    /**
     * @param {Phaser.Scene} scene
     * @param {string} ballKey
     */
    constructor(scene, ballKey)
    {
        this.scene = scene
        this.key = ballKey

        this._group = this.scene.physics.add.group()
    }

    createSprite(){
        // Create 'Heavy' animation
        this.ball.anims.create({
            key: 'Heavy',
            frames: this.ball.anims.generateFrameNames(this.key, {start: 0, end: 11, zeroPad: 4, prefix: "", suffix: ".png"}),
            frameRate: 8,
            repeat: -1              // set to (-1) to repeat forever
        }); // end of create 'Heavy' animation

        // Create 'Light' animation
        this.scene.anims.create({
            key: 'Light',
            frames: this.ball.anims.generateFrameNames(this.key, {start: 12, end: 23, zeroPad: 4, prefix: "", suffix: ".png"}),
            frameRate: 2,
            repeat: -1              // set to (-1) to repeat forever
        }); // end of create 'Light' animation

        // Create 'Reg' animation
        this.scene.anims.create({
            key: 'Reg',
            frames: this.ball.anims.generateFrameNames(this.key, {start: 24, end: 35, zeroPad: 4, prefix: "", suffix: ".png"}),
            frameRate: 2,
            repeat: -1              // set to (-1) to repeat forever
        }); // end of create 'Reg' animation
    }

    /**
     * @returns {Phaser.Physics.Arcade.Group}
     */
    get group()
    {
        return this._group
    }

    /**
     * Creates a ball object with default settings
     * @param {number} x
     * @param {number} y
     * @return {Phaser.GameObjects.Sprite}
     */
    createStandardBall(x = 500, y = 350)
    {
        const ball = this.scene.add.sprite(x, y, this.key).setScale(2)
        this.createSprite()
        ball.playReverse('Reg')
        this._group.add(ball)

        ball.setData('lock', false)

        let radius = ball.body.sourceHeight / 2
        ball.body.setCircle(radius)

        // These values are not tested and will very likely need to be modified
        // as I have no idea what they're like yet.
        ball.body.setCollideWorldBounds(true)
        ball.body.setBounce(.5, .5)
        ball.body.setMass(50)
        ball.body.setFriction(.1, .1)

        return ball
    }

    inGoal(goal, ball, xMaxSpeed = 0, yMaxSpeed = 0)
    {
        // Line needed here: if (check that ball is inside the goal)
        return ball.speedX < xMaxSpeed && ball.speedY < yMaxSpeed;
    }
}