export default class Springs
{
    /**
     * @param {Phaser.Scene} scene the scene that is creating "Springs"
     * @param {string} springKey
     */
    constructor(scene, springKey = 'spring')
    {
        this.scene = scene
        this.key = springKey
        this.togglable = false

        this._group = this.scene.physics.add.staticGroup()
    }

    createSprite(){
        // Create 'Bounce' animation
        this.spring.anims.create({
            key: 'Bounce',
            frames: this.spring.anims.generateFrameNames(this.key, {start: 0, end: 13, zeroPad: 4, prefix: "", suffix: ".png"}),
            frameRate: 70,
            repeat: 0              // set to (-1) to repeat forever
        }); // end of create 'Bounce' animation
    }

    /**
     * @param {number} x
     * @param {number} y
     * @returns {Phaser.GameObjects.Sprite}
     */
    place(x = 0, y = 0)
    {
        this.spring = this.scene.add.sprite(x, y, this.key).setScale(0.7)
        this.createSprite()
        this.spring.play('Idle')
        this._group.add(this.spring)

        return this.spring
    }

    /**
     * @param {Phaser.GameObjects.Sprite} ball ball who's mass will be amplified
     * @param {Phaser.GameObjects.Sprite} spring Heavy Ball Transformer that ball collided with.
     */
    toggle(ball, spring)
    {
        let velocityX = ball.body.velocity.x
        let velocityY = ball.body.velocity.y
        spring.play('Bounce')

        switch (spring.angle)
        {
            case 0:
                if (spring.body.touching.up && !spring.body.touching.left && !spring.body.touching.right)
                    velocityY = -1000
                break
            case 90:
                if (!spring.body.touching.up && spring.body.touching.right)
                    velocityX = 1000
                break
            case 180:
                if (spring.body.touching.down && !spring.body.touching.left && !spring.body.touching.right)
                    velocityY = 1000
                break
            case -180:
                if (spring.body.touching.down && !spring.body.touching.left && !spring.body.touching.right)
                    velocityY = 1000
                break
            case -90:
                if (!spring.body.touching.top && spring.body.touching.left)
                    velocityX = -1000
                break
            }

        ball.body.setVelocity(velocityX, velocityY)
    }

    /**
     * @returns {Phaser.Physics.Arcade.StaticGroup}
     */
    get group()
    {
        return this._group
    }
}