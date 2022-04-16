import Phaser from 'phaser'

import MainMenu from "./scenes/MainMenu"
import LevelOne from "./scenes/LevelOne"
import LevelTwo from "./scenes/LevelTwo"
import LevelThree from "./scenes/LevelThree"
import UI from "./scenes/UI"

const config = {
	type: Phaser.AUTO,
	width: 1920,
	height: 1080,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	scene: [MainMenu, LevelOne, LevelTwo, LevelThree, UI]
}

export default new Phaser.Game(config)
