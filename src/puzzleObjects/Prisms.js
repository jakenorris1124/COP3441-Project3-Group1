export default class Prisms
{
    /**
     * @param {Phaser.scene} the scene that is creating "Prisms"
     */
    constructor(scene, prismKey = 'prism')
    {
        this.scene = scene
        this.key = prismKey

        this._group = this.scene.physics.add.group()
    }

    placePrism(x = 0, y = 0)
    {
        const prism = this.group.create(x, y, this.key)

        prism.setCollideWorldBounds(true)

        return prism
    }

    get group()
    {
        return this._group
    }
}