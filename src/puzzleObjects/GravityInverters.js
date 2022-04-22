const ON = 1
const OFF = 0

export default class GravityInverters
{
    /**
     * @param {Phaser.Scene} scene the scene that is creating "GravityInverters"
     * @param {string} gravityInverterKey
     */
    constructor(scene, gravityInverterKey = 'gravity inverter')
    {
        this.scene = scene
        this.key = gravityInverterKey
        this.togglable = true
        this.inverted = false

        this._group = this.scene.physics.add.staticGroup()
    }

    /**
     * @returns {Phaser.Physics.Arcade.StaticGroup}
     */
    get group()
    {
        return this._group
    }

    /**
     * @param {number}x
     * @param {number} y
     * @returns {Phaser.GameObjects.Sprite}
     */
    place(x = 0, y = 0)
    {
        const gravityInverter = this.scene.add.sprite(x, y, this.key)
        this._group.add(gravityInverter)

        gravityInverter.setState(OFF)

        return gravityInverter
    }

    // Inverts gravity from its current state.
    /**
     * @param {Phaser.GameObjects.Sprite} ball
     * @param {Phaser.GameObjects.Sprite} gravityInverter
     */
    toggle(ball, gravityInverter)
    {
        if (ball.getData('lock'))
            return

        if(gravityInverter.state == OFF)
        {
            ball.body.setGravityY(-400 - ball.body.gravity.y)
            gravityInverter.setState(ON)
        }
        else
        {
            ball.body.setGravityY(0 - ball.body.gravity.y)
            gravityInverter.setState(OFF)
        }

        this.inverted = !this.inverted
    }
}