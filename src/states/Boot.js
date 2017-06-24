import Phaser from 'phaser'
import * as firebase from 'firebase'
import config from '../config'
   // Initialize Firebase

const firebaseDB = firebase.initializeApp(config.firebaseConfig)
export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#57546f'

    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    this.scale.pageAlignHorizontally = true
    this.scale.pageAlignVertically = true
    this.game.scale.setScreenSize = true
    this.game.scale.refresh()
    // this.scale.refresh();

    this.game.firebase = firebaseDB.database(); //  eslint-disable-line

    firebaseDB.auth().onAuthStateChanged((user) => {
      if (user) {
          // User is signed in.
        let isAnonymous = user.isAnonymous
        let uid = user.uid
        console.log('user-id', uid, isAnonymous)

        this.game.current_user = firebaseDB.auth().currentUser
        console.log('current-user', this.game.current_user)
      } else {
        firebaseDB.auth().signInAnonymously().catch(function (error) {
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
    // firebaseDB.database().onDisconnect().set('I disconnected!')
    // if (firebaseDB.database().onDisconnect()) {
    //   // this.game.firebase = firebaseDB.database()
    //   this.game.disconnect = true
    //   console.log('disconnect')
    // }
    // firebase.auth().onAuthStateChanged((user) => {  //  eslint-disable-line
    //   if (user) {
    //             // User is signed in.
    //     // let isAnonymous = user.isAnonymous;
    //     // let uid = user.uid;
    //     // console.log('user-id', uid)
    //     // this.uid = uid;
    //     // this.game.current_user = firebase.auth().currentUser;
    //         // console.log('current-user', this.game.current_user)
    //   } else {
    //     firebase.auth().signInAnonymously().catch(function (error) { //eslint-disable-line
    //       var errorCode = error.code
    //       // var errorMessage = error.message
    //       if (errorCode === 'auth/operation-not-allowed') {
    //         alert('You must enable Anonymous auth in the Firebase Console.');
    //       } else {
    //         console.error(error)
    //       }
    //     })
    //   }
    // })
  }

  preload () {
    // WebFont.load({
    //   google: {
    //     families: ['Bangers']
    //   },
    //   active: this.fontsLoaded
    // })

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
    // if (this.fontsReady) {
    this.state.start('Splash')
    // }
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}
