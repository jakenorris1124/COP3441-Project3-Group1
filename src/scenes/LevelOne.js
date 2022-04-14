import Phaser from 'phaser'

export default class LevelOne extends Phaser.Scene
{

    constructor()
    {
        super('levelOne');
    }

    preload()
    {
        console.log("Preload!");
        this.load.image('background-levelone', 'images/leveloneplaceholder.png');
    }

    create()
    {
        this.add.image(960, 540, 'background-levelone');

        console.log("Create!");
    }
}