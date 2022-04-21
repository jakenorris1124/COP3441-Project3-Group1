const ON = 1
const OFF = 0

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

        lightBridge.setState(OFF)
        lightBridge.setData('bridge', null)

        return lightBridge
    }

    toggle(ball, emitter)
    {
        //If the bridge is already active, destroy the bridge part of it
        if (emitter.state == ON)
        {
            emitter.getData('bridge').destroy()
            emitter.setData('bridge', null)
            emitter.setState(OFF)
            return;
        }

        /*
            Create a small rectangle called 'beam', and set its gravity to be very high in the
            x direction so that it looks like it is getting shot out very fast. This is the little red box that gets shot out from the lightBridge emitter.
            This is part for visual effect, and part for technical purposes. Essentially, the 'beam' gets sent out and keeps going until a collision occurs.
            Once the collision occurs, the distance between where the collision occurred and where the beam is shot out from is calculated and saved as 'length'.
            A rectangle called 'bridge' is made that is 'length' long. Bridge is the actual bridge that gets emitted.
         */
        let beam = this.scene.add.rectangle(emitter.body.position.x+125, emitter.body.position.y+55, 20, 35, 0xff0000)
        this.scene.physics.add.existing(beam)
        beam.body.setGravityY(-200)
        beam.body.setGravityX(10000)

        let length;

        //Check for collision on beam
        this.scene.physics.add.collider(beam, [this.scene.anchorGroup, this.scene.ballGroup, this.scene.buttonGroup, this.scene.directionalGateGroup,
            this.scene.fanGroup, this.scene.gravityInverterGroup, this.scene.heavyBallTransformerGroup, this.scene.lightBallTransformerGroup, this.scene.pullyGroup,
            this.scene.sprinGroup, this.scene.HBTBoundaryGroup, this.scene.LBTBoundaryGroup], () => {
                //Calculate length then destroy beams
                length = Math.abs(beam.body.position.x - (emitter.body.position.x+100))
                beam.destroy()

                //Create bridge then add physical properties to it
                emitter.setData('bridge', this.scene.add.rectangle(emitter.body.position.x+ (length/2) +125, emitter.body.position.y+55, length, 35, 0xf700ff))

                this.scene.physics.add.existing(emitter.getData('bridge'))
                emitter.getData('bridge').body.immovable = true;
                emitter.getData('bridge').body.allowGravity = false;
                this.scene.physics.add.collider(this.scene.ballGroup, emitter.getData('bridge'))

        }, null, this)

        emitter.setState(ON)
    }

    get group()
    {
        return this._group
    }
}