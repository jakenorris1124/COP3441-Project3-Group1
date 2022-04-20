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
        this.isOn = false
        this.defaultState = false

        this._group = this.scene.physics.add.staticGroup()
    }

    place(x = 0, y = 0)
    {
        const prism = this.group.create(x, y, this.key)

        return prism
    }

    get group()
    {
        return this._group
    }
}