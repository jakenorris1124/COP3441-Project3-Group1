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

const LEVEL_KEY = "Level 2"
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

export default class LevelTwo extends Phaser.Scene
{

    constructor()
    {
        super('levelTwo');
    }

    preload()
    {
        this.load.atlas(ANCHOR_KEY,"images/Anchor.png","images/Anchor.json");
        this.load.atlas(FAN_KEY,"images/Fan.png","images/Fan.json");
        this.load.image(LEVEL_KEY, 'images/leveloneplaceholder.png');
        this.load.atlas(BALL_KEY,"images/Ball.png","images/Ball.json");
        this.load.atlas(BUTTON_KEY, "images/Button.png","images/Button.json")
        this.load.atlas(LIGHT_BRIDGE_KEY, 'images/Light Bridge.png', 'images/Light Bridge.json')
        this.load.atlas(GRAVITY_INVERTER_KEY, 'images/Grav Inv.png', 'images/Grav Inv.json')
        this.load.atlas(SPRING_KEY, 'images/Spring.png','images/Spring.png')
        this.load.atlas(DIRECTIONAL_GATE_KEY, 'images/Dir Gate.png','images/Dir Gate.json')
        this.load.atlas(PULLEY_KEY, 'images/Lift.png', 'images/Lift.json')
        this.load.atlas(LIGHT_BALL_TRANSFORMER_KEY, 'images/Light Trans.png','images/Light Trans.json')
        this.load.atlas(HEAVY_BALL_TRANSFORMER_KEY, 'images/Heavy Trans.png','images/Heavy Trans.json')
    }

    create()
    {
        this.add.image(960, 540, LEVEL_KEY);

        this.platformGroup = this.physics.add.staticGroup()
        this.platformGroup.add(this.add.rectangle(200, 640, 400, 50, 0xff0000), true)
        this.platformGroup.add(this.add.rectangle(920, 640, 500, 50, 0xff0000), true)
        this.platformGroup.add(this.add.rectangle(1450, 640, 300, 50, 0xff0000), true)
        this.platformGroup.add(this.add.rectangle(730, 75, 50, 150, 0xff0000), true)

        this.initializeGroups()
        this.setDefaultCollisions()

        this.gravityInverters.place(1450, 800)
        this.placedMachines = [this.gravityInverters]

        this.ballX = 130
        this.ballY = 500
        this.levelBall = this.balls.createStandardBall(this.ballX, this.ballY)
        this.levelBall.body.enable = false;

        this.machines = [this.fans, this.fans, this.buttons, this.buttons, this.buttons, this.buttons, this.pullies, this.anchors]; //Placeholder "machine" list for level 1 to test UI functionality

        this.placedMachines = this.placedMachines.concat(this.machines)

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
        this.levelBall.setPosition(this.ballX, this.ballY)
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
        for (let i in this.placedMachines)
        {
            if (this.placedMachines[i].togglable && !alreadyToggled.has(this.machines[i]))
            {
                this.placedMachines[i].group.children.iterate((child) => {
                    if (child.state == ON)
                        this.placedMachines[i].toggle(this.levelBall, child)
                })

                alreadyToggled.add(this.placedMachines[i])
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
                this.HBTBoundaryGroup, this.LBTBoundaryGroup, this.pulleyGroup, this.platformGroup],
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

        for (let i in this.placedMachines)
        {
            if (this.placedMachines[i].togglable && !alreadyToggled.has(this.placedMachines[i]))
            {
                this.placedMachines[i].group.children.iterate((child) => {
                    this.placedMachines[i].toggle(ball, child)
                })

                alreadyToggled.add(this.placedMachines[i])
            }
        }
    }
}