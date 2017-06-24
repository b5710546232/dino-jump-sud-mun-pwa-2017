import Phaser from 'phaser'

export default class Cloud extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
    this.game.add.existing(this)
    this.setup()
  }

  setup () {
    this.move = false
    this.game.physics.enable(this, Phaser.Physics.ARCADE)
    this.body.allowGravity = false
    this.scale.x = 1
    this.scale.y = 1
    this.smoothed = false
  }

  reposition () {
    if (this.x < -30) {
      let offset = (Math.random() * 300) + 800
      this.x = offset
    }
  }

  update () {
    if (this.move === true) {
      this.x -= 2
    }
    this.reposition()
  }
}
