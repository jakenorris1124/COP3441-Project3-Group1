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

    placeHeavyBallTransformer(x = 0, y = 0)
    {
        const heavyBallTransformer = this.group.create(x, y, this.key)

        heavyBallTransformer.setCollideWorldBounds(true)
    }

    /**
     * @param {Object} ball ball who's mass will be amplified
     */
    increaseMass(ball)
    {
        ball.setMass(ball.mass * 2)
    }

    /**
     * @param {Object} ball ball who's mass will be amplified
     */
    resetMass(ball)
    {
        ball.setMass(ball.mass / 2)
    }
}