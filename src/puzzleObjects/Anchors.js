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
     * @return {Phaser.GameObjects.Sprite}
     */
    place(x = 0, y = 0)
    {
        const anchor = this.scene.add.sprite(x, y, this.key)
        this._group.add(anchor)

        //We will add colliders to debris if time permits.
       // this.scene.physics.add.collider(anchor, )

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