import Phaser from 'phaser'

import MainMenu from './scenes/MainMenu'
import LevelOne from './scenes/LevelOne'

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
	scene: [MainMenu, LevelOne]
}

export default new Phaser.Game(config)
