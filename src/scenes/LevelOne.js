import Phaser from 'phaser'

export default class LevelOne extends Phaser.Scene
{

    constructor()
    {
        super('levelOne');
    }

    preload()
    {
        this.load.image('background-levelone', 'images/leveloneplaceholder.png');
    }

    create()
    {
        this.add.image(960, 540, 'background-levelone');
        this.add.text(100, 100, 'Level 1', {fill: '#ffffff'});//Used to help identify the current level

    }
}