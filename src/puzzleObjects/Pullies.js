export default class Pullies
{
    /**
     * @param {Phaser.Scene} scene the scene that is creating "Pullies"
     * @param {string} pulleyKey
     */
    constructor(scene, pulleyKey = 'pulley')
    {
        this.scene = scene
        this.key = pulleyKey
        this.togglable = true

        this._group = this.scene.physics.add.staticGroup()
    }

    /**
     * @param {number} x
     * @param {number} y
     * @returns {Phaser.GameObjects.Sprite}
     */
    place(x = 0, y = 0)
    {
        const pulley = this.scene.add.sprite(x, y, this.key)
        this._group.add(pulley)

        return pulley
    }

    /**
     * @param {Phaser.GameObjects.Sprite} ball ball who's mass will be amplified
     * @param {Phaser.GameObjects.Sprite} pulley Heavy Ball Transformer that ball collided with.
     */
    toggle(ball, pulley)
    {

    }

    /**
     * @param {Phaser.GameObjects.Sprite} ball ball who's mass will be amplified
     * @param {Phaser.GameObjects.Sprite} pulley Heavy Ball Transformer that ball collided with.
     */
    isActive(ball, pulley)
    {
        return true // will change later, just absolving errors for now
    }

    /**
     * @returns {Phaser.Physics.Arcade.StaticGroup}
     */
    get group()
    {
        return this._group
    }
}