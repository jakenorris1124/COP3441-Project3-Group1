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
     */
    constructor(scene, level, machines)
    {
        this.scene = scene;
        this.level = level;
        this.machines = machines;

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


        //For loop that prints the names of all the objects available (later will show the objects themselves)
        var machineButtons = [];
        for (let i in this.machines)
        {
            machineButtons.push(this.scene.add.text(1610, 30+ (i * 20), this.machines[i], {fill: '#ffffff'}));
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

        //Temporary button to test the win screen
        const clickToWin = this.scene.add.text(1610, 1010, 'Click here to win', {fill: '#ffffff'});
        clickToWin.setInteractive();
        clickToWin.on('pointerdown', () => this.win());
    }

    win()
    {
        var winBox = this.scene.add.rectangle(840, 540, 250, 200, 0x666666);

        this.scene.add.text(800, 450, "You Win!", {fill: '#ffffff'});
    }

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
                    this.scene.add.text(pointer.x, pointer.y, this.machines[index], {fill: '#ffffff'})
                    this.machineStatus[index] = false;
                }
            }), 10
        });


    }

    inBounds(x, y)
    {
        if(x >= MIN_X && x<= MAX_X && y >= MIN_Y && y<= MAX_Y)
            return true;
        return false;
    }


}