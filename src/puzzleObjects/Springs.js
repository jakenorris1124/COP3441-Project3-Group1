export default class Springs
{
    /**
     * @param {Phaser.scene} the scene that is creating "Springs"
     */
    constructor(scene, springKey = 'spring')
    {
        this.scene = scene
        this.key = springKey

        this._group = this.scene.physics.add.group()
    }

    placeSpring(x = 0, y = 0)
    {
        const spring = this.group.create(x, y, this.key)

        spring.setCollideWorldBounds(true)

        return spring
    }

    get group()
    {
        return this._group
    }
}