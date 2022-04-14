import Phaser from 'phaser'

import MainMenu from './scenes/MainMenu'

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
	scene: [MainMenu]
}

export default new Phaser.Game(config)
