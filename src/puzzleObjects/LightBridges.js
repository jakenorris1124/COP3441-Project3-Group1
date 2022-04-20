export default class LightBridges
{
    /**
     * @param {Phaser.Scene} the scene that is creating "LightBridges"
     */
    constructor(scene, lightBridgeKey = 'light bridge')
    {
        this.scene = scene
        this.key = lightBridgeKey
        this.togglable = true
        this.isOn = false
        this.defaultState = false

        this._group = this.scene.physics.add.staticGroup()
    }

    // The actual bridge part I'm not sure how to implement yet.
    place(x = 0, y = 0)
    {
        const lightBridge = this.group.create(x, y, this.key)

        return lightBridge
    }

    toggle()
    {

    }

    get group()
    {
        return this._group
    }
}