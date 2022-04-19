export default class GravityInverters
{
    /**
     * @param {Phaser.Scene} the scene that is creating "GravityInverters"
     */
    constructor(scene, gravityInverterKey = 'gravity inverter')
    {
        this.scene = scene
        this.key = gravityInverterKey

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
    toggle()
    {
        this.scene.setGravityY(-this.scene.gravityY)
    }
}