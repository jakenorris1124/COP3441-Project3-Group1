export default class DirectionalGates
{
    /**
     * @param {Phaser.scene} the scene that is creating "DirectionalGates"
     */
    constructor(scene, directionalGateKey = 'directionalGate')
    {
        this.scene = scene
        this.key = directionalGateKey

        this._group = this.scene.physics.add.group()
    }

    placeDirectionalGate(x = 0, y = 0)
    {
        const directionalGate = this.group.create(x, y, this.key)

        directionalGate.setCollideWorldBounds(true)

        return directionalGate
    }

    get group()
    {
        return this._group
    }
}