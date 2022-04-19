export default class Fans
{
    /**
     * @param {Phaser.Scene} scene the scene that is creating "Fans"
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

    /**
     * @param {Phaser.GameObjects.GameObject} ball ball who's mass will be amplified
     * @param {Phaser.GameObjects.GameObject} fan Heavy Ball Transformer that ball collided with.
     */
    toggle(ball, fan)
    {
      
    }

    activate()
    {

    }

    deactivate()
    {

    }

    // These default values should probably be changed to where they are located in the UI.
    place(x = 0, y = 0)
    {
        const fan = this.group.create(x, y, this.key)
        const wind = this.windGroup.create(x, y, this.windKey) // Will need to adjust x and y values here later.
        

        fan.setData('wind', wind)
        fan.setActive(false)

        wind.parentContainer.setVisible(false)

        return fan
    }

    // Pushes the ball, assumed only to happen when the ball is in a wind current.
    /**
     * @param {Phaser.GameObjects.GameObject} ball the ball being pushed by the fan
     * @param {Phaser.GameObjects.GameObject} wind specific instance of wind from fan
     */
    pushBall(ball, wind)
    {
        // I am not sure how to get a vector that is in a direction relative to the wind sprite
        // but that needs to be done here
        let accelerationX = 5
        let accelerationY = 0

        ball.body.setAcceleration(accelerationX, accelerationY)
    }


}