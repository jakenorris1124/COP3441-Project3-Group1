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
    createSprite(){
        this.scene.load.atlas('prism','images/Prism.png','images/Prism.json');

        // Create 'On' animation
        this.scene.anims.create({
            key: 'On',
            frames: [
                {
                    key: 'prism',
                    frame: '0000.png'
                },{
                    key: 'prism',
                    frame: '0001.png'
                },{
                    key: 'prism',
                    frame: '0002.png'
                },{
                    key: 'prism',
                    frame: '0004.png'
                },{
                    key: 'prism',
                    frame: '0005.png'
                },{
                    key: 'prism',
                    frame: '0006.png'
                },{
                    key: 'prism',
                    frame: '0007.png'
                },{
                    key: 'prism',
                    frame: '0008.png'
                },{
                    key: 'prism',
                    frame: '0009.png'
                },{
                    key: 'prism',
                    frame: '0010.png'
                },{
                    key: 'prism',
                    frame: '0011.png'
                },{
                    key: 'prism',
                    frame: '0012.png'
                },{
                    key: 'prism',
                    frame: '0013.png'
                },{
                    key: 'prism',
                    frame: '0014.png'
                },{
                    key: 'prism',
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
            yoyo: false,

            // visible
            showOnStart: false,
            hideOnComplete: false
        }) // end of create 'On' animation;

        // Create 'Off' animation
        this.scene.anims.create({
            key: 'Off',
            frames: [
                {
                    key: 'prism',
                    frame: '0016.png'
                },{
                    key: 'prism',
                    frame: '0017.png'
                },{
                    key: 'prism',
                    frame: '0018.png'
                },{
                    key: 'prism',
                    frame: '0019.png'
                },{
                    key: 'prism',
                    frame: '0020.png'
                },{
                    key: 'prism',
                    frame: '0021.png'
                },{
                    key: 'prism',
                    frame: '0022.png'
                },{
                    key: 'prism',
                    frame: '0023.png'
                },{
                    key: 'prism',
                    frame: '0024.png'
                },{
                    key: 'prism',
                    frame: '0025.png'
                },{
                    key: 'prism',
                    frame: '0026.png'
                },{
                    key: 'prism',
                    frame: '0027.png'
                },{
                    key: 'prism',
                    frame: '0028.png'
                },{
                    key: 'prism',
                    frame: '0029.png'
                },{
                    key: 'prism',
                    frame: '0030.png'
                },{
                    key: 'prism',
                    frame: '0031.png'
                },{
                    key: 'prism',
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
        this.createSprite()
        const prism = this.scene.add.sprite(x, y, this.key)
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
}