import React, { useState } from "react";
import { gql, useQuery } from "urql";
import { useParams } from "react-router-dom";
import { Box, Typography, Card, CardContent, Grid, Button, CircularProgress  } from "@mui/material";
import styled from "styled-components";
interface Film {
  title: string;
  releaseDate: string;
  producers: string[];
  planetConnection: {
    planets: {
      surfaceWater: number;
    }[];
  };
}

interface Species {
  name: string;
  averageHeight: number;
}

interface Person {
  name: string;
  birthYear: string;
  species: Species;
  filmConnection: {
    films: Film[];
  };
}

interface QueryResult {
  person: Person;
}

const PERSON_QUERY = gql`
  query Person($id: ID!) {
    person(id: $id) {
      name
      birthYear
      species {
        name
        averageHeight
      }
      filmConnection {
        films {
          title
          releaseDate
          producers
          planetConnection {
            planets {
              surfaceWater
            }
          }
        }
      }
    }
  }
`;

const StyledCard = styled(Card)`
  border: 2px solid #FFE81F;
  margin: 0 auto;
  max-width: 600px;
  color:black;
`;

const ProducerList = ({ films }: { films: Film[] }) => {
  const producersCount: { [key: string]: number } = films.reduce((acc, film) => {
    film.producers.forEach((producer) => {
      acc[producer] = (acc[producer] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  return (
    <>
      {Object.entries(producersCount).map(([producer, count]) => (
        <div key={producer}>
          {producer}: {count} times
        </div>
      ))}
    </>
  );
};

const FilmCard = ({ film }: { film: Film }) => (
  <StyledCard variant="outlined">
    <CardContent>
      <Typography variant="h5" component="div" align="center">
        {film.title}
      </Typography>
      <Typography variant="body2" align="center">
        Release Date: {film.releaseDate}
      </Typography>
      <Typography variant="body2" align="center">
        Number of planets without water: {film.planetConnection.planets.filter(p => p.surfaceWater === 0).length}
      </Typography>
    </CardContent>
  </StyledCard>
);

const PersonPage = () => {
  const { personId } = useParams<{ personId: string }>();
  const [{ data, fetching, error }] = useQuery<QueryResult>({
    query: PERSON_QUERY,
    variables: { id: personId },
  });
  const [filmIndex, setFilmIndex] = useState(0);

  if (fetching) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  );
  if (error) return <Typography>Oh no... {error.message}</Typography>;
  if (!data || !data.person) return <Typography>No data available</Typography>;

  const { person } = data;
  const film = person.filmConnection.films[filmIndex];

  const handlePrev = () => {
    if (filmIndex > 0) {
      setFilmIndex(filmIndex - 1);
    }
  };

  const handleNext = () => {
    if (filmIndex < person.filmConnection.films.length - 1) {
      setFilmIndex(filmIndex + 1);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        {person.name}
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        Producers:
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        <ProducerList films={person.filmConnection.films} />
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        Species Average Height: {person.species?.averageHeight ? person.species?.averageHeight + "cm" : "unknown"}
      </Typography>
      <Typography variant="h4" align="center" gutterBottom>
        Films
      </Typography>
      <FilmCard film={film} />
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button variant="contained" onClick={handlePrev} disabled={filmIndex === 0}>
          Prev
        </Button>
        <Button variant="contained" onClick={handleNext} disabled={filmIndex === person.filmConnection.films.length - 1} sx={{ ml: 2 }}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default PersonPage;