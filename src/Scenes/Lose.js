class Lose extends Phaser.Scene {
    constructor() {
        super("loseScene");
        this.spaceKey = null;
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;


        let text = this.add.text(centerX, centerY, "YOU LOSE", { fontSize: "32px" }).setOrigin(0.5, 0.5);

        let retry = this.add.text(centerX, centerY + 50, "RESTART", {
            fontSize: "20px",
            backgroundColor: "#444"
        }).setInteractive().setOrigin(0.5, 0.5);

        retry.on("pointerdown", () => {
            this.scene.start("platformerScene");
        });
    }
}