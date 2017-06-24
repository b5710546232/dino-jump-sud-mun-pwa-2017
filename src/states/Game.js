/**
 * globals __DEV__ // eslint-disable-line no-use-before-define
 */
import Phaser from 'phaser'

import Dino from '../prefabs/dino'
import Obstracle from '../prefabs/obstracle'
import Cloud from '../prefabs/cloud'
import Ground from '../prefabs/ground'
import Config from '../config'// eslint-disable-line


export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    // bg set up.
    this.bg = this.game.add.image(0, 0, 'bg')
    this.ground = new Ground({
      game: this.game,
      x: this.game.width / 2,
      y: this.game.height - this.game.cache.getImage('ground').height / 2,
      asset: 'ground'
    })

    this.game.physics.arcade.gravity.y = 1000
    // this.fontsReady = false
    // this.fontsLoaded = this.fontsLoaded.bind(this)

    this.dino = new Dino({
      game: this.game,
      x: 40,
      y: this.game.height / 2 - this.game.cache.getImage('ground').height,
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
    this.game.physics.arcade.collide(this.dino, this.ground, this.groundCollisionHandler, null, this)
    this.game.physics.arcade.collide(this.dino, this.obstracles, this.collistionHandler, null, this)
    this.updateScore()
  }
  groundCollisionHandler (dino, ground) {
    dino.isOnGround = true
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
    this.game.debug.body(this.dino)
    this.game.debug.body(this.ground)
  }
}
