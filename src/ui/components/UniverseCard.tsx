import type { CSSProperties } from 'react';
import type { Universe, UniverseId } from '../../data/universes';
import styles from '../styles/UniverseCard.module.css';

type CardCssVars = CSSProperties & {
  '--accent': string;
  '--shadow': string;
};

interface UniverseCardProps {
  universe: Universe;
  isSelected: boolean;
  isLoading: boolean;
  onSelect: (universeId: UniverseId) => void;
}

export function UniverseCard({
  universe,
  isSelected,
  isLoading,
  onSelect,
}: UniverseCardProps) {
  const cssVars: CardCssVars = {
    '--accent': universe.accentColor,
    '--shadow': universe.shadowColor,
  };

  const cardClassName = [
    styles.card,
    isSelected ? styles.selected : '',
    isLoading ? styles.disabled : '',
  ]
    .filter(Boolean)
    .join(' ');

  let label = 'Selecionar';
  if (isSelected) {
    label = isLoading ? 'Entrando...' : 'Selecionado';
  }

  return (
    <article
      className={cardClassName}
      style={cssVars}
      aria-label={`Universo ${universe.name}`}
      onClick={() => {
        if (!isLoading) {
          onSelect(universe.id);
        }
      }}
    >
      <div className={styles.previewFrame} aria-hidden="true">
        <img
          className={styles.preview}
          src={`/assets/sprites/normalized/${universe.id}/frame_00.png`}
          alt=""
          draggable="false"
        />
      </div>
      <h2 className={styles.name}>{universe.name}</h2>
      <p className={styles.description}>{universe.description}</p>
      <button
        type="button"
        className={`${styles.button} ${
          isSelected && isLoading ? styles.blink : ''
        }`}
        onClick={(event) => {
          event.stopPropagation();
          onSelect(universe.id);
        }}
        disabled={isLoading}
        aria-pressed={isSelected}
        aria-busy={isSelected && isLoading}
      >
        {label}
      </button>
    </article>
  );
}
