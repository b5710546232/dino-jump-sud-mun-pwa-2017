import Phaser from 'phaser'

export default class Ground extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
    this.game.add.existing(this)
    this.setup()
    this.asset = asset
  }

  setup () {
    this.game.physics.enable(this, Phaser.Physics.ARCADE)
    let width = 600
    let height = 66
    let offSetY = 12
    let offSetX = 0
    this.body.setSize(width, height, offSetX, offSetY)
    this.body.immovable = true
    this.body.allowGravity = false
    this.scale.x = 1
    this.scale.y = 1
    this.smoothed = false
    this.groundSpeed = 5
  }

  setGroundSpeed (newSpeed) {
    this.groundSpeed = newSpeed
  }

  update () {
    this.x -= this.groundSpeed
    if (this.x < -300) {
      this.x = 900 - this.groundSpeed
    }
  }
}
