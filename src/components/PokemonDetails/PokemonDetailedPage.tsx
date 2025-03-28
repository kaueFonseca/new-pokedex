import "../../style/App.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPokemonID } from "../../services/pokemonService";
import GoBackToHomeButton from "./GoBackToHomeButton/GoBackToHomeButton";
import { getPokemonDescription } from "../../services/pokemonService";
import styled from "styled-components";
import { typeColors } from "../types/TypeColors";
import PokeballBackground from "../../assets/pokeball-2-bright.png";
import { lightenColor } from "../PokemonDetails/lightenPokemonColor/lightenColor";
import pokeballNav from "../../assets/pokeballNav.svg"
import { FaWeight, FaRuler } from "react-icons/fa";


const PokemonDetailedPage = () => {
  //State
  const [pokemon, setPokemon] = useState<any>(null);
  const [description, setDescription] = useState("");
  const { id } = useParams();

  //Style logic
  const primaryType = pokemon?.types[0]?.type?.name ?? "normal";
  const bgColor = typeColors[primaryType] || "#FFFFFF";
  const lighterColor = lightenColor(bgColor, 20);

  //Fetching data
  useEffect(() => {
    const fetchPokemon = async () => {
      const data = await getPokemonID(Number(id));
      setPokemon(data);
    };
    fetchPokemon();
  }, [id]);

  useEffect(() => {
    const fetchDescription = async () => {
      const desc = await getPokemonDescription(Number(id));
      setDescription(desc);
    };
    fetchDescription();
  }, [id]);

  //JSX Rendering
  return (
    <>
      <Header bgColor={bgColor} lighterColor={lighterColor}>
        <Nav>
          <GoBackToHomeButton />
          <img src={pokeballNav} alt="Pokeball icon" />
        </Nav>
        <DivPokemonContainer>
          <div>
            {pokemon ? (
              <>
                <H1>{pokemon.name}</H1>
                <UlTypes>
                  {pokemon?.types.map((type: any) => (
                    <LItypes bgColor={bgColor} key={type.type.name}>
                      {type.type.name}
                    </LItypes>
                  ))}
                </UlTypes>
              </>
            ) : (
              <p>Carregando...</p>
            )}
          </div>
          <div>
            {pokemon ? <H1span>{pokemon.id}</H1span> : <p>Carregando...</p>}
          </div>
        </DivPokemonContainer>
      </Header>
      <Main bgColor={bgColor}>
        <Section>
          {pokemon ? (
            <PokemonImg >
              {pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default && (
                <img width={220} src={pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default} alt={pokemon.name} />
              )}
            </PokemonImg>
          ) : (
            <p>Carregando...</p>
          )}
          <P>{description || "Descrição não disponível."}</P>

          <InfoContainer>
            <InfoBox>
              <InfoTitle>  <FaRuler /></InfoTitle>
              <InfoValue>{pokemon?.height} m</InfoValue>
            </InfoBox>

            <InfoBox>
              <InfoTitle> <FaWeight /> </InfoTitle>
              <InfoValue>{pokemon?.weight} kg</InfoValue>
            </InfoBox>
          </InfoContainer>

          {/* Habilidades */}
          <AbilitiesTitle>Abilities</AbilitiesTitle>
          <AbilitiesList>
            {pokemon?.abilities.map((ability: any) => (
              <AbilityItem key={ability.ability.name}>
                {ability.ability.name}
              </AbilityItem>
            ))}
          </AbilitiesList>

          <H2>Stats</H2>
          <StatsList>
            {pokemon?.stats.map((stat: any) => (
              <StatItem key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </StatItem>
            ))}
          </StatsList>

          <H2>Moves</H2>
          <MovesList>
            {pokemon?.moves.slice(0, 10).map((move: any) => (
              <MoveItem key={move.move.name}>{move.move.name}</MoveItem>
            ))}
          </MovesList>
        </Section>
      </Main>
    </>
  );
};

//Styled components

const Header = styled.header<{ bgColor: string, lighterColor: string }>`
  background: linear-gradient(to top, ${(props) => props.bgColor}, ${(props) => props.lighterColor}); 
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px 180px;

  &:before{
    content: "";
    position: absolute;
    width: 390px;
    height: 390px;
    top: 359px;
    left: 196px;
    background-image: url(${PokeballBackground});
    background-size: contain;
    background-repeat: no-repeat;
    transform: translate(-50%, -50%);
    opacity: 0.3; 
    z-index: 0;
  }
`;

const Nav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

const H1 = styled.h1`
  color: white;
  font-size: 34px;
  font-weight: 600;
  text-transform: capitalize;
`;

const H1span = styled.span`
  color: white;
  font-size: 22px;
  font-weight: 400;
  text-transform: capitalize;
  text-align: center;

  &:before{
    content: '#';
  }
`;

const DivPokemonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
  width: 100%;         
  padding: 24px 0 0;
`;
const UlTypes = styled.ul`
  display:flex;
`;
const LItypes = styled.li<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  color: #fff;
  font-size: 14px;
  border-radius: 22px;
  padding: 3px 15px;
  margin: 5px;
  text-transform: capitalize;
  text-align: center;
  list-style: none;
`;

const P = styled.p`
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  padding: 80px 16px 0;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

`;
const Main = styled.main<{ bgColor: string }>`
  background-color:${(props) => props.bgColor}; 
`
const Section = styled.section`
  background-color: #fff;
  border-radius: 22px;
`;
const PokemonImg = styled.div`
  position: absolute;
  top: 180px;
  left: 95px;
`

const StatsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  padding: 10px 0;
`;

const StatItem = styled.li`
  background-color: #f0f0f0;
  color: #333;
  border-radius: 12px;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  min-width: 100px;
  list-style: none;
`;

const MovesList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  padding: 10px 0;
`;

const MoveItem = styled.li`
  background-color: #f0f0f0;
  color: #333;
  border-radius: 12px;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  min-width: 100px;
  list-style: none;
`;


const InfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin: 30px 0;
`;

const InfoBox = styled.div`
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 15px;
  text-align: center;
  width: 150px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const InfoTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor || '#333'};
  margin-bottom: 10px;
`;

const InfoValue = styled.p`
  font-size: 16px;
  color: ${(props) => props.theme.textColor || '#333'};
  font-weight: 400;
`;

const AbilitiesTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor || '#333'};
  text-align: center;
  margin-top: 30px;
`;

const AbilitiesList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  padding: 10px 0;
`;

const AbilityItem = styled.li`
  background-color: #e0e0e0;
  color: #333;
  border-radius: 12px;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  min-width: 120px;
  list-style: none;
`;

const H2 = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor || '#333'};
  text-align: center;
  margin-top: 30px;
  margin-bottom: 15px;
`;
export default PokemonDetailedPage;
