const ON = 1
const OFF = 0



export default class Fans
{
    /**
     * @param {Phaser.Scene} scene the scene that is creating "Fans"
     * @param {string} fanKey
     * @param {string} windKey
     */
    constructor(scene, fanKey = 'fan', windKey = 'wind')
    {
        this.scene = scene
        this.key = fanKey
        this.windKey = windKey
        this.togglable = true

        this._group = this.scene.physics.add.staticGroup()
        this._windGroup = this.scene.physics.add.staticGroup()
    }

    // Creates sprite for the fan
    createSprite(){

        // Create 'On' animation
        this.scene.anims.create({
            key: 'On',
            frames: [
                {
                    key: 'fan',
                    frame: '0000.png'
                },{
                    key: 'fan',
                    frame: '0001.png'
                },{
                    key: 'fan',
                    frame: '0002.png'
                },{
                    key: 'fan',
                    frame: '0003.png'
                },{
                    key: 'fan',
                    frame: '0004.png'
                },{
                    key: 'fan',
                    frame: '0005.png'
                },{
                    key: 'fan',
                    frame: '0006.png'
                },{
                    key: 'fan',
                    frame: '0007.png'
                }],
            skipMissedFrames: true,
            defaultTextureKey: null,
            startFrame: 0,

            // time
            delay: 0,
            frameRate: null,
            duration: null,
            timeScale: 1,

            // repeat
            repeat: -1,              // set to (-1) to repeat forever
            repeatDelay: 0,
            yoyo: false,

            // visible
            showOnStart: false,
            hideOnComplete: false
        }) // end of create 'On' animation;

        // Create 'Off' animation
        this.scene.anims.create({
            key: 'Off',
            frames: [
                {
                    key: 'fan',
                    frame: '0008.png'
                }],
            skipMissedFrames: true,
            defaultTextureKey: null,
            startFrame: 0,

            // time
            delay: 0,
            frameRate: null,
            duration: null,
            timeScale: 1,

            // repeat
            repeat: 0,              // set to (-1) to repeat forever
            repeatDelay: 0,
            yoyo: false,

            // visible
            showOnStart: false,
            hideOnComplete: false
        }) // end of create 'Off' animation;

    }

    /**
     * @returns {Phaser.Physics.Arcade.StaticGroup}
     */
    get group()
    {
        return this._group
    }

    /**
     * @returns {Phaser.Physics.Arcade.StaticGroup}
     */
    get windGroup()
    {
        return this._windGroup
    }

    /**
     * @param {Phaser.GameObjects.Sprite} ball ball who's mass will be amplified
     * @param {Phaser.GameObjects.Sprite} fan Fan that ball collided with.
     */
    toggle(ball, fan)
    {
        const wind = fan.getData('wind')

        if (wind.state == ON) {
            fan.play('Off')
            wind.setState(OFF)
        }
        else {
            fan.play('On')
            wind.setState(ON)
        }
    }

    /**
     * @param {Phaser.GameObjects.Sprite} ball
     * @param {Phaser.GameObjects.Sprite} wind
     * @return {boolean}
     */
    isActive(ball, wind)
    {
        if (wind.state == ON)
            return true
        else
            return false
    }

    /**
     * These default values should probably be changed to where they are located in the UI.
     * @param x
     * @param y
     * @returns {Phaser.GameObjects.Sprite}
     */
    place(x = 0, y = 0)
    {
        this.scene.load.atlas('fan','images/Fan.png','images/Fan.json')
        const fan = this.scene.add.sprite(x, y, this.key)
        this.createSprite()
        fan.play('Off')
        this._group.add(fan)
        const wind = this.windGroup.create(x, y - fan.body.height - 150, this.windKey)
        wind.visible = false

        fan.setName('fan')


        wind.body.setSize(fan.body.width, 300)
        wind.setState(OFF)

        fan.setData('wind', wind)

        return fan
    }

    // Pushes the ball, assumed only to happen when the ball is in a wind current.
    /**
     * @param {Phaser.GameObjects.Sprite} ball the ball being pushed by the fan
     * @param {Phaser.GameObjects.Sprite} wind specific instance of wind from fan
     */
    pushBall(ball, wind)
    {
        let accelerationX = ball.body.acceleration.x
        let accelerationY = ball.body.acceleration.y

        switch (wind.angle)
        {
            case 0:
                accelerationY = -300
                break
            case 90:
                accelerationX = 300
                break
            case 180:
                accelerationY = 300
                break
            case -180:
                accelerationY = 300
                break
            case -90:
                accelerationX = -300
                break
        }

        ball.body.setAcceleration(accelerationX, accelerationY)
    }

    /**
     * @param {Phaser.GameObjects.Sprite} fan
     */
    static rotateWind(fan)
    {
        const wind = fan.getData('wind')
        wind.setAngle(fan.angle)

        let newHeight = wind.body.width
        let newWidth = wind.body.height
        wind.body.setSize(newWidth, newHeight)

        switch (wind.angle)
        {
            case 0:
                wind.x = fan.x
                wind.y = fan.y - fan.body.height - 150
                break
            case 90:
                wind.x = fan.x + fan.body.width + 150
                wind.y = fan.y
                break
            case 180:
                wind.x = fan.x
                wind.y = fan.y + fan.body.height + 150
                break
            case -180:
                wind.x = fan.x
                wind.y = fan.y + fan.body.height + 150
                break
            case -90:
                wind.x = fan.x - fan.body.width - 150
                wind.y = fan.y
                break
        }

        wind.body.x = wind.x - wind.body.width / 2
        wind.body.y = wind.y - wind.body.height / 2
    }

    /**
     * @param {Phaser.GameObjects.Sprite} fan
     */
    static dragWind(fan)
    {
        const wind = fan.getData('wind')

        switch (wind.angle)
        {
            case 0:
                wind.x = fan.x
                wind.y = fan.y - fan.body.height - 150
                break
            case 90:
                wind.x = fan.x + fan.body.width + 150
                wind.y = fan.y
                break
            case 180:
                wind.x = fan.x
                wind.y = fan.y + fan.body.height + 150
                break
            case -180:
                wind.x = fan.x
                wind.y = fan.y + fan.body.height + 150
                break
            case -90:
                wind.x = fan.x - fan.body.width - 150
                wind.y = fan.y
                break
        }

        wind.body.x = wind.x - wind.body.width / 2
        wind.body.y = wind.y - wind.body.height / 2
    }

}