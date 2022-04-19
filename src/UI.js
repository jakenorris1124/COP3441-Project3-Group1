const MIN_X = 0
const MAX_X = 1600
const MIN_Y = 0
const MAX_Y = 1080

export default class UI
{
    /**
     * @param {Phaser.Scene} scene The scene in which the UI should be drawn on
     * @param {string} level A string containing the name of the level
     * @param {Array} machines An array of the machines that are available in the level
     * @param {Ball} ball The ball of the scene
     */
    constructor(scene, level, machines, ball)
    {
        this.scene = scene;
        this.level = level;
        this.machines = machines;
        this.ball = ball;

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
            machineButtons[i].on('pointerdown', () => this.place(i, machineButtons[i]));
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
        setTimeout(() => {
            this.start.on('pointerdown', () => this.scene.play(this.start));
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
                }
            }), 10
        });
    }

    rotate(placed, degree)
    {
        placed.once('pointerdown', (pointer) => {
            if(this.scene.input.activePointer.middleButtonDown())
            {
                placed.setAngle( (90 * degree) % 360);
                degree++;
            }
            this.rotate(placed, degree)
        }), 10
    }

    inBounds(x, y)
    {
        if(x >= MIN_X && x<= MAX_X && y >= MIN_Y && y<= MAX_Y)
            return true;
        return false;
    }
}