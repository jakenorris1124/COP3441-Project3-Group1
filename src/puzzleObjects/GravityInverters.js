const ON = 1
const OFF = 0

export default class GravityInverters
{
    /**
     * @param {Phaser.Scene} scene the scene that is creating "GravityInverters"
     * @param {string} gravityInverterKey
     */
    constructor(scene, gravityInverterKey = 'gravity inverter')
    {
        this.scene = scene
        this.key = gravityInverterKey
        this.togglable = true
        this.inverted = false

        this._group = this.scene.physics.add.staticGroup()
    }

    /**
     * @returns {Phaser.Physics.Arcade.StaticGroup}
     */
    get group()
    {
        return this._group
    }

    createSprite(){
        // Create 'Off' animation
        this.gravityInverter.anims.create({
            key: 'Off',
            frames: [{key: this.key, frame: '0000.png'
            }],
            frameRate: 20,
            repeat: 0              // set to (-1) to repeat forever
        }); // end of create 'Off' animation

        // Create 'On' animation
        this.gravityInverter.anims.create({
            key: 'On',
            frames: [{key: this.key, frame: '0017.png'
            }],
            frameRate: 20,
            repeat: 0              // set to (-1) to repeat forever
        }); // end of create 'On' animation

        // Create 'Act' animation
        this.gravityInverter.anims.create({
            key: 'Act',
            frames: this.gravityInverter.anims.generateFrameNames(this.key, {start: 0, end: 17, zeroPad: 4, prefix: "", suffix: ".png"}),
            frameRate: 100,
            repeat: 0              // set to (-1) to repeat forever
        }); // end of create 'Act' animation

        // Create 'DeAct' animation
        this.gravityInverter.anims.create({
            key: 'DeAct',
            frames: this.gravityInverter.anims.generateFrameNames(this.key, {start: 18, end: 35, zeroPad: 4, prefix: "", suffix: ".png"}),
            frameRate: 100,
            repeat: 0              // set to (-1) to repeat forever
        }); // end of create 'DeAct' animation
    }

    /**
     * @param {number}x
     * @param {number} y
     * @returns {Phaser.GameObjects.Sprite}
     */
    place(x = 0, y = 0)
    {
        this.gravityInverter = this.scene.add.sprite(x, y, this.key)
        this.createSprite()
        this.gravityInverter.play('Off')
        this._group.add(this.gravityInverter)

        this.gravityInverter.setState(OFF)

        return this.gravityInverter
    }

    // Inverts gravity from its current state.
    /**
     * @param {Phaser.GameObjects.Sprite} ball
     * @param {Phaser.GameObjects.Sprite} gravityInverter
     */
    toggle(ball, gravityInverter)
    {
        if (ball.getData('lock'))
            return

        if(gravityInverter.state == OFF)
        {
            this.gravityInverter.play('Act')
            ball.body.setGravityY(-400 - ball.body.gravity.y)
            gravityInverter.setState(ON)
        }
        else
        {
            this.gravityInverter.play('DeAct')
            ball.body.setGravityY(0 - ball.body.gravity.y)
            gravityInverter.setState(OFF)
        }

        this.inverted = !this.inverted
    }
}