import Phaser from 'phaser'

const ON = 1
const OFF = 0

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

        heavyBallTransformer.setData('topCollisionBox', topCollisionBox)
        heavyBallTransformer.setData('bottomCollisionBox', bottomCollisionBox)
        heavyBallTransformer.setName('heavyBallTransformer')

        let bounds = heavyBallTransformer.getBounds()
        let left = bounds.x
        let top = bounds.y
        let bottom = bounds.bottom
        let width = heavyBallTransformer.body.width
        let height = 20

        //Will need to adjust these collision boxes
        topCollisionBox.body.x = left
        topCollisionBox.body.y = top
        topCollisionBox.body.width = width
        topCollisionBox.body.height = height

        bottomCollisionBox.body.x = left
        bottomCollisionBox.body.y = bottom - height
        bottomCollisionBox.body.width = width
        bottomCollisionBox.body.height = height

        heavyBallTransformer.body.height -= 2 * height
        heavyBallTransformer.body.y += height

        heavyBallTransformer.setState(OFF)

        return heavyBallTransformer
    }

    /**
     * @param {Phaser.GameObjects.Sprite} ball ball who's mass will be amplified
     * @param {Phaser.GameObjects.Sprite} heavyBallTransformer Heavy Ball Transformer that ball collided with.
     */
    toggle(ball, heavyBallTransformer)
    {
        if (heavyBallTransformer.state == ON)
        {
            this.resetMass(ball.body)
            heavyBallTransformer.setState(OFF)
        }
        else
        {
            this.increaseMass(ball.body)
            heavyBallTransformer.setState(ON)
        }
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

    /**
     * @param {Phaser.GameObjects.Sprite} heavyBallTransformer
     */
    static rotateBoundaries(heavyBallTransformer)
    {
        const topBound = heavyBallTransformer.getData('topCollisionBox')
        const bottomBound = heavyBallTransformer.getData('bottomCollisionBox')

        topBound.setAngle(heavyBallTransformer.angle)
        bottomBound.setAngle(heavyBallTransformer.angle)

        let newHeight = topBound.body.width
        let newWidth = topBound.body.height
        topBound.body.setSize(newWidth, newHeight)
        bottomBound.body.setSize(newWidth, newHeight)

        let bounds = heavyBallTransformer.getBounds()
        let left = bounds.x
        let top = bounds.y
        let bottom = bounds.bottom
        let right = bounds.right
        let height = 40

        heavyBallTransformer.body.y = top

        let topX
        let topY
        let botX
        let botY

        switch (heavyBallTransformer.angle)
        {
            case 0:
                topX = heavyBallTransformer.body.position.x
                topY = top
                botX = heavyBallTransformer.body.position.x
                botY = bottom - (1/2 * height)
                heavyBallTransformer.body.y = top + (1/2 * height)
                break
            case 90:
                topX = right -  (1/2 * height)
                topY = heavyBallTransformer.body.position.y
                botX = left
                botY = heavyBallTransformer.body.position.y
                break
            case 180:
                topX = heavyBallTransformer.body.position.x
                topY = bottom - (1/2 * height)
                botX = heavyBallTransformer.body.position.x
                botY = top
                heavyBallTransformer.body.y = top + (1/2 * height)
                break
            case -180:
                topX = heavyBallTransformer.body.position.x
                topY = bottom - (1/2 * height)
                botX = heavyBallTransformer.body.position.x
                botY = top
                heavyBallTransformer.body.y = top + (1/2 * height)
                break
            case -90:
                topX = left
                topY = heavyBallTransformer.body.position.y
                botX = right - (1/2 * height)
                botY = heavyBallTransformer.body.position.y
                break
        }

        topBound.body.position.set(topX, topY)
        bottomBound.body.position.set(botX, botY)
    }

    /**
     * @param {Phaser.GameObjects.Sprite} heavyBallTransformer
     */
    static dragBoundaries(heavyBallTransformer)
    {
        const topBound = heavyBallTransformer.getData('topCollisionBox')
        const bottomBound = heavyBallTransformer.getData('bottomCollisionBox')

        let bounds = heavyBallTransformer.getBounds()
        let left = bounds.x
        let top = bounds.y
        let bottom = bounds.bottom
        let right = bounds.right
        let height = 40

        let topX
        let topY
        let botX
        let botY

        switch (heavyBallTransformer.angle)
        {
            case 0:
                topX = heavyBallTransformer.body.position.x
                topY = top
                botX = heavyBallTransformer.body.position.x
                botY = bottom - (1/2 * height)
                break
            case 90:
                topX = right - (1/2 * height)
                topY = heavyBallTransformer.body.position.y
                botX = left
                botY = heavyBallTransformer.body.position.y
                break
            case 180:
                topX = heavyBallTransformer.body.position.x
                topY = bottom - (1/2 * height)
                botX = heavyBallTransformer.body.position.x
                botY = top
                break
            case -180:
                topX = heavyBallTransformer.body.position.x
                topY = bottom - (1/2 * height)
                botX = heavyBallTransformer.body.position.x
                botY = top
                break
            case -90:
                topX = left
                topY = heavyBallTransformer.body.position.y
                botX = right - (1/2 * height)
                botY = heavyBallTransformer.body.position.y
                break
        }

        topBound.body.position.set(topX, topY)
        bottomBound.body.position.set(botX, botY)
    }
}