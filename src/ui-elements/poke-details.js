import React from 'react';
import './poke-details.css';

export default function PokeDetails({ details, onClose }) {
  return (
    <div className="pokemon-details-overlay" onClick={onClose}>
      <div className="pokemon-details-modal" onClick={(e) => e.stopPropagation()}>
        {details && (
          <div className="pokemon-details">
            <h2>{details.name}</h2>
            <p>Types: {details.types.map(type => type.type.name).join(', ')}</p>
            <p>Abilities: {details.abilities.map(ability => ability.ability.name).join(', ')}</p>
            <p>Weight: {details.weight}</p>
            <p>Height: {details.height}</p>
            <p>Stats:</p>
            <ul>
              {details.stats.map(stat => (
                <li key={stat.stat.name}>
                  {stat.stat.name}: {stat.base_stat}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}