export default class Buttons
{
    /**
     * @param {Phaser.Scene} scene the scene that is creating "Buttons"
     * @param {string} buttonKey
     */
    constructor(scene, buttonKey)
    {
        this.scene = scene
        this.key = buttonKey
        this.togglable = false

        this._group = this.scene.physics.add.staticGroup()
    }

    createSprite(){
        // Create 'Move' animation
        this.button.anims.create({
            key: 'MoveD',
            frames: this.button.anims.generateFrameNames(this.key, {start: 0, end: 10, zeroPad: 5, prefix: "", suffix: ".png"}),
            frameRate: 10,
            repeat: 0             // set to (-1) to repeat forever
        }); // end of create 'Move' animation

        // Create 'Move' animation
        this.button.anims.create({
            key: 'MoveU',
            frames: [{
                key: this.key,
                frame: '00010.png'
            }, {
                key: this.key,
                frame: '00009.png'
            }, {
                key: this.key,
                frame: '00008.png'
            }, {
                key: this.key,
                frame: '00007.png'
            }, {
                key: this.key,
                frame: '00006.png'
            }, {
                key: this.key,
                frame: '00005.png'
            }, {
                key: this.key,
                frame: '00004.png'
            }, {
                key: this.key,
                frame: '00003.png'
            }, {
                key: this.key,
                frame: '00002.png'
            }, {
                key: this.key,
                frame: '00001.png'
            }, {
                key: this.key,
                frame: '00000.png'
            }],
            frameRate: 10,
            repeat: 0            // set to (-1) to repeat forever
        }); // end of create 'Move' animation

        // Create 'Up' state
        this.button.anims.create({
            key: 'Up',
            frames: [{key: this.key, frame: '00000.png'}],
            frameRate: 8,
            repeat: 0              // set to (-1) to repeat forever
        }); // end of create 'Up' state

        // Create 'Down' state
        this.button.anims.create({
            key: 'Down',
            frames: [{key: this.key, frame: '00010.png'}],
            frameRate: 8,
            repeat: 0              // set to (-1) to repeat forever
        }); // end of create 'Down' state

    }

    /**
     * @param {number} x
     * @param {number} y
     * @return {Phaser.GameObjects.Sprite}
     */
    place(x = 0, y = 0)
    {
        this.button = this.scene.add.sprite(x, y, this.key)
        this.button.setScale(0.7)
        this.createSprite();
        this.button.play('Up');
        this._group.add(this.button)
        
        return this.button
    }

    /**
     * @returns {Phaser.Physics.Arcade.StaticGroup}
     */
    get group()
    {
        return this._group
    }
}