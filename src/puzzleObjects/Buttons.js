export default class Buttons
{
    /**
     * @param {Phaser.scene} the scene that is creating "Buttons"
     */
    constructor(scene, buttonKey = 'button')
    {
        this.scene = scene
        this.key = buttonKey

        this._group = this.scene.physics.add.group()
    }

    /**
     * @param {Phaser.Physics.Arcade.StaticBody} piece Object that the button will be linked to.
     */
    place(x = 0, y = 0, piece)
    {
        const button = this.group.create(x, y, this.key)
        button.gameObject.setData('link', piece)

        button.setCollideWorldBounds(true)

        return button
    }

    get group()
    {
        return this._group
    }
}