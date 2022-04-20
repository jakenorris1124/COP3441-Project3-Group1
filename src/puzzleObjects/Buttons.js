export default class Buttons
{
    /**
     * @param {Phaser.Scene} scene the scene that is creating "Buttons"
     */
    constructor(scene, buttonKey = 'button')
    {
        this.scene = scene
        this.key = buttonKey
        this.togglable = false

        this._group = this.scene.physics.add.staticGroup()
    }

    place(x = 0, y = 0)
    {
        const button = this.scene.add.sprite(x, y, this.key)
        this._group.add(button)

        return button
    }

    get group()
    {
        return this._group
    }
}