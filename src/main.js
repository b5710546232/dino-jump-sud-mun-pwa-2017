import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import GameState from './states/Game'

import config from './config'

class Game extends Phaser.Game {
  constructor () {
    const width = config.gameWidth
    const height = config.gameHeight
    super(width, height, Phaser.CANVAS, 'content', null)
    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('Game', GameState, false)
    this.state.start('Boot')
    this.addServiceWorker()
  }

  addServiceWorker () {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('./config/service-worker.js')
        .then(() => {
          console.log('Service Worker Registered')
        })
    }
  }
}

window.game = new Game()
