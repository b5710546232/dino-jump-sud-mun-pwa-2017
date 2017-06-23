import Phaser from 'phaser'

export default class Obstracle extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
    this.game.add.existing(this)
    this.setup()
  }

  setup(){
      this.game.physics.enable(this, Phaser.Physics.ARCADE)
  }
  
  jump(){

  }

  update () {
   
  }
}
