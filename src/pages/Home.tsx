import { useState, useEffect } from "react";
import ButtonLoadMore from "../components/ButtonLoadMore";
import styled from "styled-components";

interface Pokemon {
  name: string;
  url: string;
}

const itemsPerPage = 30;

const Home = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${offset}`
        );
        const data = await response.json();

        setPokemons((prev) => [...prev, ...data.results]);
        setHasMore(data.results.length === itemsPerPage);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
      setLoading(false);
    };

    fetchPokemons();
  }, [offset]);

  const handleLoadMore = () => {
    setOffset((prev) => prev + itemsPerPage);
  };
  const getPokemonId = (url: string) => {
    const parts = url.split("/");
    return parts[parts.length - 2];
  };

  return (
    <div>
      <Header>
        <TitleH1>Pokédex</TitleH1>
        <DivHeader>
          <TitleH2>Find Your</TitleH2>
          <Th2>Favorite Pokémon</Th2>
          <DivSearch>
            <SearchButton>O</SearchButton>
            <InputSearch type="text" placeholder="Pesquisar..." />
          </DivSearch>
        </DivHeader>

      </Header>

      <Section>
        <UL>
          {pokemons.map((poke, index) => {
            const id = getPokemonId(poke.url);
            return (
              <LI key={index}>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                  alt={poke.name}
                  width={90}
                  height={90}
                />
                <p>{poke.name}</p>
              </LI>
            );
          })}
        </UL>
        <ButtonLoadMore onClick={handleLoadMore} isLoading={loading} hasMore={hasMore} />
      </Section>
    </div>
  );
};
/* ---------- HEADER ----------*/
const Header = styled.header`
    background-color: #ff5656;
    text-align: center;
    height: 300px;
    display: flex;
    flex-direction: column;
    padding: 24px 16px;
`;

const TitleH1 = styled.h1`
  font-size: 22px;
  font-weight: 400;
  color: #f9f9f9;
  text-align: start;
  padding: 0 0 90px 0;
`;
const TitleH2 = styled.h2`
    font-size: 30px;
    font-weight: 500;
    color: #f9f9f9;
    text-align: start;
    padding: 0;
    line-height: 1;
`;
const Th2 = styled.h2`
    font-size: 30px;
    font-weight: 500;
    color: #f9f9f9;
    text-align: left;
    padding: 0;
    
`;

const DivHeader = styled.div`
  max-width: 350px;
`;

const DivSearch = styled.div`
  max-width: 350px;
  margin: 0 auto;
  display: flex;
  margin-top: 5px;
`;


const InputSearch = styled.input`
  display: flex;
  width: 100%;
  margin: 0 auto;
  height: 40px;
  padding: 5px;
  border: none;
  border-radius: 0 20px 20px 0;
`;

const SearchButton = styled.button`
  border: none;
  padding: 10px;
  border-radius: 20px 0 0 20px;
  width: 50px;
`;




/* ---------- POKEMON LIST ----------*/

const Section = styled.section`
    display: flex;
    flex-direction: column;
    max-width: 1206px;
    margin: 0 auto;
    background-color: #ff5656;
`;

const UL = styled.ul`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    padding: 20px 16px;
    border-radius: 60px 60px 0 0;
`;

const LI = styled.li`
  background-color: #f1f1f1;
  list-style: none;
  margin: 15px;
  width: 142px;
  height: 142px;
  text-align: center;
  border-radius: 10px;

  &:hover{
    cursor: pointer;
    background-color: rgb(210, 210, 210);
  }
`;

export default Home;
