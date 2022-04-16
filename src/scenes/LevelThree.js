import Phaser from 'phaser'

export default class LevelThree extends Phaser.Scene
{

    constructor()
    {
        super('levelThree');
    }

    preload()
    {
        this.load.image('background-levelone', 'images/leveloneplaceholder.png');
        this.scene.run('ui-scene');

    }

    create()
    {
        this.add.image(960, 540, 'background-levelone');
        this.add.text(100, 100, 'Level 3', {fill: '#ffffff'});//Used to help identify the current level

    }
}