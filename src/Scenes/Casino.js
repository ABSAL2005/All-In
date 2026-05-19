class Casino extends Phaser.Scene {
    constructor() {
        super("casinoScene");
    }

    init(data) {
        this.diamonds = data.diamonds || 0;
        this.spaceKey = null; 
        this.rKey = null;
    }

    create() {

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.canSpin = true;

        this.symbols = [
            "7",
            "$",
            "3",
            "&"
        ];

        this.currentSymbol = "?";

        this.diamondText = this.add.text(20, 20,
            `Diamonds: ${this.diamonds}`,
            {
                fontSize: '24px',
                color: '#ffffff'
            }
        );

        this.resultText = this.add.text(centerX, centerY - 40,
            "?",
            {
                fontSize: '64px',
                color: '#ffff00'
            }
        ).setOrigin(0.5, 0.5);

        this.infoText = this.add.text(centerX, centerY + 40,
            "Press SPACE to spin",
            {
                fontSize: '20px',
                color: '#ffffff'
            }
        ).setOrigin(0.5, 0.5);

        this.gamblingSound = this.sound.add("gambling", { volume: 0.5 });

        this.spaceKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );

        this.rKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.R
        );

        if (this.diamonds <= 0) {

            this.canSpin = false;

            this.infoText.setText(
                "NO DIAMONDS (YOU LOSE)- PRESS R TO RESTART"
            );

            this.rKey.once("down", () => {

                this.scene.start("platformerScene");
            });
        }
    }

    update() {

        if (
            Phaser.Input.Keyboard.JustDown(this.spaceKey)
            && this.canSpin
            && this.diamonds > 0
        ) {

            this.spinWheel();
        }
    }

    spinWheel() {

        this.canSpin = false;

        this.diamonds -= 1;

        this.diamondText.setText(
            `Diamonds: ${this.diamonds}`
        );

        // fake spinning animation
        let spinEvent = this.time.addEvent({
            delay: 40,
            repeat: 30,

            callback: () => {

                let randomSymbol =
                    Phaser.Utils.Array.GetRandom(this.symbols);

                this.resultText.setText(randomSymbol);
            }
        });

        this.gamblingSound.play();

        // final result
        this.time.delayedCall(1400, () => {

            let jackpot =
                Phaser.Math.Between(1, 3) === 1;

            if (jackpot) {

                this.canSpin = false;

                this.resultText.setText("777");

                this.infoText.setText(
                    "JACKPOT! YOU WIN! - PRESS R TO REPLAY"
                );

                this.rKey.once("down", () => {

                    this.scene.start("platformerScene");
                });

            } else {

                this.resultText.setText("BUST");

                if (this.diamonds === 0) {

                    this.infoText.setText(
                        "GAME OVER - PRESS R TO RESTART"
                    );

                    this.rKey.once("down", () => {

                        this.scene.start("platformerScene");
                    });

                } else {

                    this.infoText.setText(
                        "Try again!"
                    );

                    this.canSpin = true;
                }
            }
        });
    }
}