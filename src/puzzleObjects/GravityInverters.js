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

        return gravityInverter
    }

    // Inverts gravity from its current state.
    /**
     * @param {Phaser.GameObjects.Sprite} ball
     */
    toggle(ball)
    {
        if(ball.body.gravity.y == 0)
            ball.body.setGravityY(-400)
        else
            ball.body.setGravityY(0)
    }
}