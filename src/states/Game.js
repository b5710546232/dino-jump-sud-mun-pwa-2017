/* globals __DEV__ */
import Phaser from 'phaser'

import Dino from '../prefabs/dino'
import Obstracle from '../prefabs/obstracle'
import Config from '../config'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    const bannerText = 'Phaser + ES6 + Webpack'
    let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText)
    banner.font = 'Bangers'
    banner.padding.set(10, 16)
    banner.fontSize = 40
    banner.fill = '#77BFA3'
    banner.smoothed = false
    banner.anchor.setTo(0.5)
    this.game.physics.arcade.gravity.y = 250
    // this.mushroom = new Mushroom({
    //   game: this,
    //   x: this.world.centerX,
    //   y: this.world.centerY,
    //   asset: 'mushroom'
    // })

    // this.game.add.existing(this.mushroom)
    if (!this.game.device.desktop) {
      this.game.scale.startFullScreen(false)
    }
    // this.fontsReady = false
    // this.fontsLoaded = this.fontsLoaded.bind(this)
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    this.scale.pageAlignHorizontally = true
    this.game.scale.setScreenSize = true
    this.game.scale.refresh()
    // this.scale.refresh();

    this.dino = new Dino({
      game: this,
      x: 40,
      y: 40,
      asset: 'dino'
    })
    this.obstracle = new Obstracle({
      game: this,
      x: 300,
      y: 300,
      asset: 'obstracle'
    })
  }

  update () {
    this.game.physics.arcade.collide(this.dino, this.obstracle, this.collistionHandler, null, this)
  }

  collistionHandler () {
    this.obstracle.destroy()
  }

  render () {
    this.game.debug.body(this.obstracle)
  }
}
