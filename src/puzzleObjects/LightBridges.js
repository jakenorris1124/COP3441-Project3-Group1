export default class LightBridges
{
    /**
     * @param {Phaser.scene} the scene that is creating "LightBridges"
     */
    constructor(scene, lightBridgeKey = 'lightBridge')
    {
        this.scene = scene
        this.key = lightBridgeKey

        this._group = this.scene.physics.add.group()
    }

    // The actual bridge part I'm not sure how to implement yet.
    placeLightBridges(x = 0, y = 0)
    {
        const lightBridge = this.group.create(x, y, this.key)

        lightBridge.setCollideWorldBounds(true)

        return lightBridge
    }

    get group()
    {
        return this._group
    }
}