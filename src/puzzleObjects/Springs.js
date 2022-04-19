export default class Springs
{
    /**
     * @param {Phaser.Scene} scene the scene that is creating "Springs"
     */
    constructor(scene, springKey = 'spring')
    {
        this.scene = scene
        this.key = springKey

        this._group = this.scene.physics.add.staticGroup()
    }

    place(x = 0, y = 0)
    {
        const spring = this.group.create(x, y, this.key)

        return spring
    }

    /**
     * @param {Phaser.Physics.Arcade.Body} ball ball who's mass will be amplified
     * @param {Phaser.Physics.Arcade.StaticBody} spring Heavy Ball Transformer that ball collided with.
     */
    toggle(ball, spring)
    {

    }

    get group()
    {
        return this._group
    }
}