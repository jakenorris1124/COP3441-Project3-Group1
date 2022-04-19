export default class HeavyBallTransformers
{
    /**
     * @param {Phaser.Scene} scene the scene that is creating "HeavyBallTransformers"
     */
    constructor(scene, heavyBallTransformerKey = 'heavy ball transformer')
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
    }

    create(x = 0, y = 0)
    {
        const ball = this._group.create(x, y, this.key)

        ball.gameObject.setData('active', false)
    }

    /**
     * @param {Phaser.Physics.Arcade.Body} ball ball who's mass will be amplified
     * @param {Phaser.Physics.Arcade.StaticBody} heavyBallTransformer Heavy Ball Transformer that ball collided with.
     */
    toggle(ball, heavyBallTransformer)
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