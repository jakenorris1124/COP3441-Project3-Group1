import Phaser from "phaser"

export default class UI extends Phaser.Scene
{
    constructor()
    {
        super("uiScene");
    }

    preload()
    {
        this.add.text(500, 100, 'UI', {fill: '#ff0000'});
        console.log("Tested");
    }

    create()
    {

    }


}