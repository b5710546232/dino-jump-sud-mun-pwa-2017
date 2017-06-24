import Phaser from 'phaser'

export default class Cloud extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
    this.game.add.existing(this)
    this.setup()
  }

  setup () {
    this.game.physics.enable(this, Phaser.Physics.ARCADE)
  }

  reposition () {
    if (this.x < -15) {
      let offset = Math.random() * 30
      this.x = this.game.width + offset
    }
  }

  update () {
    this.x -= 1
    this.reposition()
  }
}
