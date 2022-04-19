import Phaser from 'phaser'
import UI from "../UI";
import Anchors from "../puzzleObjects/Anchors";
import Ball from "../puzzleObjects/Ball";
import Buttons from "../puzzleObjects/Buttons";
import DirectionalGates from "../puzzleObjects/DirectionalGates";
import Fans from "../puzzleObjects/Fans";
import GravityInverters from "../puzzleObjects/GravityInverters";
import HeavyBallTransformers from "../puzzleObjects/HeavyBallTransformers";
import LightBallTransformers from "../puzzleObjects/LightBallTransformers";
import LightBridges from "../puzzleObjects/LightBridges";
import Prisms from "../puzzleObjects/Prisms";
import Pullies from "../puzzleObjects/Pullies";
import Springs from "../puzzleObjects/Springs";

const LEVEL_KEY = "Level 3"
const FAN_KEY = 'fan'
const WIND_KEY = 'wind'
const LIGHT_BRIDGE_KEY = 'light bridge'
const BUTTON_KEY = 'button'
const PULLEY_KEY = 'pulley'
const BALL_KEY = 'ball'
const ANCHOR_KEY = 'anchor'
const GRAVITY_INVERTER_KEY = 'gravity inverter'
const HEAVY_BALL_TRANSFORMER_KEY = 'heavy ball transformer'
const LIGHT_BALL_TRANSFORMER_KEY = 'light ball transformer'
const PRISM_KEY = 'prism'
const SPRING_KEY = 'spring'
const DIRECTIONAL_GATE_KEY = 'directional gate'

var levelBall;

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

        this.initializeGroups()
        this.setDefaultCollisions()

        levelBall = this.balls.createStandardBall()

        let machines = ["button", "fan", "pulley", "button", "pulley"]; //Placeholder "machine" list for level 3 to test UI functionality

        this.levelUI = new UI(this, LEVEL_KEY, machines);
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
    }

    setDefaultCollisions()
    {
        this.physics.world.setBoundsCollision()

        this.physics.add.collider(
            this.ballGroup,
            [this.ballGroup, this.lightBridgeGroup, this.prismGroup],
            this
        )

        this.physics.add.collider(this.ballGroup, this.fanGroup,
            this.fans.activate, null, this)

        this.physics.add.collider(this.ballGroup, this.directionalGateGroup,
            null, this.directionalGates.isCorrectSide, this)

        this.physics.add.collider(this.ballGroup, this.gravityInverterGroup,
            this.gravityInverters.toggle, null, this)

        this.physics.add.collider(this.ballGroup, this.heavyBallTransformerGroup,
            this.heavyBallTransformers.toggle, null, this)

        this.physics.add.collider(this.ballGroup, this.lightBallTransformerGroup,
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