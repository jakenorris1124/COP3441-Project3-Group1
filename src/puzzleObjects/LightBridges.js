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
        this.bridge = null;

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

    toggle(ball, emitter)
    {
        if (this.bridge != null)
        {
            this.bridge.destroy()
            this.bridge = null;
            return;
        }

        let beam = this.scene.add.rectangle(emitter.body.position.x+125, emitter.body.position.y+55, 20, 35, 0xff0000) //pink 0xf700ff
        this.scene.physics.add.existing(beam)
        beam.body.setGravityY(-200)
        beam.body.setGravityX(10000)

        let length;

        this.scene.physics.add.collider(beam, [this.scene.anchorGroup, this.scene.ballGroup, this.scene.buttonGroup, this.scene.directionalGateGroup,
            this.scene.fanGroup, this.scene.gravityInverterGroup, this.scene.heavyBallTransformerGroup, this.scene.lightBallTransformerGroup, this.scene.pullyGroup,
            this.scene.sprinGroup, this.scene.HBTBoundaryGroup, this.scene.LBTBoundaryGroup], () => {
            length = Math.abs(beam.body.position.x - (emitter.body.position.x+100))
            beam.destroy()
            this.bridge = this.scene.add.rectangle(emitter.body.position.x+ (length/2) +125, emitter.body.position.y+55, length, 35, 0xf700ff)

            this.scene.physics.add.existing(this.bridge)
            this.bridge.body.immovable = true;
            this.bridge.body.allowGravity = false;
            this.scene.physics.add.collider(this.scene.ballGroup, this.bridge)

        }, null, this)
    }

    get group()
    {
        return this._group
    }
}