export default class Anchors
{
    /**
     * @param {Phaser.Scene} the scene that is creating "Anchors"
     */
    constructor(scene, anchorKey = 'anchor')
    {
        this.scene = scene
        this.key = anchorKey
        this.togglable = false

        this._group = this.scene.physics.add.group()
    }

    /**
     * @param {Phaser.GameObjects.GameObject} piece
     */
    placeAnchor(x = 0, y = 0, piece)
    {
        const anchor = this.scene.add.sprite(x, y, this.key)
        this._group.add(anchor)
        anchor.setData('link', piece)

        return anchor
    }

    get group()
    {
        return this._group
    }
}