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
    this.load.image('cloud01', 'assets/images/cloud01.png')
    this.load.image('cloud02', 'assets/images/cloud02.png')
    this.load.image('cloud03', 'assets/images/cloud03.png')
    this.load.image('cactus01', 'assets/images/cactus01.png')
    this.load.image('cactus02', 'assets/images/cactus02.png')
    this.load.image('cactus03', 'assets/images/cactus03.png')
    this.load.image('obstracle', 'assets/images/obstacle.png')
    this.load.audio('jump_sfx', ('assets/sfx/jump.wav'))
  }

  create () {
    this.state.start('Game')
  }
}
