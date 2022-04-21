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
        if (pulley.state == ON)
        {
            this.goDown(pulley)
            pulley.setState(OFF)
        }
        else
        {
            this.goUp(pulley)
            pulley.setState(ON)
        }

        pulley.setData('moving', true)

        pulley.setData('timeEvent', this.scene.time.addEvent({
            delay: 5000,
            callback: () => {
                pulley.body.setVelocityY(0)
                pulley.setData('moving', false)
            },
            callbackScope: this
        }))
    }

    /**
     * @param {Phaser.GameObjects.Sprite} pulley
     */
    goUp(pulley)
    {
        pulley.body.setVelocityY(-50)
    }

    /**
     * @param {Phaser.GameObjects.Sprite} pulley
     */
    goDown(pulley)
    {
        pulley.body.setVelocityY(50)
    }

    /**
     * @returns {Phaser.Physics.Arcade.Group}
     */
    get group()
    {
        return this._group
    }
}