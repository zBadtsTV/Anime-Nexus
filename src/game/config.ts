
import Phaser from 'phaser';
import { MainScene } from './scenes/MainScene';

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  backgroundColor: '#87CEEB',

  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 1000 },
      debug: false,
    },
  },

  scene: [MainScene],
};
