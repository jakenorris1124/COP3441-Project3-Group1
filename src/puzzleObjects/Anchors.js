export default class Anchors
{
    /**
     * @param {Phaser.Scene} the scene that is creating "Anchors"
     * @param {string} anchorKey
     */
    constructor(scene, anchorKey = 'anchor')
    {
        this.scene = scene
        this.key = anchorKey
        this.togglable = false

        this._group = this.scene.physics.add.staticGroup()
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {Phaser.GameObjects.Sprite} piece
     * @return {Phaser.GameObjects.Sprite}
     */
    placeAnchor(x = 0, y = 0, piece)
    {
        const anchor = this.scene.add.sprite(x, y, this.key)
        this._group.add(anchor)
        anchor.setData('link', piece)

        return anchor
    }

    /**
     * @returns {Phaser.Physics.Arcade.StaticGroup}
     */
    get group()
    {
        return this._group
    }
}