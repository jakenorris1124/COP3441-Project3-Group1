export default class Prisms
{
    /**
     * @param {Phaser.Scene} scene the scene that is creating "Prisms"
     * @param {string} prismKey
     */
    constructor(scene, prismKey = 'prism')
    {
        this.scene = scene
        this.key = prismKey
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
        const prism = this.scene.add.sprite(x, y, this.key)
        this._group.add(prism)

        return prism
    }

    /**
     * @returns {Phaser.Physics.Arcade.StaticGroup}
     */
    get group()
    {
        return this._group
    }
}