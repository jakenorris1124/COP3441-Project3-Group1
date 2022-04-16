import Phaser from 'phaser'
import UI from "../UI";

const LEVEL_KEY = "Level 2"

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

        let machines = ["light bridge", "fan", "light bridge", "pulley", "pulley"]; //Placeholder "machine" list for level 2 to test UI functionality

        this.levelUI = new UI(this, LEVEL_KEY, machines);
    }
}