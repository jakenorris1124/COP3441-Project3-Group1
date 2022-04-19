export default class LightBallTransformers
{
    /**
     * @param {Phaser.Scene} scene the scene that is creating "LightBallTransformers"
     */
    constructor(scene, lightBallTransformerKey = 'light ball transformer')
    {
        this.scene = scene
        this.key = lightBallTransformerKey

        this._group = this.scene.physics.add.staticGroup()
    }

    get group()
    {
        return this._group
    }

    // Will be implemented later to pick up a lightBallTransformer that has been placed. Not sure
    // if it will be grabbed from UI the same way.
    grabLightBallTransformer(lightBallTransformer)
    {

    }

    place(x = 0, y = 0)
    {
        const lightBallTransformer = this.group.create(x, y, this.key)
    }

    create(x = 0, y = 0)
    {
        const ball = this._group.create(x, y, this.key)

        ball.gameObject.setData('active', false)
    }

    /**
     * @param {Phaser.Physics.Arcade.Body} ball ball who's mass will be amplified
     */
    toggle(ball)
    {
        if (ball.gameObject.getData('active'))
            this.resetMass(ball)
        else
            this.decreaseMass(ball)
    }

    /**
     * @param {Phaser.Physics.Arcade.Body} ball ball who's mass will be amplified
     */
    decreaseMass(ball)
    {
        ball.setMass(ball.mass / 2)
    }

    /**
     * @param {Phaser.Physics.Arcade.Body} ball ball who's mass will be amplified
     */
    resetMass(ball)
    {
        ball.setMass(ball.mass * 2)
    }
}