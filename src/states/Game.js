/**
 * globals __DEV__ // eslint-disable-line no-use-before-define
 */
import Phaser from 'phaser'

import Dino from '../prefabs/dino'
import Obstracle from '../prefabs/obstracle'
import Cloud from '../prefabs/cloud'
import Config from '../config'// eslint-disable-line

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    const bannerText = 'Phaser + ES6 + Webpack'
    let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText)
    banner.font = 'Bangers'
    banner.padding.set(10, 16)
    banner.fontSize = 40
    banner.fill = '#77BFA3'
    banner.smoothed = false
    banner.anchor.setTo(0.5)
    this.game.physics.arcade.gravity.y = 300
    // this.mushroom = new Mushroom({
    //   game: this,
    //   x: this.world.centerX,
    //   y: this.world.centerY,
    //   asset: 'mushroom'
    // })

    // this.game.add.existing(this.mushroom)
    if (!this.game.device.desktop) {
      this.game.scale.startFullScreen(false)
    }
    // this.fontsReady = false
    // this.fontsLoaded = this.fontsLoaded.bind(this)
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    this.scale.pageAlignHorizontally = true
    this.game.scale.setScreenSize = true
    this.game.scale.refresh()
    // this.scale.refresh();

    this.dino = new Dino({
      game: this.game,
      x: 40,
      y: 300,
      asset: 'dino'
    })
    this.score = 0
    this.scoreStr = `Score : ${this.score}`
    this.scoreText = this.game.add.text(10, 10, this.scoreStr)
    this.scoreText.fill = '#FFFFFF'
    this.scoreText.align = 'center'
    this.scoreText.font = '10px Barrio'
    this.scoreText.stroke = '#000000'
    this.scoreText.strokeThickness = 2
    // this.scoreText.anchor.setTo(0.5)
    this.scoreText.fixedToCamera = true
    this.obstracles = []
    this.initializeObstracle()
    this.clouds = []
    this.initializeClouds()
  }

  initializeClouds () {
    for (let i = 0; i < 3; i++) {
      let newCloud = new Cloud({
        game: this,
        x: 500 + (i * 300),
        y: 50 + (Math.random() * 50),
        asset: 'cloud01'
      })
      this.clouds.push(newCloud)
    }
  }

  initializeObstracle () {
    for (let i = 0; i < 6; i++) {
      let newObstracle = new Obstracle({
        game: this,
        x: 500 + (i * 300 * Math.random()) + (i * 300),
        y: 270,
        asset: 'cactus01'
      })
      this.obstracles.push(newObstracle)
    }
  }

  update () {
    this.game.physics.arcade.collide(this.dino, this.obstracles, this.collistionHandler, null, this)
    this.updateScore()
  }
  updateScore () {
    this.score = parseInt(this.game.time.totalElapsedSeconds())
    this.scoreText.setText('Score : ' + this.score)
  }
  collistionHandler () {
    this.dino.isDead = true
  }

  render () {
    for (let i in this.obstracles) {
      this.game.debug.body(this.obstracles[i])
    }
  }
}
