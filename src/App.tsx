
import { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import { gameConfig } from './game/config';
import type { UniverseId } from './data/universes';
import { CharacterSelectScreen } from './ui/components/CharacterSelectScreen';

function App() {
  const [selectedId, setSelectedId] = useState<UniverseId | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const selectionTimer = useRef<number | null>(null);

  const handleSelect = (universeId: UniverseId) => {
    if (isLoading) {
      return;
    }

    setSelectedId(universeId);
  };

  const handleConfirm = () => {
    if (isLoading || !selectedId) {
      return;
    }

    setIsLoading(true);
    selectionTimer.current = window.setTimeout(() => {
      setGameStarted(true);
      setIsLoading(false);
    }, 700);
  };

  useEffect(() => {
    if (!gameStarted || !selectedId) {
      return;
    }

    const selectedGameConfig: Phaser.Types.Core.GameConfig = {
      ...gameConfig,
      callbacks: {
        preBoot: (game) => {
          game.registry.set('characterId', selectedId);
        },
      },
    };

    const game = new Phaser.Game(selectedGameConfig);

    return () => {
      game.destroy(true);
    };
  }, [gameStarted, selectedId]);

  useEffect(() => {
    return () => {
      if (selectionTimer.current !== null) {
        window.clearTimeout(selectionTimer.current);
      }
    };
  }, []);

  if (!gameStarted) {
    return (
      <CharacterSelectScreen
        selectedId={selectedId}
        isLoading={isLoading}
        onSelect={handleSelect}
        onConfirm={handleConfirm}
      />
    );
  }

  return (
    <main className="game-shell">
      <div id="game-container"></div>
    </main>
  );
}

export default App;
