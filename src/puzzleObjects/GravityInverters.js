export default class GravityInverters
{
    /**
     * @param {Phaser.Scene} the scene that is creating "GravityInverters"
     */
    constructor(scene, gravityInverterKey = 'gravity inverter')
    {
        this.scene = scene
        this.key = gravityInverterKey
        this.togglable = true
        this.isOn = false
        this.defaultState = false

        this._group = this.scene.physics.add.staticGroup()
    }

    get group()
    {
        return this._group
    }

    place(x = 0, y = 0)
    {
        const gravityInverter = this.group.create(x, y, this.key)

        return gravityInverter
    }

    // Inverts gravity from its current state.
    /**
     * @param {Phaser.GameObjects.GameObject} ball
     */
    toggle(ball)
    {
        if(this.isOn)
            ball.body.setGravityY(0)
        else
            ball.body.setGravityY(-400)

        this.isOn = !this.isOn
    }
}