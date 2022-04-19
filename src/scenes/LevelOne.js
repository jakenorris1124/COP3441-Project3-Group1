import Phaser from 'phaser'
import Fans from '../puzzleObjects/Fans.js'
import Ball from '../puzzleObjects/Ball.js'
import LightBridges from "../puzzleObjects/LightBridges";
import Buttons from "../puzzleObjects/Buttons";
import Pullies from "../puzzleObjects/Pullies";
import Anchors from "../puzzleObjects/Anchors.js"
import DirectionalGates from "../puzzleObjects/DirectionalGates";
import GravityInverters from "../puzzleObjects/GravityInverters";
import HeavyBallTransformers from "../puzzleObjects/HeavyBallTransformers";
import LightBallTransformers from "../puzzleObjects/LightBallTransformers";
import Prisms from "../puzzleObjects/Prisms";
import Springs from "../puzzleObjects/Springs";
import UI from "../UI"
import Goal from "../puzzleObjects/Goal"

const BACKGROUND_LEVELONE_KEY = 'background-levelone'
const FAN_KEY = 'fan'
const WIND_KEY = 'wind'
const LIGHT_BRIDGE_KEY = 'light bridge'
const BUTTON_KEY = 'button'
const PULLEY_KEY = 'pulley'
const LEVEL_KEY = "Level 1"
const BALL_KEY = 'ball'
const ANCHOR_KEY = 'anchor'
const GRAVITY_INVERTER_KEY = 'gravity inverter'
const HEAVY_BALL_TRANSFORMER_KEY = 'heavy ball transformer'
const LIGHT_BALL_TRANSFORMER_KEY = 'light ball transformer'
const PRISM_KEY = 'prism'
const SPRING_KEY = 'spring'
const DIRECTIONAL_GATE_KEY = 'directional gate'

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

        this.initializeGroups()
        this.setDefaultCollisions()

        levelBall = this.balls.createStandardBall()

        //Temporary solution to "pause" the level. Since the game's gravity is 200, setting ball's gravity
        //to -200 will make it so it doesn't move
        levelBall.body.enable = false;


        const machines = [this.fans, this.fans, this.lightBridges, this.buttons, this.pullies]; //Placeholder "machine" list for level 1 to test UI functionality

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

    initializeGroups()
    {
        this.anchors = new Anchors(this, ANCHOR_KEY)
        this.balls = new Ball(this, BALL_KEY)
        this.buttons = new Buttons(this, BUTTON_KEY)
        this.directionalGates = new DirectionalGates(this, DIRECTIONAL_GATE_KEY)
        this.fans = new Fans(this, FAN_KEY, WIND_KEY)
        this.gravityInverters = new GravityInverters(this, GRAVITY_INVERTER_KEY)
        this.heavyBallTransformers = new HeavyBallTransformers(this, HEAVY_BALL_TRANSFORMER_KEY)
        this.lightBallTransformers = new LightBallTransformers(this, LIGHT_BALL_TRANSFORMER_KEY)
        this.lightBridges = new LightBridges(this, LIGHT_BRIDGE_KEY)
        this.prisms = new Prisms(this, PRISM_KEY)
        this.pullies = new Pullies(this, PULLEY_KEY)
        this.springs = new Springs(this, SPRING_KEY)

        this.anchorGroup = this.anchors.group
        this.ballGroup = this.balls.group
        this.buttonGroup = this.buttons.group
        this.directionalGateGroup = this.directionalGates.group
        this.fanGroup = this.fans.group
        this.windGroup = this.fans.windGroup
        this.gravityInverterGroup = this.gravityInverters.group
        this.heavyBallTransformerGroup = this.heavyBallTransformers.group
        this.lightBallTransformerGroup = this.lightBallTransformers.group
        this.lightBridgeGroup = this.lightBridges.group
        this.prismGroup = this.prisms.group
        this.pullyGroup = this.pullies.group
        this.sprinGroup = this.springs.group
        this.HBTBoundaryGroup = this.heavyBallTransformers.boundaryGroup
        this.LBTBoundaryGroup = this.lightBallTransformers.boundaryGroup
    }

    setDefaultCollisions()
    {
        this.physics.world.setBoundsCollision()

        this.physics.add.collider(
            this.ballGroup,
            [this.ballGroup, this.lightBridgeGroup, this.prismGroup,
                this.HBTBoundaryGroup, this.LBTBoundaryGroup],
            this
        )

        this.physics.add.collider(this.ballGroup, this.fanGroup,
            this.fans.activate, null, this)

        this.physics.add.collider(this.ballGroup, this.directionalGateGroup,
            null, this.directionalGates.isWrongSide, this)

        this.physics.add.collider(this.ballGroup, this.gravityInverterGroup,
            this.gravityInverters.toggle, null, this)

        this.physics.add.overlap(this.ballGroup, this.heavyBallTransformerGroup,
            this.heavyBallTransformers.toggle, null, this)

        this.physics.add.overlap(this.ballGroup, this.lightBallTransformerGroup,
            this.lightBallTransformers.toggle, null, this)

        this.physics.add.collider(this.ballGroup, this.pullyGroup,
            this.pullies.toggle, this.pullies.isActive, this)

        this.physics.add.collider(this.ballGroup, this.sprinGroup,
            this.springs.toggle, null, this)

        this.physics.add.overlap(this.ballGroup, this.buttonGroup,
            this.activateAllPieces, null, this)

        this.physics.add.overlap(this.ballGroup, this.windGroup,
            this.fans.pushBall, null, this)
    }

    activateAllPieces()
    {

    }
}