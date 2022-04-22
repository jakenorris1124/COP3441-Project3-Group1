export default class Balls
{
    /**
     * @param {Phaser.Scene} scene
     * @param {string} ballKey
     */
    constructor(scene, ballKey = 'ball')
    {
        this.scene = scene
        this.key = ballKey
        this.lock = false

        this._group = this.scene.physics.add.group()
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
        const ball = this.scene.add.sprite(x, y, this.key).setScale(0.165)
        this._group.add(ball)

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