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
        directionalGate.gameObject.setData('exit', 'left')
        directionalGate.gameObject.setData('entrance', 'right')

        directionalGate.setCollideWorldBounds(true)

        return directionalGate
    }

    /**
     * @param ball {Phaser.Physics.Arcade.Body}
     * @param {Phaser.Physics.Arcade.StaticBody} directionalGate
     */
    isCorrectSide(ball, directionalGate)
    {

    }

    get group()
    {
        return this._group
    }
}