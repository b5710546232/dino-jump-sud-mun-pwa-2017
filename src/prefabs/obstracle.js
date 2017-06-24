import Phaser from 'phaser'

export default class Obstracle extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
    this.game.add.existing(this)
    this.setup()
  }

  setup () {
    this.game.physics.enable(this, Phaser.Physics.ARCADE)
    this.body.allowGravity = false
    this.anchor.y = 1
    this.smoothed = false
    this.dead = false
  }

  getX () {
    return this.position
  }

  setX (xValue) {
    this.x = xValue
  }

  update () {
    this.x -= 3
    if (this.x < -100) {
      this.dead = true
    }
  }
}
