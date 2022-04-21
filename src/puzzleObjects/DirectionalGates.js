export default class DirectionalGates
{
    /**
     * @param {Phaser.Scene} scene the scene that is creating "DirectionalGates"
     * @param {string} directionalGateKey
     */
    constructor(scene, directionalGateKey = 'directional gate')
    {
        this.scene = scene
        this.key = directionalGateKey
        this.togglable = false

        this._group = this.scene.physics.add.staticGroup()
    }

    /**
     * @param x
     * @param y
     * @returns {Phaser.GameObjects.Sprite}
     */
    placeDirectionalGate(x = 0, y = 0)
    {
        const directionalGate = this.scene.add.sprite(x, y, this.key)
        this._group.add(directionalGate)

        directionalGate.body.setCollideWorldBounds(true)

        return directionalGate
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