export default class Prisms
{
    /**
     * @param {Phaser.Scene} the scene that is creating "Prisms"
     */
    constructor(scene, prismKey = 'prism')
    {
        this.scene = scene
        this.key = prismKey
        this.togglable = false

        this._group = this.scene.physics.add.staticGroup()
    }

    place(x = 0, y = 0)
    {
        const prism = this.scene.add.sprite(x, y, this.key)
        this._group.add(prism)

        return prism
    }

    get group()
    {
        return this._group
    }
}