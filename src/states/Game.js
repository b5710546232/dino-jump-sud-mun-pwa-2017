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
  pad (num, size) {
    var s = num + ''
    while (s.length < size) s = '0' + s
    return s
  }
  create () {
    // bg set up.
    this.bg = this.game.add.image(0, 0, 'bg')
    this.ground = new Ground({
      game: this.game,
      x: this.game.width / 2,
      y: this.game.height - this.game.cache.getImage('ground').height / 2,
      asset: 'ground'
    })
    this.ground2 = new Ground({
      game: this.game,
      x: this.game.width / 2 + this.game.cache.getImage('ground').width,
      y: this.game.height - this.game.cache.getImage('ground').height / 2,
      asset: 'ground'
    })

    this.game.physics.arcade.gravity.y = 1000
    // this.fontsReady = false
    // this.fontsLoaded = this.fontsLoaded.bind(this)

    this.dino = new Dino({
      game: this.game,
      x: 40,
      y: 216,
      asset: 'dino'
    })
    this.score = 0
    this.scoreStr = `${this.pad(this.score, 5)}`
    this.scoreText = this.game.add.text(500, 10, this.scoreStr)
    this.scoreText.fill = '#FFFFFF'
    this.scoreText.align = 'center'
    this.scoreText.font = '10px Barrio'
    this.scoreText.stroke = '#000000'
    this.scoreText.strokeThickness = 2
    // this.scoreText.anchor.setTo(0.5)
    this.scoreText.fixedToCamera = true
    this.obstracles = []
    this.clouds = []
    this.initializeObstracle()
    this.initializeClouds()
    this.respawnButton = this.add.button(this.game.width / 2 - 50, this.game.height / 2 + 60, 'respawn_button', () => { })
    this.respawnButton.onInputDown.add(() => {
      this.score = 0
      this.firstLanuch = true
      this.game.paused = false
      this.state.start('Game')
    })
    this.closeDeadScene()
    this.game.paused = true
    this.timeStart = this.getTimenow()
    this.firstLanuch = true

    this.game.input.onDown.add(() => {
      if (!this.dino.isDead && this.firstLanuch) {
        for (let i in this.clouds) {
          this.clouds[i].move = true
        }
        this.game.paused = false
        this.dino.onJump()
        this.firstLanuch = false
      }
    }, this)
  }

  initializeClouds () {
    let cloudType = [ 'cloud01', 'cloud02', 'cloud03' ]
    for (let i = 0; i < 3; i++) {
      let random = Math.floor(Math.random() * cloudType.length)
      let newCloud = new Cloud({
        game: this,
        x: 500 + (i * 300),
        y: 50 + (Math.random() * 50),
        asset: cloudType[random]
      })
      this.clouds.push(newCloud)
    }
  }

  initializeObstracle () {
    let obsracles = [ 'cactus01', 'cactus02', 'cactus03' ]
    for (let i = 0; i < 6; i++) {
      let random = Math.floor(Math.random() * obsracles.length)
      console.log('random', random)
      let newObstracle = new Obstracle({
        game: this,
        x: 500 + (i * 300 * Math.random()) + (i * 300),
        y: 250,
        asset: obsracles[random]
      })
      this.obstracles.push(newObstracle)
    }
  }

  update () {
    this.game.physics.arcade.collide(this.dino, this.ground, this.groundCollisionHandler, null, this)
    this.game.physics.arcade.collide(this.dino, this.ground2, this.groundCollisionHandler, null, this)
    this.game.physics.arcade.overlap(this.dino, this.obstracles, this.collistionHandler, null, this)
    this.updateScore()
    if (this.game.input.activePointer.isDown) {
      this.game.paused = false
    }
  }
  groundCollisionHandler (dino, ground) {
    dino.isOnGround = true
  }
  getTimenow () {
    return Math.floor(parseInt(this.game.time.now)) / 1000
  }
  updateScore () {
    this.score = parseInt(this.getTimenow() - this.timeStart)
    this.scoreText.setText(this.pad(this.score, 5))
  }
  collistionHandler () {
    this.highscore = `Hi : ` + this.pad(this.score, 5)
    this.highscoreTxt = this.game.add.text(this.game.width / 2 - 90, 10, this.highscore)
    this.highscoreTxt.fill = '#FFFFFF'
    this.highscoreTxt.align = 'center'
    this.highscoreTxt.font = '10px Barrio'
    this.highscoreTxt.stroke = '#000000'
    this.highscoreTxt.strokeThickness = 2
    this.highscoreTxt.anchor.x = -1
    this.showDeadScene()
    this.dino.isDead = true
    this.game.paused = true

    if (!this.game.disconnect) {
      let rootRef = this.game.firebase.ref()
      let urlRef = rootRef.child('scores/').limitToLast(3)
      urlRef.once('value', (snapshot) => {
        if (snapshot.val()) {
          snapshot.forEach((child) => {
            console.log(child.key, child.val())
          })
        }
      })

      this.game.firebase.ref(`scores/${this.score}`).set(parseInt(this.score))
    }
  }
  showDeadScene () {
    this.respawnButton.visible = true
  }
  closeDeadScene () {
    this.respawnButton.visible = false
  }
  render () {
    if(__DEV__){ // eslint-disable-line
      for (let i in this.obstracles) {
        this.game.debug.body(this.obstracles[i])
      }
      this.game.debug.body(this.dino)
      this.game.debug.body(this.ground)
      this.game.debug.body(this.ground2)
    }
  }
}
