export default class UI
{
    /**
     * @param {Phaser.Scene} scene The scene in which the UI should be drawn on
     * @param {string} level A string containing the name of the level
     */
    constructor(scene, level)
    {
        this.scene = scene;
        this.level = level;
        this.drawUI();
    }

    drawUI()
    {
        var sidebar = this.scene.add.rectangle(1800, 540, 400, 1080, 0x666666); //Draws the sidebar for the UI
        this.scene.add.text(1610, 10, this.level, {fill: '#ffffff'}); //Used to help identify the current level
    }

}