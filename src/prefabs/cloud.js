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
    this.body.allowGravity = false
    this.scale.x = 1
    this.scale.y = 1
    this.randomSpriteGenerator()
    this.smoothed = false
  }

  reposition () {
    if (this.x < -30) {
      let offset = (Math.random() * 300) + 800
      this.x = offset
      this.randomSpriteGenerator()
    }
  }

  randomSpriteGenerator () {
    let randomNumber = Math.floor(Math.random() * 3) + 1
    if (randomNumber > 2) {
      this.loadTexture('cloud03')
    } else if (randomNumber > 1) {
      this.loadTexture('cloud02')
    } else {
      this.loadTexture('cloud01')
    }
  }

  update () {
    if (!this.game.isStart) {
      return
    }
    this.x -= 2
    this.reposition()
  }
}
