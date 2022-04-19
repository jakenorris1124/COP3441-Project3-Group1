import Phaser from "phaser";

export default class LightBallTransformers
{
    /**
     * @param {Phaser.Scene} scene the scene that is creating "LightBallTransformers"
     */
    constructor(scene, lightBallTransformerKey = 'light ball transformer')
    {
        this.scene = scene
        this.key = lightBallTransformerKey
        this.togglable = true

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
        const lightBallTransformer = this._group.create(x, y, this.key)
        const topCollisionBox = this._boundaryGroup.create()
        const bottomCollisionBox = this._boundaryGroup.create()

        let bounds = lightBallTransformer.body.getBounds()
        let left = bounds.x
        let top = bounds.y
        let bottom = bounds.bottom
        let width = lightBallTransformer.body.getWidth()
        let height = 20

        //Will need to adjust these collision boxes
        topCollisionBox.body.setBoundsRectangle(new Phaser.geom.rectangle(left, top, width, height))
        bottomCollisionBox.body.setBoundsRectangle(new Phaser.geom.rectangle(left, bottom - height, width, height))
        lightBallTransformer.body.setHeight(lightBallTransformer.getHeight() - (2 * height))

        lightBallTransformer.setActive(false)
    }

    /**
     * @param {Phaser.GameObjects.GameObject} ball ball who's mass will be amplified
     * @param {Phaser.GameObjects.GameObject} lightBallTransformer
     */
    toggle(ball, lightBallTransformer)
    {
        if (lightBallTransformer.active)
            this.resetMass(ball.body)
        else
            this.decreaseMass(ball.body)
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