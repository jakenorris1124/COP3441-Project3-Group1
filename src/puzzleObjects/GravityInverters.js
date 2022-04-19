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
        this.inverted = false;

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
    toggle(ball)
    {
        if (this.inverted)
        {
            ball.setGravityY(200)
            this.inverted = false;
        }
        else
        {
            ball.setGravityY(-200)
            this.inverted = true;
        }
    }
}