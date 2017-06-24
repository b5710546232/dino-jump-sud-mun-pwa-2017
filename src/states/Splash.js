import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])
    this.load.spritesheet('dino', 'assets/sprites/dino_52x58.png', 52, 58)
    this.load.setPreloadSprite(this.loaderBar)

    // load your assets
    this.load.image('mushroom', 'assets/images/mushroom2.png')
    this.load.image('obstracle', 'assets/images/obstacle.png')
    this.load.audio('jump_sfx', ('assets/sfx/jump.wav'))
  }

  create () {
    this.state.start('Game')
  }
}
