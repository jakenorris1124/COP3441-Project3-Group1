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
import Springs from "../puzzleObjects/Springs";
import UI from "../UI"
import Goal from "../puzzleObjects/Goal"

const LEVEL_KEY = "Level 3"
const FAN_KEY = 'fan'
const WIND_KEY = 'wind'
const LIGHT_BRIDGE_KEY = 'light bridge'
const BUTTON_KEY = 'button'
const PULLEY_KEY = 'lift'
const BALL_KEY = 'ball'
const ANCHOR_KEY = 'anchor'
const GRAVITY_INVERTER_KEY = 'gravity inverter'
const HEAVY_BALL_TRANSFORMER_KEY = 'heavy ball transformer'
const LIGHT_BALL_TRANSFORMER_KEY = 'light ball transformer'
const SPRING_KEY = 'spring'
const DIRECTIONAL_GATE_KEY = 'directional gate'

const ON = 1
const OFF = 0

var goal;

export default class LevelThree extends Phaser.Scene
{

    constructor()
    {
        super('levelThree');
    }

    preload()
    {
        this.load.image(LEVEL_KEY, 'images/leveloneplaceholder.png');
        this.load.image(FAN_KEY, 'images/Fan Off.png');
        this.load.image(BALL_KEY, 'images/ballPlaceholder.png');
        this.load.image(BUTTON_KEY, 'images/But Up.png')
        this.load.image(LIGHT_BRIDGE_KEY, 'images/Light Bridge Off.png')
        this.load.image(GRAVITY_INVERTER_KEY, 'images/Grav Inv On.png')
        this.load.image(SPRING_KEY, 'images/Spring.png')
        this.load.image(DIRECTIONAL_GATE_KEY, 'images/Dir Gate On.png')
        this.load.image(PULLEY_KEY, 'images/Lift Open.png')
        this.load.image(LIGHT_BALL_TRANSFORMER_KEY, 'images/Light Trans Off.png')
        this.load.image(HEAVY_BALL_TRANSFORMER_KEY, 'images/Heavy Trans Off.png')
    }

    create()
    {
        this.add.image(960, 540, LEVEL_KEY);

        this.initializeGroups()
        this.setDefaultCollisions()

        this.levelBall = this.balls.createStandardBall()
        this.levelBall.body.enable = false;

        this.machines = [this.fans, this.fans, this.lightBridges, this.buttons, this.pullies, this.gravityInverters, this.springs,
            this.directionalGates, this.lightBallTransformers, this.heavyBallTransformers, this.anchors]; //Placeholder "machine" list for level 1 to test UI functionality

        this.levelUI = new UI(this, LEVEL_KEY, this.machines, this.levelBall);

        goal = new Goal(this, 500, 800)
        this.physics.add.collider(this.levelBall, goal.goal, this.winWrapper, null, this)
    }

    update()
    {
        // Resets ball acceleration when it no longer collides with any forces.
        this.levelBall.body.setAcceleration(0, 0)
        this.physics.overlap(this.ballGroup, this.windGroup,
            this.fans.pushBall, this.fans.isActive, this)

        if (this.levelBall.getData('lock') && this.levelBall.body.enable)
        {
            this.anchorGroup.children.iterate((anchor) => {
                anchor.x = this.levelBall.x
                anchor.y = this.levelBall.y
            })
        }
    }

    /**
     * @param {Phaser.GameObjects.Text} button
     */
    play(button)
    {
        button.setText("Stop")
        this.levelBall.body.enable = true;
        setTimeout(() => {
            button.once('pointerdown', () => {
                this.reset()
                button.setText("Start")
                this.levelUI.stop()
            }), 10
        });
    }

    reset()
    {
        this.levelBall.setPosition(500, 350)
        this.levelBall.body.stop()
        this.levelBall.body.setGravityY(0)
        this.levelBall.body.setMass(50)
        this.levelBall.body.enable = false

        this.lightBridgeGroup.children.iterate((emitter) => {
            if (emitter.state == ON)
                this.lightBridges.toggle(this.levelBall, emitter)
        })

        this.anchorGroup.children.iterate((anchor) => {
            anchor.x = this.levelBall.x
            anchor.y = this.levelBall.y
        })

        this.pulleyGroup.children.iterate((pulley) => {
            pulley.body.setVelocityX(0)
            pulley.body.setVelocityY(0)
            pulley.setX(pulley.getData('initialX'))
            pulley.setY(pulley.getData('initialY'))

            if (pulley.getData('timeEvent') != undefined)
                this.time.removeEvent(pulley.getData('timeEvent'))
        })

        let alreadyToggled = new Set()
        for (let i in this.machines)
        {
            if (!this.levelUI.machineStatus[i] && this.machines[i].togglable
                && !alreadyToggled.has(this.machines[i]))
            {
                this.machines[i].group.children.iterate((child) => {
                    if (child.state == ON)
                        this.machines[i].toggle(this.levelBall, child)
                })

                alreadyToggled.add(this.machines[i])
            }
        }
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
        this.pulleyGroup = this.pullies.group
        this.sprinGroup = this.springs.group
        this.HBTBoundaryGroup = this.heavyBallTransformers.boundaryGroup
        this.LBTBoundaryGroup = this.lightBallTransformers.boundaryGroup
    }

    setDefaultCollisions()
    {
        this.physics.add.collider(
            this.ballGroup,
            [this.ballGroup, this.lightBridgeGroup,
                this.HBTBoundaryGroup, this.LBTBoundaryGroup, this.pulleyGroup],
            null, null, this
        )

        this.physics.add.collider(this.ballGroup, this.fanGroup,
            this.fans.toggle, null, this)

        this.physics.add.collider(this.ballGroup, this.gravityInverterGroup,
            this.gravityInverters.toggle, null, this)

        this.physics.add.overlap(this.ballGroup, this.heavyBallTransformerGroup,
            this.heavyBallTransformers.toggle, null, this)

        this.physics.add.overlap(this.ballGroup, this.lightBallTransformerGroup,
            this.lightBallTransformers.toggle, null, this)

        this.physics.add.collider(this.ballGroup, this.sprinGroup,
            this.springs.toggle, null, this)

        this.physics.add.collider(this.ballGroup, this.buttonGroup,
            this.activateAllPieces, null, this)
    }

    /**
     * @param {Phaser.GameObjects.Sprite} ball
     */
    activateAllPieces(ball)
    {
        let alreadyToggled = new Set()
        for (let i in this.machines)
        {
            if (!this.levelUI.machineStatus[i] && this.machines[i].togglable
                && !alreadyToggled.has(this.machines[i]))
            {
                this.machines[i].group.children.iterate((child) => {
                    this.machines[i].toggle(ball, child)
                })

                alreadyToggled.add(this.machines[i])
            }
        }
    }
}