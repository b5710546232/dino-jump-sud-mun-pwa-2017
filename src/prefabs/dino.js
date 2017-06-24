import Phaser from 'phaser'

export default class Dino extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
    this.game.add.existing(this)
    this.setup()
  }

  setup () {
    this.jumpTimer = 0
    this.game.physics.enable(this, Phaser.Physics.ARCADE)
    this.body.collideWorldBounds = true
  }

  jump () {
    if (this.game.input.activePointer.isDown && this.body.onFloor() && this.game.time.now > this.jumpTimer) {
      this.body.velocity.y = -200
      this.jumpTimer = this.game.time.now + 750
    }
  }

  update () {
    this.jump()
  }

}
