import Phaser from 'phaser'

export default class MainMenu extends Phaser.Scene
{
	constructor()
	{
		super('mainMenu');
	}

	preload()
    {
        this.load.image('background', 'images/placeholdermainmenu.png');

    }

    create()
    {
        this.add.image(960, 540, 'background');

        const levelOneButton = this.add.text(100, 100, 'Level 1', {fill: '#ffffff'});
        levelOneButton.setInteractive();

        levelOneButton.on('pointerdown', () => {
            console.log("Click!");
            this.scene.start("levelOne");
        });
    }
}
