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

        let bounds = lightBallTransformer.getBounds()
        let left = bounds.x
        let top = bounds.y
        let bottom = bounds.bottom
        let width = lightBallTransformer.getWidth()
        let height = 20

        //Will need to adjust these collision boxes
        topCollisionBox.setBoundsRectangle(new Phaser.geom.rectangle(left, top, width, height))
        bottomCollisionBox.setBoundsRectangle(new Phaser.geom.rectangle(left, bottom - height, width, height))
        lightBallTransformer.setHeight(lightBallTransformer.getHeight() - (2 * height))

        lightBallTransformer.gameObject.setActive(false)
    }

    /**
     * @param {Phaser.Physics.Arcade.Body} ball ball who's mass will be amplified
     */
    toggle(ball)
    {
        if (ball.gameObject.active)
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