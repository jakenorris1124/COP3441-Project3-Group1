export default class Fans
{
    /**
     * @param {Phaser.scene} scene the scene that is creating "Fans"
     */
    constructor(scene, fanKey = 'fan', windKey = 'wind')
    {
        this.scene = scene
        this.key = fanKey
        this.windKey = windKey

        this._group = this.scene.physics.add.staticGroup()
        this._windGroup = this.scene.physics.add.staticGroup()
    }

    get group()
    {
        return this._group
    }

    get windGroup()
    {
        return this._windGroup
    }

    // Will be implemented later to pick up a fan that has been placed. Not sure
    // if fan will be grabbed from UI the same way.
    grabFan(fan)
    {

    }

    // These default values should probably be changed to where they are located in the UI.
    placeFan(x = 0, y = 0)
    {
        const fan = this.group.create(x, y, this.key)
        const wind = this.windGroup.create(x, y, this.windKey) // Will need to adjust x and y values here later.

        fan.gameObject.setData('wind', wind)

        wind.setVisible(false)

        fan.setCollideWorldBounds(true)

        return fan
    }

    // Pushes the ball, assumed only to happen when the ball is in a wind current.
    /**
     * @param {Phaser.Physics.Arcade.Body} ball the ball being pushed by the fan
     * @param {Phaser.Physics.Arcade.StaticBody} wind specific instance of wind from fan
     */
    pushBall(ball, wind)
    {
        // I am not sure how to get a vector that is in a direction relative to the wind sprite
        // but that needs to be done here
        let accelerationX = 5
        let accelerationY = 0

        ball.setAcceleration(accelerationX, accelerationY)
    }
}