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
    // this.scale.x = 1
    // this.scale.y = 1
    // this.randomSpriteGenerator()
  }

  randomSpriteGenerator () {
    let randomNumber = Math.floor(Math.random() * 3) + 1
    if (randomNumber > 2) {
      this.loadTexture('cactus01')
    } else if (randomNumber > 1) {
      this.loadTexture('cactus02')
    } else {
      this.loadTexture('cactus03')
    }
  }

  update () {
    this.x -= 3
    if (this.x < -100) {
      this.x = 700 + (Math.random() * 600)
    }
  }
}
