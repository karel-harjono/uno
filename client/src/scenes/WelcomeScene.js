export default class WelcomeScene extends Phaser.Scene {
  constructor() {
    super({ key: "WelcomeScene" });
  }

  preload() {
    this.load.html("nameform", "assets/nameform.html");
  }

  create() {
    const element = this.add.dom(400, 300).createFromCache("nameform");
    element.setPerspective(800);

    element.addListener("click");

    element.on("click", (event) => {
      if (event.target.name === "loginButton") {
        this.inputUsername = element.getChildByName("username").value;
        this.roomName = element.getChildByName("roomName").value;

        //  Have they entered anything?
        if (this.inputUsername !== "" && this.roomName !== "") {
          //  Turn off the click events
          element.removeListener("click");

          //  Tween the login form out
          this.tweens.add({
            targets: element,
            x: 1,
            alpha: 0,
            duration: 500,
            ease: "Power3",
          });

          //  Populate the text with whatever they typed in as the username!
          console.log(
            `Welcome ${this.inputUsername} enterring ${this.roomName}`
          );

          this.scene.switch("Game", {
            username: this.inputUsername,
            roomName: this.roomName,
          });
        } else {
          //  Flash the prompt
          this.tweens.add({
            targets: element,
            alpha: 0.1,
            duration: 5,
            ease: "Power3",
            yoyo: true,
          });
        }
      }
    });
  }
}
