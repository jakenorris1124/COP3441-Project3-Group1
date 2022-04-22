export default class DirectionalGates
{
    /**
     * @param {Phaser.Scene} scene the scene that is creating "DirectionalGates"
     * @param {string} directionalGateKey
     */
    constructor(scene, directionalGateKey)
    {
        this.scene = scene
        this.key = directionalGateKey
        this.togglable = false

        this._group = this.scene.physics.add.staticGroup()
    }

    createSprite(){
        // Create 'Off' animation
        this.directionalGate.anims.create({
            key: 'Off',
            frames: this.directionalGate.anims.generateFrameNames(this.key, {start: 0, end: 11, zeroPad: 4, prefix: "", suffix: ".png"}),
            frameRate: 20,
            repeat: -1              // set to (-1) to repeat forever
        }); // end of create 'Off' animation

        // Create 'On' animation
        this.directionalGate.anims.create({
            key: 'On',
            frames: this.directionalGate.anims.generateFrameNames(this.key, {start: 14, end: 25, zeroPad: 4, prefix: "", suffix: ".png"}),
            frameRate: 20,
            repeat: -1              // set to (-1) to repeat forever

        }); // end of create 'On' animation
    }

    /**
     * @param x
     * @param y
     * @returns {Phaser.GameObjects.Sprite}
     */
    place(x = 0, y = 0)
    {
        this.directionalGate = this.scene.add.sprite(x, y, this.key)
        this.createSprite()
        this.directionalGate.play('Off')
        this._group.add(this.directionalGate)

        return this.directionalGate
    }

    /**
     * @param {Phaser.GameObjects.Sprite} ball
     * @param {Phaser.GameObjects.Sprite} directionalGate
     */
    isWrongSide(ball, directionalGate)
    {
        let touchDirection = directionalGate.body.touching

        // This number should be the angle of rotation of the directionalGate but idk how to get it.
        switch (0)
        {
            case 0:
                return !touchDirection.right
            case 90:
                return !touchDirection.down
            case 180:
                return !touchDirection.left
            case -180:
                return !touchDirection.left
            case -90:
                return !touchDirection.left
            default:
                console.log("Rotation angle somehow not a multiple of 90.")
                return true
        }
    }

    /**
     * @returns {Phaser.Physics.Arcade.StaticGroup}
     */
    get group()
    {
        return this._group
    }
}