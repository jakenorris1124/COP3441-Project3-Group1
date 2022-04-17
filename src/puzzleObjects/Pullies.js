export default class Pullies
{
    /**
     * @param {Phaser.scene} the scene that is creating "Pullies"
     */
    constructor(scene, pulleyKey = 'pulley')
    {
        this.scene = scene
        this.key = pulleyKey

        this._group = this.scene.physics.add.group()
    }

    //I don't know quite how the pulley works, so I'm not sure how else I should mess with this class.
    placePulley(x = 0, y = 0)
    {
        const pulley = this.group.create(x, y, this.key)

        pulley.setCollideWorldBounds(true)

        return pulley
    }

    get group()
    {
        return this._group
    }
}