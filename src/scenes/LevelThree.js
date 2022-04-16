import Phaser from 'phaser'
import UI from "../UI";

const LEVEL_KEY = "Level 3"

export default class LevelThree extends Phaser.Scene
{

    constructor()
    {
        super('levelThree');
    }

    preload()
    {
        this.load.image('background-levelone', 'images/leveloneplaceholder.png');

    }

    create()
    {
        this.add.image(960, 540, 'background-levelone');

        let machines = ["button", "fan", "pulley", "button", "pulley"]; //Placeholder "machine" list for level 3 to test UI functionality

        this.levelUI = new UI(this, LEVEL_KEY, machines);
    }
}