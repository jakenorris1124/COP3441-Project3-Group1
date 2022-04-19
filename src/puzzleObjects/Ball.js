export default class Balls
{
    /**
     * @param {Phaser.Scene} scene
     */
    constructor(scene, ballKey = 'ball')
    {
        this.scene = scene
        this.key = ballKey

        this._group = this.scene.physics.add.group()
    }

    get group()
    {
        return this._group
    }

    // Creates a ball object with default settings
    createStandardBall(x = 500, y = 350)
    {
        const ball = this._group.create(x, y, this.key).setScale(0.2)

        // These values are not tested and will very likely need to be modified
        // as I have no idea what they're like yet.
        ball.body.setBounce(1, 1)
        ball.body.setMass(50)
        ball.body.setFriction(.3, .3)

        return ball
    }

    inGoal(goal, ball, xMaxSpeed = 0, yMaxSpeed = 0)
    {
        // Line needed here: if (check that ball is inside the goal)
        return ball.speedX < xMaxSpeed && ball.speedY < yMaxSpeed;
    }
}