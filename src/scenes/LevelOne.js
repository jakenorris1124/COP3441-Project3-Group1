import Phaser from 'phaser'
import Fans from '../puzzleObjects/Fans.js'
import Ball from '../puzzleObjects/Ball.js'
import UI from "../UI"

const BACKGROUND_LEVELONE_KEY = 'background-levelone'
const FAN_KEY = 'fan'
const WIND_KEY = 'wind'
const LEVEL_KEY = "Level 1"
const BALL_KEY = 'ball'

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
        this.load.image(BALL_KEY, 'images/ballPlaceholder.png');
    }

    create()
    {
        this.add.image(960, 540, BACKGROUND_LEVELONE_KEY);

        this.fans = new Fans(this, FAN_KEY, WIND_KEY)
        const fanGroup = this.fans.group
        const windGroup = this.fans.windGroup

        this.ball = new Ball(this, BALL_KEY)
        const ballGroup = this.ball.group
        ballGroup.collideWorldBounds = true

        this.levelUI = new UI(this, LEVEL_KEY);
        const machines = ["fan", "fan", "light bridge", "button", "pulley"]; //Placeholder "machine" list for level 1 to test UI functionality

        this.levelUI = new UI(this, LEVEL_KEY, machines);

    }

    update()
    {

    }
}