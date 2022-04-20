export default class Springs
{
    /**
     * @param {Phaser.Scene} scene the scene that is creating "Springs"
     * @param {string} springKey
     */
    constructor(scene, springKey = 'spring')
    {
        this.scene = scene
        this.key = springKey
        this.togglable = false

        this._group = this.scene.physics.add.staticGroup()
    }

    /**
     * @param {number} x
     * @param {number} y
     * @returns {Phaser.GameObjects.Sprite}
     */
    place(x = 0, y = 0)
    {
        const spring = this.scene.add.sprite(x, y, this.key)
        this._group.add(spring)

        return spring
    }

    /**
     * @param {Phaser.GameObjects.Sprite} ball ball who's mass will be amplified
     * @param {Phaser.GameObjects.Sprite} spring Heavy Ball Transformer that ball collided with.
     */
    toggle(ball, spring)
    {

    }

    /**
     * @returns {Phaser.Physics.Arcade.StaticGroup}
     */
    get group()
    {
        return this._group
    }
}