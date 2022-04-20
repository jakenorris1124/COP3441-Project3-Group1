import Phaser from 'phaser'

export default class HeavyBallTransformers
{
    /**
     * @param {Phaser.Scene} scene the scene that is creating "HeavyBallTransformers"
     * @param {string} heavyBallTransformerKey
     */
    constructor(scene, heavyBallTransformerKey = 'heavy ball transformer')
    {
        this.scene = scene
        this.key = heavyBallTransformerKey
        this.togglable = true

        this._group = this.scene.physics.add.staticGroup()
        this._boundaryGroup = this.scene.physics.add.staticGroup()
    }

    /**
     * @returns {Phaser.Physics.Arcade.StaticGroup}
     */
    get group()
    {
        return this._group
    }

    /**
     * @returns {Phaser.Physics.Arcade.StaticGroup}
     */
    get boundaryGroup()
    {
        return this._boundaryGroup
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    place(x = 0, y = 0)
    {
        const heavyBallTransformer = this.scene.add.sprite(x, y, this.key)
        this._group.add(heavyBallTransformer)
        const topCollisionBox = this._boundaryGroup.create()
        const bottomCollisionBox = this._boundaryGroup.create()

        let bounds = heavyBallTransformer.body.getBounds()
        let left = bounds.x
        let top = bounds.y
        let bottom = bounds.bottom
        let width = heavyBallTransformer.body.sourceWidth
        let height = 20

        //Will need to adjust these collision boxes
        topCollisionBox.body.setBoundsRectangle(new Phaser.geom.rectangle(left, top, width, height))
        bottomCollisionBox.body.setBoundsRectangle(new Phaser.geom.rectangle(left, bottom - height, width, height))
        heavyBallTransformer.body.sourceHeight -= 2 * height


        heavyBallTransformer.setActive(false)
    }

    /**
     * @param {Phaser.GameObjects.Sprite} ball ball who's mass will be amplified
     * @param {Phaser.GameObjects.Sprite} heavyBallTransformer Heavy Ball Transformer that ball collided with.
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