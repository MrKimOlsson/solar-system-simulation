import React, { useEffect, useState } from 'react';
import Planet from './components/planets/Planet';
import { fetchPlanets } from './services/planetService';
import './App.scss';
import './styles.scss';
import Starfield from './components/background/Starfield';
import NebulaBackground from './components/background/NebulaBackground';
import UI from './components/ui/UI'

{/* ######################################################  Interface  ######################################################*/}

interface PlanetData {
  id: number;
  englishName: string;
  avgTemp?: number;
  density?: number;
  discoveredBy?: string;
  discoveryDate?: string;
  meanRadius?: number;
  moons?: { name: string }[];
}

interface PlanetOffsets {
  [key: string]: { x: number; y: number };
}

const App: React.FC = () => {

{/* ######################################################  useStates  ######################################################*/}

  const [planets, setPlanets] = useState<PlanetData[]>([]);
  const [nasaImages, setNasaImages] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [sunScale, setSunScale] = useState(1);
  const [appHeight, setAppHeight] = useState('940vh');
  const [showScrollMessage, setShowScrollMessage] = useState(false);
  const [showEndMessage, setShowEndMessage] = useState(false);
  const [visiblePlanets, setVisiblePlanets] = useState(['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune']);
  const [currentDistance, setCurrentDistance] = useState('/20');
  const [distanceScale, setDistanceScale] = useState(40); // 1 = 1X, 20 = 20X, 40 = 40X
  const [orbitContainerTop, setOrbitContainerTop] = useState('50vh'); // Default value - Might have to change on different scales (but not used at the moment)


{/* ######################################################  Fetch planet images  ######################################################*/}
// First we fetch all the planets of the solarsystem in planetService.tsx.
// They return don´t include images, so we take the name of those planets and do another fetch to get images for those planets.

  useEffect(() => {
    const loadPlanets = async () => {
      try {
        // Fetch nr 1 - Fetch the planets of the solar system
        const planetsData = await fetchPlanets();
        const imagesMap: { [key: string]: string } = {};

        // Fetch 2-9 - Fetch images for each planet
        for (const planet of planetsData) {
          const imageResponse = await fetch(`https://images-api.nasa.gov/search?q=${planet.englishName}`);
          const imageData = await imageResponse.json();
          const imageUrl = imageData.collection.items[0]?.links[0]?.href;
          imagesMap[planet.englishName] = imageUrl || '';
        }

        // Sort planets
        const correctOrder = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"];
        const sortedPlanets = correctOrder
          .map(name => planetsData.find(planet => planet.englishName === name))
          .filter(planet => planet !== undefined) as PlanetData[];

        setPlanets(sortedPlanets);
        setNasaImages(imagesMap);
      } catch (error) {
        console.error("Error loading planets:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPlanets();
  }, []);


  
  {/* ######################################################  PLANET/ORBIT DISTANCES AND SIZE  ######################################################*/}
  
  // FOR CALCULATION, SEE "root-folder/calculations.txt"
  
  {/* ------------------------------------------------------  Sun Size and Scale  ------------------------------------------------------*/}
  
  // The suns scale will determine the scale of the planets, since the planets size are relative to the sun´s size.
  const toggleScale = () => {
    setSunScale(prev => (prev === 1 ? 100 : 1  )); // Toggle between 1X and 100X.
  };

  const sunSize = 5; // Sun size in vw

{/* ------------------------------------------------------  Unscaled Orbit Distaces  ------------------------------------------------------*/}

// Control unscaled orbit distance from the sun
// Actual orbit distance relative to the sun's size converted to vw format
// Outer planets removed since they are to far away to scroll to at this scale.
const planetOrbitsActual: { [key: string]: number } = {
  Mercury: 210.66,
  Venus: 394.09,
  Earth: 540.24,
  Mars: 821.69,
};

{/* ------------------------------------------------------  Unscaled Planet Distaces  ------------------------------------------------------*/}
// Control unscaled planet distace from the sun
// Offsets for actual distances
// Outer planets removed since they are to far away to scroll to at this scale.
const actualPlanetDistances: PlanetOffsets = {
  Mercury: { x: 210.66, y: 0 },
  Venus: { x: 394.09, y: 0 },
  Earth: { x: 540.24, y: 0 },
  Mars: { x: 821.69, y: 0 },
};

{/* ------------------------------------------------------  Scale /20 Orbit Distace  ------------------------------------------------------*/}
// // Orbit distance: Divided by 20
const orbitsDistanceDividedBy20: { [key: string]: number } = {
  Mercury: 10.53,
  Venus: 19.70,
  Earth: 27.01,
  Mars: 41.08,
  Jupiter: 140.06,
  Saturn: 257.85,
  Uranus: 516.12,
  Neptune: 808.00,
};

{/* ------------------------------------------------------  Scale /20 Planet Distace  ------------------------------------------------------*/}
// // Planet distance: Divided by 20
const planetDistanceDividedBy20: PlanetOffsets = {
  Mercury: { x: 10.53, y: 0 },
  Venus: { x: 19.70, y: 0 },
  Earth: { x: 27.01, y: 0 },
  Mars: { x: 41.08, y: 0 },
  Jupiter: { x: 140.06, y: 1 },
  Saturn: { x: 257.85, y: 0 },
  Uranus: { x: 516.12, y: -1 },
  Neptune: { x: 808.00, y: -1 },
};

{/* ------------------------------------------------------  Scale /40 Orbit Distace  ------------------------------------------------------*/}
// // Orbit distance: Divided by 40
const orbitDistanceDividedBy40: { [key: string]: number } = {
  Mercury: 5.265,
  Venus: 9.86,
  Earth: 13.505,
  Mars: 20.54,
  Jupiter: 70.03,
  Saturn: 128.925,
  Uranus: 258.06,
  Neptune: 404,
};

{/* ------------------------------------------------------  Scale /40 Planet Distace  ------------------------------------------------------*/}
// // Planet distance: Divided by 40
const planetDistanceDividedBy40: PlanetOffsets = {
  Mercury: { x: 5.265, y: 0 },
  Venus: { x: 9.86, y: 0 },
  Earth: { x: 13.505, y: 0 },
  Mars: { x: 20.54, y: 0 },
  Jupiter: { x: 70.03, y: 1 },
  Saturn: { x: 128.925, y: 0 },
  Uranus: { x: 258.06, y: -1 },
  Neptune: { x: 404, y: -1 },
};


{/* ######################################################  Control Orbit times  ######################################################*/}

  // Relative planet orbit times in seconds. 10sek = 1 year
  const planetOrbitalPeriods: { [key: string]: number } = {
    Mercury: 3.33,
    Venus: 6.15,
    Earth: 10,
    Mars: 18.8,
    Jupiter: 118.6,
    Saturn: 294.6,
    Uranus: 840.1,
    Neptune: 1648,
  };


{/* ######################################################  Chaning distance with UI buttons  ######################################################*/}

// Planet distance
  const getOffset = (planetName: string) => {
    if (distanceScale === 1) {
      return actualPlanetDistances[planetName] || { x: 0, y: 0 };
    } else if (distanceScale === 20) {
      return planetDistanceDividedBy20[planetName] || { x: 0, y: 0 };
    } else if (distanceScale === 40) {
      return planetDistanceDividedBy40[planetName] || { x: 0, y: 0 };
    }
    return { x: 0, y: 0 };
  };
  
  // Planet orbit distance
  const getOrbitDistance = (planetName: string) => {
    if (distanceScale === 1) {
      return planetOrbitsActual[planetName as keyof typeof planetOrbitsActual] || 0;
    } else if (distanceScale === 20) {
      return orbitsDistanceDividedBy20[planetName as keyof typeof orbitsDistanceDividedBy20] || 0;
    } else if (distanceScale === 40) {
      return orbitDistanceDividedBy40[planetName as keyof typeof planetDistanceDividedBy40] || 0;
    }
    return 0;
  };
  

{/* ######################################################  Control distance scales settings  ######################################################*/}

{/* ------------------------------------------------------  Scale 1X  ------------------------------------------------------*/}

  const setDistanceScale1x = () => {
    setDistanceScale(1);
    setAppHeight('1800vh');
    setVisiblePlanets(['mercury', 'venus', 'earth', 'mars']);
    setShowScrollMessage(true);
    setShowEndMessage(true);
    setCurrentDistance('1X');
    setOrbitContainerTop('50vh');
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  
{/* ------------------------------------------------------  Scale /20  ------------------------------------------------------*/}

  const setDistanceScaleDividedBy20 = () => {
    setDistanceScale(20);
    setAppHeight('1800vh');
    setVisiblePlanets(['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune']);
    setShowScrollMessage(false);
    setShowEndMessage(false);
    setCurrentDistance('/20');
    setOrbitContainerTop('50vh');
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  
{/* ------------------------------------------------------  Scale /40  ------------------------------------------------------*/}

  const setDistanceScaleDividedBy40 = () => {
    setDistanceScale(40);
    setAppHeight('940vh');
    setVisiblePlanets(['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune']);
    setShowScrollMessage(false);
    setShowEndMessage(false);
    setCurrentDistance('/40');
    setOrbitContainerTop('50vh');
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  
{/* ######################################################  SCROLL MESSAGES  ######################################################*/}


// Scroll event listener
// The message will be shown at 1X scale but disapear when scroll starts
// Another message will show at the bottom
// To control this see setShowScrollMessage(false); and setShowEndMessage(false); in the section above

useEffect(() => {
    const handleScroll = () => {
      const bottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
      if (bottom) {
        setShowScrollMessage(false); // Make sure message is not visible at the bottom
      } else {
        setShowScrollMessage(false); // Reset message when scrolling down
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
}, []);



return (
  <>
      {/* ########################################################################  Background  #########################################################################*/}
    <div>
      <NebulaBackground />
      <Starfield />
    </div>

      {/* ########################################################################  UI INTERFACE  #########################################################################*/}
    <div className="app" style={{ height: appHeight }}>
        
        {/* Pass data to UI component */}
        <UI
          toggleScale={toggleScale}
          sunSize={sunSize}
          currentDistance={currentDistance}
          distanceScale={distanceScale}
          setDistanceScale1x={setDistanceScale1x}
          setDistanceScaleDividedBy20={setDistanceScaleDividedBy20}
          setDistanceScaleDividedBy40={setDistanceScaleDividedBy40}
          loading={loading}
          showScrollMessage={showScrollMessage}
          showEndMessage={showEndMessage}
          appHeight={appHeight}
          sunScale={sunScale}
          planets={planets}
          nasaImages={nasaImages}
        />



      {/* ########################################################################  SOLAR SYSTEM SIMULATION  #########################################################################*/}
      <div
        className={`orbit-container`}
        style={{ top: orbitContainerTop }}
      >
        <div
          className="sun"
          style={{
            width: `${sunSize}vw`,
            height: `${sunSize}vw`,
          }}
        />

        {!loading && (
          <div className="label-container" style={{ position: 'absolute', width: '100%', textAlign: 'center' }}>
            {planets
              .filter((planet) => visiblePlanets.includes(planet.englishName.toLowerCase()))
              .map((planet) => {
                const orbitRadius = getOrbitDistance(planet.englishName);
                const offset = getOffset(planet.englishName);

                return (
                  <React.Fragment key={planet.id}>
                    {/* Orbit Path */}
                    <div
                      className="orbit-path"
                      style={{
                        position: 'absolute',
                        width: `${orbitRadius * 2}vw`,
                        height: `${orbitRadius * 2}vw`,
                        top: `calc(50% - ${orbitRadius}vw)`,
                        left: `calc(50% - ${orbitRadius}vw)`,
                        borderRadius: '50%',
                        animation: `orbit ${planetOrbitalPeriods[planet.englishName as keyof typeof planetOrbitalPeriods]}s linear infinite`,
                      }}
                    >
                      <div
                        className="planet-container"
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: `translate(${offset.x}vw, ${offset.y}vw) translate(-50%, -50%)`,
                        }}
                      >
                        <Planet
                          planet={{
                            ...planet,
                            imageUrl: nasaImages[planet.englishName],
                            sunScale,
                          }}
                          // onClick={() => openModal(planet)}
                        />
                      </div>
                    </div>
                    
                    {/* Planet Label (Centered) */}
                    <p
                      className="planet-label"
                      style={{
                        position: 'absolute',
                        top: `calc(50% + ${orbitRadius}vw + .2vw)`, // Adjust as needed to position below orbit
                        left: '50%',
                        transform: 'translateX(-50%)', // Center horizontally
                      }}
                    >
                      {planet.englishName}
                    </p>
                  </React.Fragment>
                );
              })}
          </div>
        )}
      </div>
    </div>
  </>
);
};

export default App;




