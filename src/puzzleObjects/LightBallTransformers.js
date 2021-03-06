import Phaser from "phaser";
import GravityInverters from "./GravityInverters";

const ON = 1
const OFF = 0

export default class LightBallTransformers
{
    /**
     * @param {Phaser.Scene} scene the scene that is creating "LightBallTransformers"
     * @param {string} lightBallTransformerKey
     */
    constructor(scene, lightBallTransformerKey)
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

    createSprite(){
        // Create 'On' animation
        this.lightBallTransformer.anims.create({
            key: 'On',
            frames: this.lightBallTransformer.anims.generateFrameNames(this.key, {start: 0, end: 11, zeroPad: 4, prefix: "", suffix: ".png"}),
            frameRate: 30,
            repeat: 0              // set to (-1) to repeat forever
        }); // end of create 'On' animation

        // Create 'Off' animation
        this.lightBallTransformer.anims.create({
            key: 'Off',
            frames: [{ key: this.key, frame: '0000.png'}],
            frameRate: 30,
            repeat: 0              // set to (-1) to repeat forever
        }); // end of create 'Off' animation

        // Create 'Active' animation
        this.lightBallTransformer.anims.create({
            key: 'Active',
            frames: this.lightBallTransformer.anims.generateFrameNames(this.key, {start: 12, end: 35, zeroPad: 4, prefix: "", suffix: ".png"}),
            frameRate: 30,
            repeat: -1              // set to (-1) to repeat forever
        }); // end of create 'Active' animation
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    place(x = 0, y = 0)
    {
        this.lightBallTransformer = this.scene.add.sprite(x, y, this.key)
        this.createSprite()
        this.lightBallTransformer.play('Off')
        this._group.add(this.lightBallTransformer)
        const topCollisionBox = this._boundaryGroup.create()
        const bottomCollisionBox = this._boundaryGroup.create()

        this.lightBallTransformer.setData('topCollisionBox', topCollisionBox)
        this.lightBallTransformer.setData('bottomCollisionBox', bottomCollisionBox)
        this.lightBallTransformer.setName('lightBallTransformer')

        let bounds =  this.lightBallTransformer.getBounds()
        let left = bounds.x
        let top = bounds.y
        let bottom = bounds.bottom
        let width =  this.lightBallTransformer.body.width
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

        this.lightBallTransformer.body.height -= 2 * height
        this.lightBallTransformer.body.y += height

        this.lightBallTransformer.setState(OFF)

        return  this.lightBallTransformer
    }

    /**
     * @param {Phaser.GameObjects.Sprite} ball ball who's mass will be amplified
     * @param {Phaser.GameObjects.Sprite} lightBallTransformer
     */
    toggle(ball, lightBallTransformer)
    {
        if (ball.getData('lock'))
            return

        if (lightBallTransformer.state == ON)
        {
            lightBallTransformer.playReverse('On').playAfterDelay('Off',1000)
            LightBallTransformers.resetMass(ball.body)
            lightBallTransformer.setState(OFF)
        }
        else
        {
            lightBallTransformer.play('On').playAfterDelay('Active', 1000)
            LightBallTransformers.decreaseMass(ball.body)
            lightBallTransformer.setState(ON)
        }
    }

    /**
     * @param {Phaser.Physics.Arcade.Body} ball ball who's mass will be amplified
     */
    static decreaseMass(ball)
    {
        if (ball.gravity.y > -200)
            ball.setGravityY(ball.gravity.y - 100)
        else if (ball.gravity.y < -200)
            ball.setGravityY(ball.gravity.y + 100)
        ball.setMass(ball.mass / 2)
    }

    /**
     * @param {Phaser.Physics.Arcade.Body} ball ball who's mass will be amplified
     */
    static resetMass(ball)
    {
        if (ball.gravity.y > -200)
            ball.setGravityY(ball.gravity.y +100)
        else if (ball.gravity.y < -200)
            ball.setGravityY(ball.gravity.y - 100)
        else
        {
            if (GravityInverters.inverted == false)
                ball.setGravityY(100)
            else
                ball.setGravityY(-100)
        }

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
        let height = 40

        lightBallTransformer.body.y = top

        let topX
        let topY
        let botX
        let botY

        switch (lightBallTransformer.angle)
        {
            case 0:
                topX = lightBallTransformer.body.position.x
                topY = top
                botX = lightBallTransformer.body.position.x
                botY = bottom - (1/2 * height)
                lightBallTransformer.body.y = top + (1/2 * height)
                break
            case 90:
                topX = right -  (1/2 * height)
                topY = lightBallTransformer.body.position.y
                botX = left
                botY = lightBallTransformer.body.position.y
                break
            case 180:
                topX = lightBallTransformer.body.position.x
                topY = bottom - (1/2 * height)
                botX = lightBallTransformer.body.position.x
                botY = top
                lightBallTransformer.body.y = top + (1/2 * height)
                break
            case -180:
                topX = lightBallTransformer.body.position.x
                topY = bottom - (1/2 * height)
                botX = lightBallTransformer.body.position.x
                botY = top
                lightBallTransformer.body.y = top + (1/2 * height)
                break
            case -90:
                topX = left
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
        let height = 40

        let topX
        let topY
        let botX
        let botY

        switch (lightBallTransformer.angle)
        {
            case 0:
                topX = lightBallTransformer.body.position.x
                topY = top
                botX = lightBallTransformer.body.position.x
                botY = bottom - (1/2 * height)
                break
            case 90:
                topX = right - (1/2 * height)
                topY = lightBallTransformer.body.position.y
                botX = left
                botY = lightBallTransformer.body.position.y
                break
            case 180:
                topX = lightBallTransformer.body.position.x
                topY = bottom - (1/2 * height)
                botX = lightBallTransformer.body.position.x
                botY = top
                break
            case -180:
                topX = lightBallTransformer.body.position.x
                topY = bottom - (1/2 * height)
                botX = lightBallTransformer.body.position.x
                botY = top
                break
            case -90:
                topX = left
                topY = lightBallTransformer.body.position.y
                botX = right - (1/2 * height)
                botY = lightBallTransformer.body.position.y
                break
        }

        topBound.body.position.set(topX, topY)
        bottomBound.body.position.set(botX, botY)
    }
}