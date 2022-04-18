export default class HeavyBallTransformers
{
    /**
     * @param {Phaser.scene} scene the scene that is creating "HeavyBallTransformers"
     */
    constructor(scene, heavyBallTransformerKey = 'heavyBallTransformer')
    {
        this.scene = scene
        this.key = heavyBallTransformerKey

        this._group = this.scene.physics.add.staticGroup()
    }

    get group()
    {
        return this._group
    }

    // Will be implemented later to pick up a heavyBallTransformer that has been placed. Not sure
    // if it will be grabbed from UI the same way.
    grabHeavyBallTransformer(heavyBallTransformer)
    {

    }

    placer(x = 0, y = 0)
    {
        const heavyBallTransformer = this.group.create(x, y, this.key)

        heavyBallTransformer.setCollideWorldBounds(true)
    }

    create(x = 0, y = 0)
    {
        const ball = this._group.create(x, y, this.key)

        ball.gameObject.setData('active', false)
    }

    /**
     * @param {Phaser.Physics.Arcade.Body} ball ball who's mass will be amplified
     */
    activate(ball)
    {
        if (ball.gameObject.getData('active'))
            this.resetMass(ball)
        else
            this.increaseMass(ball)
    }

    /**
     * @param {Phaser.Physics.Arcade.Body} ball ball who's mass will be amplified
     */
    increaseMass(ball)
    {
        ball.setMass(ball.mass * 2)
    }

    /**
     * @param {Phaser.Physics.Arcade.Body} ball ball who's mass will be amplified
     */
    resetMass(ball)
    {
        ball.setMass(ball.mass / 2)
    }
}