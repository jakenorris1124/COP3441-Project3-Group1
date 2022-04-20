export default class Buttons
{
    /**
     * @param {Phaser.Scene} scene the scene that is creating "Buttons"
     * @param {string} buttonKey
     */
    constructor(scene, buttonKey = 'button')
    {
        this.scene = scene
        this.key = buttonKey
        this.togglable = false

        this._group = this.scene.physics.add.staticGroup()
    }

    /**
     * @param {number} x
     * @param {number} y
     * @return {Phaser.GameObjects.Sprite}
     */
    place(x = 0, y = 0)
    {
        const button = this.scene.add.sprite(x, y, this.key)
        this._group.add(button)

        return button
    }

    /**
     * @returns {Phaser.Physics.Arcade.StaticGroup}
     */
    get group()
    {
        return this._group
    }
}