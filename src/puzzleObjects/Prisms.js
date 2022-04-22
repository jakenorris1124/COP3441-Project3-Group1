export default class Prisms
{
    /**
     * @param {Phaser.Scene} scene the scene that is creating "Prisms"
     * @param {string} prismKey
     */
    constructor(scene, prismKey = 'prism')
    {
        this.scene = scene
        this.key = prismKey
        this.togglable = false

        this._group = this.scene.physics.add.staticGroup()
    }

    // Creates sprite for the fan
    /**
     * @param {Phaser.GameObjects.Sprite} Sprite sprite being sent in to have animation added to it
     */
    createSprite(Sprite){

        // Create 'On' animation
        Sprite.anims.create({
            key: 'On',
            frames: this.scene.anims.generateFrameNames(this.key, {start: 0, end: 15, zeroPad: 4, prefix: "", suffix: ".png"}),
            frameRate: 20,
            repeat: -1              // set to (-1) to repeat forever
        }) // end of create 'On' animation;

        // Create 'Off' animation
        Sprite.anims.create({
            key: 'Off',
            frames: this.scene.anims.generateFrameNames(this.key, {start: 16, end: 32, zeroPad: 4, prefix: "", suffix: ".png"}),
            frameRate: 20,
            repeat: -1
        }) // end of create 'Off' animation;

    }

    /**
     * @param {number} x
     * @param {number} y
     * @returns {Phaser.GameObjects.Sprite}
     */
    place(x = 0, y = 0)
    {
        this.prism = this.scene.add.sprite(x,y,this.key)
        this.createSprite();
        this.prism.play('Off')
        this._group.add(this.prism)

        return this.prism
    }

    /**
     * @returns {Phaser.Physics.Arcade.StaticGroup}
     */
    get group()
    {
        return this._group
    }

    update(){}
}