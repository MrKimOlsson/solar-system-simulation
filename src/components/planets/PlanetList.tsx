import React from 'react';

interface PlanetListProps {
  planets: any[];
  openModal: (planet: any) => void;
}

const PlanetList: React.FC<PlanetListProps> = ({ planets, openModal }) => (
  <div className="planet-list">
    <h2>Solar System Simulation</h2>
    <ul>
      {planets.map((planet) => (
        <li key={planet.id} onClick={() => openModal(planet)} style={{ cursor: 'pointer' }}>
          {planet.englishName}
        </li>
      ))}
    </ul>
  </div>
);

export default PlanetList;
