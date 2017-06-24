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
    // this.body.collideWorldBounds = true
    // this.body.setCircle(16)
    // this.body.setSize(30, 40)
    this.body.allowGravity = false
    this.scale.x = 1
    this.scale.y = 1
    this.randomSpriteGenerator()
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
      this.randomSpriteGenerator()
      // console.log(this.game.height)
    }
    // console.log(this.x)
    // this.game.physics.arcade.moveToXY(this, 0, this.game.width, 50)
  }
}
