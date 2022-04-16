export default class GravityInverters
{
    /**
     * @param {Phaser.scene} the scene that is creating "Fans"
     */
    constructor(scene, gravityInverterKey = 'gravityInverter')
    {
        this.scene = scene
        this.key = gravityInverterKey

        this._group = this.scene.physics.add.staticGroup()
    }

    get group()
    {
        return this._group
    }

    placeGravityInverter(x = 0, y = 0)
    {
        const gravityInverter = this.group.create(x, y, this.key)

        gravityInverter.setCollideWorldBounds(true)
    }

    // Inverts gravity from its current state.
    activate()
    {
        this.scene.setGravityY(-this.scene.gravityY)
    }
}