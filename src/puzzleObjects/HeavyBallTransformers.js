import Phaser from 'phaser'

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
        this._boundaryGroup = this.scene.physics.add.staticGroup()
    }

    get group()
    {
        return this._group
    }

    get boundaryGroup()
    {
        return this._boundaryGroup
    }

    // Will be implemented later to pick up a heavyBallTransformer that has been placed. Not sure
    // if it will be grabbed from UI the same way.
    grabHeavyBallTransformer(heavyBallTransformer)
    {

    }

    create(x = 0, y = 0)
    {
        const heavyBallTransformer = this._group.create(x, y, this.key)
        const topCollisionBox = this._boundaryGroup.create()
        const bottomCollisionBox = this._boundaryGroup.create()

        let bounds = heavyBallTransformer.body.getBounds()
        let left = bounds.x
        let top = bounds.y
        let bottom = bounds.bottom
        let width = heavyBallTransformer.body.getWidth()
        let height = 20

        //Will need to adjust these collision boxes
        topCollisionBox.body.setBoundsRectangle(new Phaser.geom.rectangle(left, top, width, height))
        bottomCollisionBox.body.setBoundsRectangle(new Phaser.geom.rectangle(left, bottom - height, width, height))
        heavyBallTransformer.body.setHeight(heavyBallTransformer.getHeight() - (2 * height))


        heavyBallTransformer.setActive(false)
    }

    /**
     * @param {Phaser.GameObjects.GameObject} ball ball who's mass will be amplified
     * @param {Phaser.GameObjects.GameObject} heavyBallTransformer Heavy Ball Transformer that ball collided with.
     */
    toggle(ball, heavyBallTransformer)
    {
        if (heavyBallTransformer.active)
            this.resetMass(ball.body)
        else
            this.increaseMass(ball.body)
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