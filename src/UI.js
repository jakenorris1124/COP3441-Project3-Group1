import Fans from './puzzleObjects/Fans.js'

const MIN_X = 0
const MAX_X = 1600
const MIN_Y = 0
const MAX_Y = 1080

export default class UI
{
    /**
     * @param {Phaser.Scene} scene The scene in which the UI should be drawn on
     * @param {string} level A string containing the name of the level
     * @param {Object[]} machines An array of the machines that are available in the level
     * @param {Phaser.GameObjects.GameObject} ball The ball of the scene
     */
    constructor(scene, level, machines, ball)
    {
        this.scene = scene;
        this.level = level;
        this.machines = machines;
        this.ball = ball;
        this.isRunning = false;

        this.machineStatus = [];
        for (let i in this.machines)
        {
            this.machineStatus.push(true);
        }

        this.drawUI();
    }

    drawUI()
    {
        var sidebar = this.scene.add.rectangle(1800, 540, 400, 1080, 0x666666); //Draws the sidebar for the UI
        this.scene.add.text(1610, 10, this.level, {fill: '#ffffff'}); //Used to help identify the current level

        this.start = this.scene.add.text(1750, 10, "Start", {fill: '#ffffff'});
        this.start.setInteractive();
        this.stop()


        //For loop that prints the names of all the objects available (later will show the objects themselves)
        var machineButtons = [];
        for (let i in this.machines)
        {
            machineButtons.push(this.scene.add.text(1610, 30+ (i * 20), this.machines[i].key, {fill: '#ffffff'}));
            machineButtons[i].setInteractive();
            machineButtons[i].on('pointerdown', () => {
                if (!this.isRunning)
                    this.place(i, machineButtons[i])
            });
        }

        //Button to return to main menu
        const returnToMain = this.scene.add.text(1610, 1050, 'Back to Main Menu', {fill: '#ffffff'});
        returnToMain.setInteractive();
        returnToMain.on('pointerdown', () => {
            this.scene.scene.stop(this.level);
            this.scene.scene.start("mainMenu");
        });
    }

    stop()
    {
        this.isRunning = false;
        setTimeout(() => {
            this.start.once('pointerdown', () => {
                this.isRunning = true;
                this.scene.play(this.start)
            });
        }), 10;
    }

    win()
    {
        this.scene.add.rectangle(840, 540, 250, 200, 0x666666);
        this.scene.add.text(800, 450, "You Win!", {fill: '#ffffff'});

        let accept = this.scene.add.rectangle(840, 580, 100, 30, 0xa8a8a8)
        this.scene.add.text(815, 573, "Accept", {fill: '#ffffff'})
        accept.setInteractive()
        accept.on('pointerdown', () => {
            this.scene.scene.stop(this.level);
            this.scene.scene.start("mainMenu");
        });
    }

    /**
     *
     * @param {int} index
     * @param {Phaser.GameObjects.Text} button
     */
    place(index, button)
    {
        if (!this.machineStatus[index])
            return;
        button.setColor("#31ff00");

        setTimeout(() => {
            this.scene.input.once('pointerdown', (pointer) => {
                if(this.inBounds(pointer.x, pointer.y))
                {
                    button.setColor("#ff0000");
                    let placed = this.machines[index].place(pointer.x, pointer.y)
                    placed.body.immovable = true;
                    placed.body.gravity = true;
                    this.machineStatus[index] = false;
                    placed.setInteractive();

                    this.rotate(placed, 1)
                    this.scene.input.on('pointerdown', this.pick,this)
                }
            }), 10
        });
    }

    /**
     * @param {Phaser.GameObjects.Sprite} placed
     * @param {number} degree
     */
    rotate(placed, degree)
    {
        placed.once('pointerdown', (pointer) => {
            if(this.scene.input.activePointer.rightButtonDown())
            {
                placed.setAngle( (90 * degree) % 360);
                degree++;

                let newHeight = placed.body.width
                let newWidth = placed.body.height
                placed.body.setSize(newWidth, newHeight)

                if (placed.name == 'fan')
                    Fans.rotateWind(placed)
            }
            this.rotate(placed, degree)
        })

    }

    //drag and drop
    pick(pointer, targets)
    {
        if(this.scene.input.activePointer.leftButtonDown() && !this.isRunning)
        {
            this.scene.input.off('pointerdown',this.pick,this);
            this.dragObj = targets[0];
            this.scene.input.on('pointermove',this.drag,this)
            this.scene.input.on('pointerup', this.put,this)
        }
    }
    drag(pointer)
    {
        if(this.inBounds(pointer.x, pointer.y))
        {
            this.dragObj.x = pointer.x
            this.dragObj.y = pointer.y
            this.dragObj.body.x = pointer.x - this.dragObj.body.width / 2
            this.dragObj.body.y = pointer.y - this.dragObj.body.height / 2

            if (this.dragObj.name == 'fan')
                Fans.dragWind(this.dragObj)
        }
    }
    put(){
        this.scene.input.on('pointerdown',this.pick,this);
        this.scene.input.off('pointermove',this.drag,this)
        this.scene.input.off('pointerup', this.put,this)
    }

    inBounds(x, y)
    {
        if(x >= MIN_X && x<= MAX_X && y >= MIN_Y && y<= MAX_Y)
            return true;
        return false;
    }
}