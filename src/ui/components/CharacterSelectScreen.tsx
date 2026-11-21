import { UNIVERSES, type UniverseId } from '../../data/universes';
import { UniverseCard } from './UniverseCard';
import styles from '../styles/CharacterSelectScreen.module.css';
import { useEffect } from 'react';

interface CharacterSelectScreenProps {
  selectedId: UniverseId | null;
  isLoading: boolean;
  onSelect: (universeId: UniverseId) => void;
  onConfirm: () => void;
}

export function CharacterSelectScreen({
  selectedId,
  isLoading,
  onSelect,
  onConfirm,
}: CharacterSelectScreenProps) {
  const selectedUniverse = UNIVERSES.find(
    (universe) => universe.id === selectedId
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() === 'z' ||
        event.key === 'Enter'
      ) {
        event.preventDefault();
        onConfirm();
      }

      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        const currentIndex = UNIVERSES.findIndex(
          (universe) => universe.id === selectedId
        );
        const direction = event.key === 'ArrowLeft' ? -1 : 1;
        const nextIndex =
          currentIndex === -1
            ? 0
            : (currentIndex + direction + UNIVERSES.length) %
              UNIVERSES.length;
        onSelect(UNIVERSES[nextIndex].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onConfirm, onSelect, selectedId]);

  return (
    <main className={styles.screen} aria-busy={isLoading}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>Escolha seu Universo</h1>
          <p className={styles.subtitle}>
            Selecione o personagem para entrar no Nexus.
          </p>
        </header>

        <ul className={styles.grid}>
          {UNIVERSES.map((universe) => (
            <li key={universe.id} className={styles.item}>
              <UniverseCard
                universe={universe}
                isSelected={universe.id === selectedId}
                isLoading={isLoading}
                onSelect={onSelect}
              />
            </li>
          ))}
        </ul>

        <p className={styles.status} role="status">
          {isLoading && selectedUniverse
            ? `Entrando no universo ${selectedUniverse.name}...`
            : ''}
        </p>

        <button
          type="button"
          className={styles.confirm}
          onClick={onConfirm}
          disabled={!selectedId || isLoading}
        >
          <span aria-hidden="true">Z</span>
          {isLoading ? 'Entrando...' : 'Confirmar'}
        </button>
      </div>
    </main>
  );
}
