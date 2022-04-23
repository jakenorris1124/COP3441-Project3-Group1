import GravityInverters from "./GravityInverters";

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

    createSprite(){
        // Create 'On' animation
        this.heavyBallTransformer.anims.create({
            key: 'On',
            frames: this.heavyBallTransformer.anims.generateFrameNames(this.key, {start: 0, end: 11, zeroPad: 4, prefix: "", suffix: ".png"}),
            frameRate: 30,
            repeat: 0              // set to (-1) to repeat forever
        }); // end of create 'On' animation

        // Create 'Off' animation
        this.heavyBallTransformer.anims.create({
            key: 'Off',
            frames: [{ key: this.key, frame: '0000.png'}],
            frameRate: 30,
            repeat: 0              // set to (-1) to repeat forever
        }); // end of create 'Off' animation

        // Create 'Active' animation
        this.heavyBallTransformer.anims.create({
            key: 'Active',
            frames: this.heavyBallTransformer.anims.generateFrameNames(this.key, {start: 12, end: 35, zeroPad: 4, prefix: "", suffix: ".png"}),
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
        this.heavyBallTransformer = this.scene.add.sprite(x, y, this.key)
        this.createSprite()
        this.heavyBallTransformer.play('Off')
        this._group.add(this.heavyBallTransformer)
        const topCollisionBox = this._boundaryGroup.create()
        const bottomCollisionBox = this._boundaryGroup.create()

        this.heavyBallTransformer.setData('topCollisionBox', topCollisionBox)
        this.heavyBallTransformer.setData('bottomCollisionBox', bottomCollisionBox)
        this.heavyBallTransformer.setName('heavyBallTransformer')

        let bounds = this.heavyBallTransformer.getBounds()
        let left = bounds.x
        let top = bounds.y
        let bottom = bounds.bottom
        let width = this.heavyBallTransformer.body.width
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

        this.heavyBallTransformer.body.height -= 2 * height
        this.heavyBallTransformer.body.y += height

        this.heavyBallTransformer.setState(OFF)

        return this.heavyBallTransformer
    }

    /**
     * @param {Phaser.GameObjects.Sprite} ball ball who's mass will be amplified
     * @param {Phaser.GameObjects.Sprite} heavyBallTransformer Heavy Ball Transformer that ball collided with.
     */
    toggle(ball, heavyBallTransformer)
    {
        if (ball.getData('lock'))
            return

        if (heavyBallTransformer.state == ON)
        {
            heavyBallTransformer.playReverse('On')
            heavyBallTransformer.playAfterDelay('Off',5)
            HeavyBallTransformers.resetMass(ball.body)
            heavyBallTransformer.setState(OFF)
        }
        else
        {   heavyBallTransformer.play('On')
            heavyBallTransformer.playAfterDelay('Active', 5)
            HeavyBallTransformers.increaseMass(ball.body)
            heavyBallTransformer.setState(ON)
        }
    }

    /**
     * @param {Phaser.Physics.Arcade.Body} ball ball who's mass will be amplified
     */
    static increaseMass(ball)
    {
        if (ball.gravity.y > -200)
            ball.setGravityY(ball.gravity.y + 100)
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
     * @param {Phaser.Physics.Arcade.Body} ball ball who's mass will be amplified
     */
    static resetMass(ball)
    {
        if (ball.gravity.y > -200)
            ball.setGravityY(ball.gravity.y - 100)
        else if (ball.gravity.y < -200)
            ball.setGravityY(ball.gravity.y + 100)

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