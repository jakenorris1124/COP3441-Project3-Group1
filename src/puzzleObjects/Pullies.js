export default class Pullies
{
    /**
     * @param {Phaser.Scene} scene the scene that is creating "Pullies"
     */
    constructor(scene, pulleyKey = 'pulley')
    {
        this.scene = scene
        this.key = pulleyKey
        this.togglable = true

        this._group = this.scene.physics.add.staticGroup()
    }

    //I don't know quite how the pulley works, so I'm not sure how else I should mess with this class.
    place(x = 0, y = 0)
    {
        const pulley = this.scene.add.sprite(x, y, this.key)
        this._group.add(pulley)

        return pulley
    }

    /**
     * @param {Phaser.GameObjects.GameObject} ball ball who's mass will be amplified
     * @param {Phaser.GameObjects.GameObject} pulley Heavy Ball Transformer that ball collided with.
     */
    toggle(ball, pulley)
    {

    }

    /**
     * @param {Phaser.Physics.Arcade.Body} ball ball who's mass will be amplified
     * @param {Phaser.Physics.Arcade.StaticBody} pulley Heavy Ball Transformer that ball collided with.
     */
    isActive(ball, pulley)
    {
        return true // will change later, just absolving errors for now
    }

    get group()
    {
        return this._group
    }
}