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
            frames: [
                {
                    key: this.key,
                    frame: '0000.png'
                },{
                    key: this.key,
                    frame: '0001.png'
                },{
                    key: this.key,
                    frame: '0002.png'
                },{
                    key: this.key,
                    frame: '0004.png'
                },{
                    key: this.key,
                    frame: '0005.png'
                },{
                    key: this.key,
                    frame: '0006.png'
                },{
                    key: this.key,
                    frame: '0007.png'
                },{
                    key: this.key,
                    frame: '0008.png'
                },{
                    key: this.key,
                    frame: '0009.png'
                },{
                    key: this.key,
                    frame: '0010.png'
                },{
                    key: this.key,
                    frame: '0011.png'
                },{
                    key: this.key,
                    frame: '0012.png'
                },{
                    key: this.key,
                    frame: '0013.png'
                },{
                    key: this.key,
                    frame: '0014.png'
                },{
                    key: this.key,
                    frame: '0015.png'
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

            // visible
            showOnStart: false,
            hideOnComplete: false
        }) // end of create 'On' animation;

        // Create 'Off' animation
        Sprite.anims.create({
            key: 'Off',
            frames: [
                {
                    key: this.key,
                    frame: '0016.png'
                },{
                    key: this.key,
                    frame: '0017.png'
                },{
                    key: this.key,
                    frame: '0018.png'
                },{
                    key: this.key,
                    frame: '0019.png'
                },{
                    key: this.key,
                    frame: '0020.png'
                },{
                    key: this.key,
                    frame: '0021.png'
                },{
                    key: this.key,
                    frame: '0022.png'
                },{
                    key: this.key,
                    frame: '0023.png'
                },{
                    key: this.key,
                    frame: '0024.png'
                },{
                    key: this.key,
                    frame: '0025.png'
                },{
                    key: this.key,
                    frame: '0026.png'
                },{
                    key: this.key,
                    frame: '0027.png'
                },{
                    key: this.key,
                    frame: '0028.png'
                },{
                    key: this.key,
                    frame: '0029.png'
                },{
                    key: this.key,
                    frame: '0030.png'
                },{
                    key: this.key,
                    frame: '0031.png'
                },{
                    key: this.key,
                    frame: '0032.png'
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
     * @param {number} x
     * @param {number} y
     * @returns {Phaser.GameObjects.Sprite}
     */
    place(x = 0, y = 0)
    {
        let prism = this.scene.add.sprite(x, y, this.key)
        prism.play('Off')
        this._group.add(prism)

        return prism
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