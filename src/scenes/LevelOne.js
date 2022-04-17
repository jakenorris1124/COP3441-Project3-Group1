import Phaser from 'phaser'
import Fans from '../puzzleObjects/Fans.js'
import Ball from '../puzzleObjects/Ball.js'
import UI from "../UI"
import Goal from "../puzzleObjects/Goal"

const BACKGROUND_LEVELONE_KEY = 'background-levelone'
const FAN_KEY = 'fan'
const WIND_KEY = 'wind'
const LEVEL_KEY = "Level 1"
const BALL_KEY = 'ball'

var levelBall;
var goal;
var isPaused;

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
        isPaused = true;
        this.add.image(960, 540, BACKGROUND_LEVELONE_KEY);

        this.fans = new Fans(this, FAN_KEY, WIND_KEY)
        const fanGroup = this.fans.group
        const windGroup = this.fans.windGroup

        this.ball = new Ball(this, BALL_KEY)
        const ballGroup = this.ball.group
        ballGroup.collideWorldBounds = true
        levelBall = this.ball.createStandardBall()

        //Temporary solution to "pause" the level. Since the game's gravity is 200, setting ball's gravity
        //to -200 will make it so it doesn't move
        levelBall.body.enable = false;

        const machines = ["fan", "fan", "light bridge", "button", "pulley"]; //Placeholder "machine" list for level 1 to test UI functionality

        this.levelUI = new UI(this, LEVEL_KEY, machines, levelBall);

        goal = new Goal(this, 500, 800)
        this.physics.add.collider(levelBall, goal.goal, this.winWrapper, null, this)
    }

    update()
    {

    }

    play(button)
    {
        button.setText("Stop")
        levelBall.body.enable = true;
        setTimeout(() => {
            button.on('pointerdown', () => {
                levelBall.setPosition(500, 350)
                levelBall.body.stop()
                levelBall.body.enable = false;
                button.setText("Start")
                this.levelUI.stop()
            }), 10
        });
    }

    winWrapper()
    {
        this.levelUI.win();
    }
}