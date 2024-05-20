import React from "react";
import { gql, useQuery } from "urql";
import { Link } from "react-router-dom";
import { Grid, Card, CardContent, Typography,CircularProgress, Box } from "@mui/material";
interface Person {
  id: string;
  name: string;
}

interface QueryResult {
  allPeople: {
    edges: {
      node: Person;
    }[];
  };
}

const query = gql`
  query Home {
    allPeople {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const HomePage = () => {
  const [{ data, fetching, error }] = useQuery<QueryResult>({ query });

  if (fetching) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  );
  if (error) return <Typography>There was an error, please try again later: {error.message}</Typography>;

  return (
    <div>
      <Typography variant="h2" align="center" gutterBottom>
        Star Wars Characters
      </Typography>
      <Grid container spacing={3}>
        {data?.allPeople.edges.map(({ node }) => (
          <Grid item xs={12} sm={6} md={4} key={node.id}>
            <Link to={`/person/${node.id}`} style={{ textDecoration: 'none' }}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div" align="center">
                    {node.name}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HomePage;