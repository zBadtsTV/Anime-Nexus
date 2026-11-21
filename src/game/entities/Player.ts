import Phaser from 'phaser';

export type PlayerState = 'idle' | 'running' | 'jumping' | 'falling';
export type CharacterId = 'saiyajin' | 'ninja' | 'pirate';

export class Player extends Phaser.GameObjects.Sprite {
  private readonly cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private readonly playerBody: Phaser.Physics.Arcade.Body;
  private readonly characterKeys: Record<CharacterId, Phaser.Input.Keyboard.Key>;
  private playerState: PlayerState = 'idle';
  private facingDirection: -1 | 1 = 1;
  private characterId: CharacterId = 'saiyajin';
  private currentAnimationKey: string | null = null;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    characterId: CharacterId = 'saiyajin'
  ) {
    super(scene, x, y, characterId, 0);

    scene.add.existing(this);
    scene.physics.add.existing(this, false);

    this.playerBody = this.body as Phaser.Physics.Arcade.Body;
    this.playerBody.setSize(40, 60, true);
    this.playerBody.setCollideWorldBounds(true);
    this.setOrigin(0.5, 1);
    this.setDisplaySize(96, 96);

    this.cursors = scene.input.keyboard!.createCursorKeys();
    this.characterKeys = {
      saiyajin: scene.input.keyboard!.addKey(
        Phaser.Input.Keyboard.KeyCodes.ONE
      ),
      ninja: scene.input.keyboard!.addKey(
        Phaser.Input.Keyboard.KeyCodes.TWO
      ),
      pirate: scene.input.keyboard!.addKey(
        Phaser.Input.Keyboard.KeyCodes.THREE
      ),
    };
    this.characterId = characterId;
  }

  get currentState(): PlayerState {
    return this.playerState;
  }

  getState(): PlayerState {
    return this.playerState;
  }

  get direction(): -1 | 1 {
    return this.facingDirection;
  }

  get isGrounded(): boolean {
    return this.playerBody.blocked.down || this.playerBody.touching.down;
  }

  switchCharacter(characterId: CharacterId): void {
    if (characterId === this.characterId) {
      return;
    }

    this.characterId = characterId;
    this.setTexture(characterId, 0);
    this.stop();
    this.setFrame(0);
    this.currentAnimationKey = null;
  }

  update(): void {
    if (Phaser.Input.Keyboard.JustDown(this.characterKeys.saiyajin)) {
      this.switchCharacter('saiyajin');
    } else if (Phaser.Input.Keyboard.JustDown(this.characterKeys.ninja)) {
      this.switchCharacter('ninja');
    } else if (Phaser.Input.Keyboard.JustDown(this.characterKeys.pirate)) {
      this.switchCharacter('pirate');
    }

    const movingLeft = this.cursors.left.isDown;
    const movingRight = this.cursors.right.isDown;

    if (movingLeft) {
      this.playerBody.setVelocityX(-200);
      this.facingDirection = -1;
    } else if (movingRight) {
      this.playerBody.setVelocityX(200);
      this.facingDirection = 1;
    } else {
      this.playerBody.setVelocityX(0);
    }

    if (
      Phaser.Input.Keyboard.JustDown(this.cursors.up) &&
      this.isGrounded
    ) {
      this.playerBody.setVelocityY(-400);
    }

    if (!this.isGrounded) {
      this.playerState =
        this.playerBody.velocity.y < 0 ? 'jumping' : 'falling';
    } else if (this.playerBody.velocity.x !== 0) {
      this.playerState = 'running';
    } else {
      this.playerState = 'idle';
    }

    this.setFlipX(this.facingDirection === -1);
    this.updateAnimation();
  }

  private updateAnimation(): void {
    if (this.playerState === 'idle') {
      if (this.currentAnimationKey !== null) {
        this.stop();
        this.setFrame(0);
        this.currentAnimationKey = null;
      }
      return;
    }

    const animationKey = `${this.characterId}-${this.playerState}`;
    if (this.currentAnimationKey !== animationKey) {
      this.play(animationKey);
      this.currentAnimationKey = animationKey;
    }
  }
}
