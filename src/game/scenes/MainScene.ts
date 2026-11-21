
import Phaser from 'phaser';
import { Player } from '../entities/Player';

export class MainScene extends Phaser.Scene {
  private player!: Player;

  constructor() {
    super('MainScene');
  }

  preload(): void {
    this.load.spritesheet(
      'saiyajin',
      'assets/sprites/normalized/saiyajin_5x4.png',
      { frameWidth: 256, frameHeight: 256 }
    );
    this.load.spritesheet(
      'ninja',
      'assets/sprites/normalized/ninja_5x4.png',
      { frameWidth: 256, frameHeight: 256 }
    );
    this.load.spritesheet(
      'pirate',
      'assets/sprites/normalized/pirate_5x4.png',
      { frameWidth: 256, frameHeight: 256 }
    );
  }

  create() {
    this.createCharacterAnimations();

    // Cor de fundo do cenário
    this.cameras.main.setBackgroundColor('#87CEEB');

    // Chão provisório
    const ground = this.add.rectangle(
      400,
      550,
      800,
      100,
      0x4caf50
    );

    // Personagem
    const characterId = this.registry.get('characterId');
    this.player = new Player(
      this,
      400,
      450,
      characterId === 'ninja' || characterId === 'pirate'
        ? characterId
        : 'saiyajin'
    );

    // Adiciona física ao chão
    this.physics.add.existing(ground, true);

    this.physics.add.collider(this.player, ground);

    // Limites do mundo
    this.physics.world.setBounds(0, 0, 800, 600);
  }

  update(): void {
    this.player.update();
  }

  private createCharacterAnimations(): void {
    const characters = ['saiyajin', 'ninja', 'pirate'] as const;

    characters.forEach((character) => {
      this.anims.create({
        key: `${character}-running`,
        frames: this.anims.generateFrameNumbers(character, {
          start: 5,
          end: 9,
        }),
        frameRate: 12,
        repeat: -1,
      });

      this.anims.create({
        key: `${character}-jumping`,
        frames: this.anims.generateFrameNumbers(character, {
          start: 10,
          end: 14,
        }),
        frameRate: 10,
        repeat: 0,
      });

      this.anims.create({
        key: `${character}-falling`,
        frames: [{ key: character, frame: 14 }],
        frameRate: 1,
        repeat: 0,
      });
    });
  }
}
