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
        this.drawUI();
    }

    drawUI()
    {
        var sidebar = this.scene.add.rectangle(1800, 540, 400, 1080, 0x666666); //Draws the sidebar for the UI
        this.scene.add.text(1610, 10, this.level, {fill: '#ffffff'}); //Used to help identify the current level

        //For loop that prints the names of all the objects available (later will show the objects themselves)
        for (let i in this.machines)
        {
            this.scene.add.text(1610, 30+ (i * 20), this.machines[i], {fill: '#ffffff'});
        }
    }

}