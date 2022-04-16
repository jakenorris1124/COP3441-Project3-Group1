export default class Fans
{
    /*
     * @param {Phaser.scene} scene
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

    grabFan(fan)
    {

    }

    // These default values should probably be changed to where they are located in the UI.
    placeFan(x = 0, y = 0)
    {
        const fan = this.group.create(x, y, this.key)
        const wind = this.windGroup.create(x, y, this.windKey)

        wind.setVisible(false)

        fan.setCollideWorldBounds(true)
    }
}