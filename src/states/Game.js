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
    this.respawnButton = this.add.button(this.game.width / 2 - 50, this.game.height / 2 - 90, 'respawn_button', () => { })
    this.respawnButton.onInputDown.add(() => {
      this.score = 0
      this.game.paused = false
      this.state.start('Game')
    })
    this.closeDeadScene()
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
    this.highscore = `High Score : ` + this.score
    this.highscoreTxt = this.game.add.text(this.game.width / 2 - 90, this.game.height / 2 - 130, this.highscore)
    this.highscoreTxt.fill = '#FFFFFF'
    this.highscoreTxt.align = 'center'
    this.highscoreTxt.font = '10px Barrio'
    this.highscoreTxt.stroke = '#000000'
    this.highscoreTxt.strokeThickness = 2
    this.showDeadScene()
    this.dino.isDead = true
    this.game.paused = true
  }
  showDeadScene () {
    this.respawnButton.visible = true
  }
  closeDeadScene () {
    this.respawnButton.visible = false
  }
  render () {
    for (let i in this.obstracles) {
      this.game.debug.body(this.obstracles[i])
    }
  }
}
