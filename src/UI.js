export default class UI
{
    /**
     * @param {Phaser.Scene} scene
     */
    constructor(scene)
    {
        this.scene = scene;
    }

    functionTest()
    {
        this.scene.add.text(500, 100, 'UI OVERLAY TEST', {fill: '#ff0000'});
    }


}