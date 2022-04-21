import Phaser from "phaser";

const ON = 1
const OFF = 0

export default class LightBallTransformers
{
    /**
     * @param {Phaser.Scene} scene the scene that is creating "LightBallTransformers"
     * @param {string} lightBallTransformerKey
     */
    constructor(scene, lightBallTransformerKey = 'light ball transformer')
    {
        this.scene = scene
        this.key = lightBallTransformerKey
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
        const lightBallTransformer = this.scene.add.sprite(x, y, this.key)
        this._group.add(lightBallTransformer)
        const topCollisionBox = this._boundaryGroup.create()
        const bottomCollisionBox = this._boundaryGroup.create()

        lightBallTransformer.setData('topCollisionBox', topCollisionBox)
        lightBallTransformer.setData('bottomCollisionBox', bottomCollisionBox)
        lightBallTransformer.setName('lightBallTransformer')

        let bounds = lightBallTransformer.getBounds()
        let top = bounds.y
        let bottom = bounds.bottom
        let width = lightBallTransformer.body.sourceWidth
        let height = 20

        //Will need to adjust these collision boxes
        topCollisionBox.body.setBoundsRectangle(new Phaser.geom.rectangle(lightBallTransformer.body.position.x, top + (1/2 * height), width, height))
        bottomCollisionBox.body.setBoundsRectangle(new Phaser.geom.rectangle(lightBallTransformer.body.position.x, bottom - (1/2 * height), width, height))
        lightBallTransformer.body.sourceHeight -= 2 * height

        lightBallTransformer.setState(OFF)
    }

    /**
     * @param {Phaser.GameObjects.Sprite} ball ball who's mass will be amplified
     * @param {Phaser.GameObjects.Sprite} lightBallTransformer
     */
    toggle(ball, lightBallTransformer)
    {
        if (lightBallTransformer.state == ON)
        {
            this.resetMass(ball.body)
            lightBallTransformer.setState(OFF)
        }
        else
        {
            this.decreaseMass(ball.body)
            lightBallTransformer.setState(ON)
        }
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

    /**
     * @param {Phaser.GameObjects.Sprite} lightBallTransformer
     */
    static rotateBoundaries(lightBallTransformer)
    {
        const topBound = lightBallTransformer.getData('topCollisionBox')
        const bottomBound = lightBallTransformer.getData('bottomCollisionBox')

        topBound.setAngle(lightBallTransformer.angle)
        bottomBound.setAngle(lightBallTransformer.angle)

        let newHeight = topBound.body.width
        let newWidth = topBound.body.height
        topBound.body.setSize(newWidth, newHeight)
        bottomBound.body.setSize(newWidth, newHeight)

        let bounds = lightBallTransformer.getBounds()
        let left = bounds.x
        let top = bounds.y
        let bottom = bounds.bottom
        let right = bounds.right
        let height = 20

        let topX
        let topY
        let botX
        let botY

        switch (lightBallTransformer.angle)
        {
            case 0:
                topX = lightBallTransformer.body.position.x
                topY = top + (1/2 * height)
                botX = lightBallTransformer.body.position.x
                botY = bottom - (1/2 * height)
                break
            case 90:
                topX = right - (1/2 * height)
                topY = lightBallTransformer.body.position.y
                botX = left + (1/2 * height)
                botY = lightBallTransformer.body.position.y
                break
            case 180:
                topX = lightBallTransformer.body.position.x
                topY = bottom - (1/2 * height)
                botX = lightBallTransformer.body.position.x
                botY = top + (1/2 * height)
                break
            case -180:
                topX = lightBallTransformer.body.position.x
                topY = bottom - (1/2 * height)
                botX = lightBallTransformer.body.position.x
                botY = top + (1/2 * height)
                break
            case -90:
                topX = left + (1/2 * height)
                topY = lightBallTransformer.body.position.y
                botX = right - (1/2 * height)
                botY = lightBallTransformer.body.position.y
                break
        }

        topBound.body.position.set(topX, topY)
        bottomBound.body.position.set(botX, botY)
    }

    /**
     * @param {Phaser.GameObjects.Sprite} lightBallTransformer
     */
    static dragBoundaries(lightBallTransformer)
    {
        const topBound = lightBallTransformer.getData('topCollisionBox')
        const bottomBound = lightBallTransformer.getData('bottomCollisionBox')

        let bounds = lightBallTransformer.getBounds()
        let left = bounds.x
        let top = bounds.y
        let bottom = bounds.bottom
        let right = bounds.right
        let height = 20

        let topX
        let topY
        let botX
        let botY

        switch (lightBallTransformer.angle)
        {
            case 0:
                topX = lightBallTransformer.body.position.x
                topY = top + (1/2 * height)
                botX = lightBallTransformer.body.position.x
                botY = bottom - (1/2 * height)
                break
            case 90:
                topX = right - (1/2 * height)
                topY = lightBallTransformer.body.position.y
                botX = left + (1/2 * height)
                botY = lightBallTransformer.body.position.y
                break
            case 180:
                topX = lightBallTransformer.body.position.x
                topY = bottom - (1/2 * height)
                botX = lightBallTransformer.body.position.x
                botY = top + (1/2 * height)
                break
            case -180:
                topX = lightBallTransformer.body.position.x
                topY = bottom - (1/2 * height)
                botX = lightBallTransformer.body.position.x
                botY = top + (1/2 * height)
                break
            case -90:
                topX = left + (1/2 * height)
                topY = lightBallTransformer.body.position.y
                botX = right - (1/2 * height)
                botY = lightBallTransformer.body.position.y
                break
        }

        topBound.body.position.set(topX, topY)
        bottomBound.body.position.set(botX, botY)
    }
}