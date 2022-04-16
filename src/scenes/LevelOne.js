import Phaser from 'phaser'
import Fans from '../puzzleObjects/Fans.js'

const BACKGROUND_LEVELONE_KEY = 'background-levelone'
const FAN_KEY = 'fan'
const WIND_KEY = 'wind'

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
        this.scene.run("uiScene");
    }

    create()
    {
        this.add.image(960, 540, BACKGROUND_LEVELONE_KEY);
        this.add.text(100, 100, 'Level 1', {fill: '#ffffff'});//Used to help identify the current level

        this.fans = new Fans(this, FAN_KEY, WIND_KEY)
        const fanGroup = this.fans.group
        const windGroup = this.fans.windGroup
    }

    update()
    {

    }
}