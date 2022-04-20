export default class LightBridges
{
    /**
     * @param {Phaser.Scene} scene the scene that is creating "LightBridges"
     * @param {string} lightBridgeKey
     */
    constructor(scene, lightBridgeKey = 'light bridge')
    {
        this.scene = scene
        this.key = lightBridgeKey
        this.togglable = true

        this._group = this.scene.physics.add.staticGroup()
    }

    /**
     * The actual bridge part I'm not sure how to implement yet.
     * @param {number} x
     * @param {number} y
     * @return {Phaser.GameObjects.Sprite}
     */
    place(x = 0, y = 0)
    {
        const lightBridge = this.scene.add.sprite(x, y, this.key)
        this._group.add(lightBridge )

        return lightBridge
    }

    toggle()
    {

    }

    /**
     * @returns {Phaser.Physics.Arcade.StaticGroup}
     */
    get group()
    {
        return this._group
    }
}