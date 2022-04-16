export default class LightBallTransformers
{
    /**
     * @param {Phaser.scene} scene the scene that is creating "LightBallTransformers"
     */
    constructor(scene, lightBallTransformerKey = 'lightBallTransformer')
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

    placeLightBallTransformer(x = 0, y = 0)
    {
        const lightBallTransformer = this.group.create(x, y, this.key)

        lightBallTransformer.setCollideWorldBounds(true)
    }

    /**
     * @param {Object} ball ball who's mass will be amplified
     */
    decreaseMass(ball)
    {
        ball.setMass(ball.mass / 2)
    }

    /**
     * @param {Object} ball ball who's mass will be amplified
     */
    resetMass(ball)
    {
        ball.setMass(ball.mass * 2)
    }
}