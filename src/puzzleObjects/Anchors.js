export default class Anchors
{
    /**
     * @param {Phaser.scene} the scene that is creating "Anchors"
     */
    constructor(scene, anchorKey = 'anchor')
    {
        this.scene = scene
        this.key = anchorKey

        this._group = this.scene.physics.add.group()
    }

    /**
     * @param {Phaser.Physics.Arcade.StaticBody} piece
     */
    placeAnchor(x = 0, y = 0, piece)
    {
        const anchor = this.group.create(x, y, this.key)
        anchor.gameObject.setData('link', piece)

        anchor.setCollideWorldBounds(true)

        return anchor
    }

    get group()
    {
        return this._group
    }
}