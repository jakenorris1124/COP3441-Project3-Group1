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
        lightBridge.setData('beam', null)

        return lightBridge
    }

    toggle(ball, emitter)
    {
        //If the bridge is already active, destroy the bridge part of it
        if (emitter.state == ON)
        {
            if (emitter.getData('bridge') != null)
            {
                emitter.getData('bridge').destroy()
                emitter.setData('bridge', null)
            }

            if (emitter.getData('beam') != null)
            {
                emitter.getData('beam').destroy()
                emitter.setData('beam', null)
            }

            emitter.setState(OFF)
            return;
        }

        var angle = emitter.angle
        let emitterX;
        let emitterY;
        let beamWidth;
        let beamHeight;
        switch (angle)
        {
            case 0:
                emitterX = emitter.body.position.x+125
                emitterY = emitter.body.position.y+55
                beamWidth = 20
                beamHeight = 35
                break
            case 90:
                emitterX = emitter.body.position.x+55
                emitterY = emitter.body.position.y+125
                beamWidth = 35
                beamHeight = 20
                break
            case 180:
                emitterX = emitter.body.position.x
                emitterY = emitter.body.position.y+55
                beamWidth = 20
                beamHeight = 35
                break
            case -180:
                emitterX = emitter.body.position.x
                emitterY = emitter.body.position.y+55
                beamWidth = 20
                beamHeight = 35
                break
            case -90:
                emitterX = emitter.body.position.x+55
                emitterY = emitter.body.position.y
                beamWidth = 35
                beamHeight = 20
                break
        }

        /*
            Create a small rectangle called 'beam', and set its gravity to be very high in the
            x direction so that it looks like it is getting shot out very fast. This is the little red box that gets shot out from the lightBridge emitter.
            This is part for visual effect, and part for technical purposes. Essentially, the 'beam' gets sent out and keeps going until a collision occurs.
            Once the collision occurs, the distance between where the collision occurred and where the beam is shot out from is calculated and saved as 'length'.
            A rectangle called 'bridge' is made that is 'length' long. Bridge is the actual bridge that gets emitted.
         */
        let beam = this.scene.add.rectangle(emitterX, emitterY, beamWidth, beamHeight, 0xff0000)
        this.scene.physics.add.existing(beam)


        switch (angle)
        {
            case 0:
                beam.body.setGravityY(-200)
                beam.body.setGravityX(10000)
                break
            case 90:
                beam.body.setGravityY(10200)
                beam.body.setGravityX(0)
                break
            case 180:
                beam.body.setGravityY(-200)
                beam.body.setGravityX(-10000)
                break
            case -180:
                beam.body.setGravityY(-200)
                beam.body.setGravityX(-10000)
                break
            case -90:
                beam.body.setGravityY(-10200)
                beam.body.setGravityX(0)
                break
        }

        emitter.setData('beam', beam)

        let length

        //Check for collision on beam
        this.scene.physics.add.collider(beam, [this.scene.anchorGroup, this.scene.ballGroup, this.scene.buttonGroup, this.scene.directionalGateGroup,
            this.scene.fanGroup, this.scene.gravityInverterGroup, this.scene.heavyBallTransformerGroup, this.scene.lightBallTransformerGroup, this.scene.prismGroup,
            this.scene.pullyGroup, this.scene.sprinGroup, this.scene.HBTBoundaryGroup, this.scene.LBTBoundaryGroup], (beamCollide,objectCollide) => {
                //Calculate length then destroy beams
                //Create bridge then add physical properties to it
                switch (angle)
                {
                    case 0:
                        length = Math.abs(beam.body.position.x - (emitter.body.position.x+100))
                        emitter.setData('bridge', this.scene.add.rectangle(emitterX + (length/2),emitterY, length, 35, 0xf700ff))
                        break
                    case 90:
                        length = Math.abs(beam.body.position.y - (emitter.body.position.y+100))
                        emitter.setData('bridge', this.scene.add.rectangle(emitterX,emitterY + (length/2), 35, length, 0xf700ff))
                        break
                    case 180:
                    case -180:
                        length = Math.abs(beam.body.position.x - (emitter.body.position.x))
                        emitter.setData('bridge', this.scene.add.rectangle(emitterX - (length/2),emitterY, length, 35, 0xf700ff))
                        break
                    case -90:
                        length = Math.abs(beam.body.position.y - (emitter.body.position.y))
                        emitter.setData('bridge', this.scene.add.rectangle(emitterX,emitterY - (length/2), 35, length, 0xf700ff))
                        break
                }

                beam.destroy()
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