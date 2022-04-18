import Phaser from 'phaser'

import MainMenu from "./scenes/MainMenu"
import LevelOne from "./scenes/LevelOne"
import LevelTwo from "./scenes/LevelTwo"
import LevelThree from "./scenes/LevelThree"

const config = {
	type: Phaser.AUTO,
	width: 1920,
	height: 1080,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	scene: [MainMenu, LevelOne, LevelTwo, LevelThree]
}

export default new Phaser.Game(config)
