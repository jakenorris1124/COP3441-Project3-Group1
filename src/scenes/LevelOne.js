import Phaser from 'phaser'
import Fans from '../puzzleObjects/Fans.js'
import UI from "../UI"

const BACKGROUND_LEVELONE_KEY = 'background-levelone'
const FAN_KEY = 'fan'
const WIND_KEY = 'wind'
const LEVEL_KEY = "Level 1"

export default class LevelOne extends Phaser.Scene
{
    constructor()
    {
        super('levelOne');
    }

    preload()
    {
        this.load.image(BACKGROUND_LEVELONE_KEY, 'images/leveloneplaceholder.png');
        this.load.image(FAN_KEY, 'images/fanPlaceholder.png');
    }

    create()
    {
        this.add.image(960, 540, BACKGROUND_LEVELONE_KEY);

        this.fans = new Fans(this, FAN_KEY, WIND_KEY)
        const fanGroup = this.fans.group
        const windGroup = this.fans.windGroup

        const machines = ["fan", "fan", "light bridge", "button", "pulley"]; //Placeholder "machine" list for level 1 to test UI functionality

        this.levelUI = new UI(this, LEVEL_KEY, machines);
    }

    update()
    {

    }
}