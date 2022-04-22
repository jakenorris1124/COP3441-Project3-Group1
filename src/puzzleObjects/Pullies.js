const ON = 1
const OFF = 0

export default class Pullies
{
    /**
     * @param {Phaser.Scene} scene the scene that is creating "Pullies"
     * @param {string} pulleyKey
     */
    constructor(scene, pulleyKey = 'lift')
    {
        this.scene = scene
        this.key = pulleyKey
        this.togglable = true

        this._group = this.scene.physics.add.group()
    }

    createSprite(){
        // Create 'Close' animation
        this.pulley.anims.create({
            key: 'Close',
            frames: this.pulley.anims.generateFrameNames(this.key, {start: 0, end: 11, zeroPad: 4, prefix: "", suffix: ".png"}),
            frameRate: 20,
            repeat: 0              // set to (-1) to repeat forever
        }); // end of create 'Close' animation

        // Create 'Done' animation
        this.pulley.anims.create({
            key: 'Done',
            frames: this.pulley.anims.generateFrameNames(this.key, {start: 10, end: 11, zeroPad: 4, prefix: "", suffix: ".png"}),
            frameRate: 20,
            repeat: 0              // set to (-1) to repeat forever
        }); // end of create 'Done' animation

        // Create 'Open' animation
        this.pulley.anims.create({
            key: 'Open',
            frames: [
                {
                key: this.key,
                frame: '0011.png'
            }, {
                key: this.key,
                frame: '0010.png'
            }, {
                key: this.key,
                frame: '0009.png'
            }, {
                key: this.key,
                frame: '0008.png'
            }, {
                key: this.key,
                frame: '0007.png'
            }, {
                key: this.key,
                frame: '0006.png'
            }, {
                key: this.key,
                frame: '0005.png'
            }, {
                key: this.key,
                frame: '0004.png'
            }, {
                key: this.key,
                frame: '0003.png'
            }, {
                key: this.key,
                frame: '0002.png'
            }, {
                key: this.key,
                frame: '0001.png'
            }, {
                key: this.key,
                frame: '0000.png'
            }],
            frameRate: 20,
            repeat: 0              // set to (-1) to repeat forever
        }); // end of create 'Open' animation
    }



    /**
     * @param {number} x
     * @param {number} y
     * @returns {Phaser.GameObjects.Sprite}
     */
    place(x = 0, y = 0)
    {
        this.pulley = this.scene.add.sprite(x, y, this.key)
        this.createSprite()
        this.pulley.play('Done')
        this._group.add(this.pulley)

        this.pulley.body.setSize(this.pulley.body.width, this.pulley.body.height / 13, true)
        this.pulley.body.setOffset(0, this.pulley.body.height * 12)

        this.pulley.setState(OFF)
        this.pulley.setName('pulley')
        this.pulley.setData('moving', false)
        this.pulley.setData('initialX', x)
        this.pulley.setData('initialY', y)
        this.pulley.setData('timeEvent', undefined)

        return this.pulley
    }

    // The pulley will be very difficult to implement unless we can find a way to make it have a non static body.
    /**
     * @param {Phaser.GameObjects.Sprite} ball ball who's mass will be amplified
     * @param {Phaser.GameObjects.Sprite} pulley Heavy Ball Transformer that ball collided with.
     */
    toggle(ball, pulley)
    {
        if (pulley.getData('timeEvent') != null)
            this.scene.time.removeEvent(pulley.getData('timeEvent'))

        let velocityXUp = 0
        let velocityYUp = 0

        switch (pulley.angle)
        {
            case 0:
                velocityXUp = 0
                velocityYUp = -50
                break
            case 90:
                velocityXUp = 50
                velocityYUp = 0
                break
            case 180:
                velocityXUp = 0
                velocityYUp = 50
                break
            case -180:
                velocityXUp = 0
                velocityYUp = 50
                break
            case -90:
                velocityXUp = -50
                velocityYUp = 0
                break
        }

        this.pulley.play('Close')
        if (pulley.state == ON)
        {
            this.goDown(pulley, -velocityXUp, -velocityYUp)
            pulley.setState(OFF)
        }
        else
        {
            this.goUp(pulley, velocityXUp, velocityYUp)
            pulley.setState(ON)
        }

        pulley.setData('moving', true)

        pulley.setData('timeEvent', this.scene.time.addEvent({
            delay: 5000,
            callback: () => {
                pulley.body.setVelocityX(0)
                pulley.body.setVelocityY(0)
                pulley.setData('moving', false)
            },
            callbackScope: this
        }))

        this.pulley.play('Open')
    }

    /**
     * @param {Phaser.GameObjects.Sprite} pulley
     * @param {number} velocityXUp
     * @param {number} velocityYUp
     */
    goUp(pulley, velocityXUp, velocityYUp)
    {
        pulley.body.setVelocityX(velocityXUp)
        pulley.body.setVelocityY(velocityYUp)
    }

    /**
     * @param {Phaser.GameObjects.Sprite} pulley
     * @param {number} velocityXDown
     * @param {number} velocityYDown
     */
    goDown(pulley, velocityXDown, velocityYDown)
    {
        pulley.body.setVelocityX(velocityXDown)
        pulley.body.setVelocityY(velocityYDown)
    }

    /**
     * @returns {Phaser.Physics.Arcade.Group}
     */
    get group()
    {
        return this._group
    }
}