import Phaser from 'phaser'
import { firebaseAuth, db } from '../config/firebase'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#57546f'

    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    this.scale.pageAlignHorizontally = true
    this.scale.pageAlignVertically = true
    this.game.scale.setScreenSize = true
    this.game.scale.refresh()

    this.game.firebase = db

    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        let isAnonymous = user.isAnonymous
        let uid = user.uid
        console.log('user-id', uid, isAnonymous)

        this.game.current_user = firebaseAuth().currentUser
        console.log('current-user', this.game.current_user)
      } else {
        firebaseAuth().signInAnonymously().catch(function (error) {
          var errorCode = error.code
          var errorMessage = error.message
          console.log(errorMessage)
          if (errorCode === 'auth/operation-not-allowed') {
            alert('You must enable Anonymous auth in the Firebase Console.')
          } else {
            console.error(error)
          }
        })
      }
    })
  }

  preload () {
    let text = this.add.text(this.world.centerX, this.world.centerY, 'loading...', {
      font: '16px Arial',
      fill: '#dddddd',
      align: 'center'
    })
    text.anchor.setTo(0.5, 0.5)

    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')
  }

  render () {
    this.state.start('Splash')
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}
