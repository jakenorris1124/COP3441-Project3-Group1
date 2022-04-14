import Phaser from 'phaser'

export default class LevelTwo extends Phaser.Scene
{

    constructor()
    {
        super('levelTwo');
    }

    preload()
    {
        this.load.image('background-levelone', 'images/leveloneplaceholder.png');
    }

    create()
    {
        this.add.image(960, 540, 'background-levelone');
        this.add.text(100, 100, 'Level 2', {fill: '#ffffff'});//Used to help identify the current level
    }
}