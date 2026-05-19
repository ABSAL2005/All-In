class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/");

        // Load characters spritesheet
        this.load.image("player_right", "Player/right_player.png");
        this.load.image("right_walk2", "Player/right_walk2.png");
        this.load.image("jump_player", "Player/jump_player.png");
        this.load.image("crouch_player", "Player/crouch_player.png");
        

        // Load tilemap information
        this.load.image("tilemap_packed", "kenney_1-bit-platformer-pack/Tilemap/monochrome_tilemap_packed.png");   // Packed tilemap
        this.load.tilemapTiledJSON("Level1", "Jackpot.json");   // Tilemap in JSON

        this.load.spritesheet("tilemap_sheet", "kenney_1-bit-platformer-pack/Tilemap/monochrome_tilemap_packed.png", {
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.multiatlas("kenny-particles", "kenny-particles.json");

        this.load.audio("gambling", "kenney_casino-audio/Audio/dice-shake-1.ogg")
        this.load.audio("footstep", "kenney_impact-sounds/Audio/footstep_concrete_002.ogg")
    }

    create() {
        this.anims.create({
            key: 'walk',
            frames: [
                { key: 'player_right' },
                { key: 'right_walk2' }
            ],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            frames: [
                { key: 'player_right' }
            ],
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: [
                { key: 'jump_player' }
            ],
            frameRate: 1
        });

        this.anims.create({
            key: 'crouch',
            frames: [
                { key: 'crouch_player' }
            ],
            frameRate: 1,
        });

        this.anims.create({
            key: 'enemyWalk',
            frames: [
                { key: 'tilemap_sheet', frame: 380 },
                { key: 'tilemap_sheet', frame: 381 }
            ],
            frameRate: 6,
            repeat: -1
        });

         // ...and pass to the next Scene
         this.scene.start("platformerScene");

    }

    // Never get here since a new scene is started in create()
    update() {
    }
}