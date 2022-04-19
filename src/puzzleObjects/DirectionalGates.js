export default class DirectionalGates
{
    /**
     * @param {Phaser.Scene} scene the scene that is creating "DirectionalGates"
     */
    constructor(scene, directionalGateKey = 'directional gate')
    {
        this.scene = scene
        this.key = directionalGateKey

        this._group = this.scene.physics.add.group()
    }

    placeDirectionalGate(x = 0, y = 0)
    {
        const directionalGate = this.group.create(x, y, this.key)

        directionalGate.body.setCollideWorldBounds(true)

        return directionalGate
    }

    /**
     * @param {Phaser.GameObjects.GameObject} ball
     * @param {Phaser.GameObject.GameObject} directionalGate
     */
    isWrongSide(ball, directionalGate)
    {
        let touchDirection = directionalGate.body.touching

        switch (directionalGate.parentContainer.angle)
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

    get group()
    {
        return this._group
    }
}