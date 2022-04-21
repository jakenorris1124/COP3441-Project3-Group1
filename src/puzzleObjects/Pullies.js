const ON = 1
const OFF = 0

export default class Pullies
{
    /**
     * @param {Phaser.Scene} scene the scene that is creating "Pullies"
     * @param {string} pulleyKey
     */
    constructor(scene, pulleyKey = 'pulley')
    {
        this.scene = scene
        this.key = pulleyKey
        this.togglable = true

        this._group = this.scene.physics.add.group()
    }

    /**
     * @param {number} x
     * @param {number} y
     * @returns {Phaser.GameObjects.Sprite}
     */
    place(x = 0, y = 0)
    {
        const pulley = this.scene.add.sprite(x, y, this.key)
        this._group.add(pulley)

        pulley.setState(OFF)
        pulley.setName('pulley')
        pulley.setData('moving', false)
        pulley.setData('initialX', x)
        pulley.setData('initialY', y)
        pulley.setData('timeEvent', undefined)

        return pulley
    }

    // The pulley will be very difficult to implement unless we can find a way to make it have a non static body.
    /**
     * @param {Phaser.GameObjects.Sprite} ball ball who's mass will be amplified
     * @param {Phaser.GameObjects.Sprite} pulley Heavy Ball Transformer that ball collided with.
     */
    toggle(ball, pulley)
    {
        if (pulley.getData('timeEvent') != null)
            this.scene.time.removeEvent(pulley.getData('timeEvent'))

        let velocityXUp = 0
        let velocityYUp = 0

        switch (pulley.angle)
        {
            case 0:
                velocityXUp = 0
                velocityYUp = -50
                break
            case 90:
                velocityXUp = 50
                velocityYUp = 0
                break
            case 180:
                velocityXUp = 0
                velocityYUp = 50
                break
            case -180:
                velocityXUp = 0
                velocityYUp = 50
                break
            case -90:
                velocityXUp = -50
                velocityYUp = 0
                break
        }

        if (pulley.state == ON)
        {
            this.goDown(pulley, -velocityXUp, -velocityYUp)
            pulley.setState(OFF)
        }
        else
        {
            this.goUp(pulley, velocityXUp, velocityYUp)
            pulley.setState(ON)
        }

        pulley.setData('moving', true)

        pulley.setData('timeEvent', this.scene.time.addEvent({
            delay: 5000,
            callback: () => {
                pulley.body.setVelocityX(0)
                pulley.body.setVelocityY(0)
                pulley.setData('moving', false)
            },
            callbackScope: this
        }))
    }

    /**
     * @param {Phaser.GameObjects.Sprite} pulley
     * @param {number} velocityXUp
     * @param {number} velocityYUp
     */
    goUp(pulley, velocityXUp, velocityYUp)
    {
        pulley.body.setVelocityX(velocityXUp)
        pulley.body.setVelocityY(velocityYUp)
    }

    /**
     * @param {Phaser.GameObjects.Sprite} pulley
     * @param {number} velocityXDown
     * @param {number} velocityYDown
     */
    goDown(pulley, velocityXDown, velocityYDown)
    {
        pulley.body.setVelocityX(velocityXDown)
        pulley.body.setVelocityY(velocityYDown)
    }

    /**
     * @returns {Phaser.Physics.Arcade.Group}
     */
    get group()
    {
        return this._group
    }
}