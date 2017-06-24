'use strict'
import Phaser from 'phaser'
const JUMP_VALUE = -400
export default class Dino extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
    this.game.add.existing(this)
    this.setup()
  }

  setup () {
    this.isDead = false
    this.jumpTimer = 0
    this.game.physics.enable(this, Phaser.Physics.ARCADE)
    this.body.collideWorldBounds = true
    this.animations.add('jump', [0], 10, true)
    this.animations.add('idle', [0], 10, true)
    this.animations.add('run', [1, 2], 10, true)
    this.animations.add('dead', [3], 10, true)
    this.animations.play('idle')
    this.jumpSound = this.game.add.audio('jump_sfx')

    let width = 32
    let height = 58
    let offSetY = 0
    let offSetX = 8
    this.body.setSize(width, height, offSetX, offSetY)
    // this.character.animations.add('idle', [0], 10, true)
  }

  jump () {
    if (this.isDead === true) {
      this.play('dead')
    } else if (this.game.input.activePointer.isDown && this.onFloor() && this.game.time.now > this.jumpTimer) {
      this.play('jump')
      this.jumpSound.play()
      this.body.velocity.y = JUMP_VALUE
      this.jumpTimer = this.game.time.now + 750
    } else if (this.onFloor()) {
      this.play('run')
    } else {
      this.play('idle')
    }
  }

  onFloor () {
    return this.body.velocity.y === 0
  }

  update () {
    this.jump()
  }
}
