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
            this.scene.start("levelOne");
        });

        const levelTwoButton = this.add.text(100, 200, 'Level 2', {fill: '#ffffff'});
        levelTwoButton.setInteractive();
        levelTwoButton.on('pointerdown', () => {
            this.scene.start("levelTwo");
        });

        const levelThreeButton = this.add.text(100, 300, 'Level 3', {fill: '#ffffff'});
        levelThreeButton.setInteractive();
        levelThreeButton.on('pointerdown', () => {
            this.scene.start("levelThree");
        });
    }
}
