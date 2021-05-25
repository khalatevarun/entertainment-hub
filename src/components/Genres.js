import { Chip } from '@material-ui/core';
import axios from 'axios';
import { useEffect } from 'react';

const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}) => {
  console.log(genres);
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(selectedGenres.filter((g) => g.id !== genre.id));
    setGenres([...genres, genre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
    );

    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();
    //eslint-disable-next-line
  }, []);

  return (
    <div style={{ padding: '6px 0' }}>
      {selectedGenres &&
        selectedGenres.map((genre) => (
          <Chip
            label={genre.name}
            style={{ margin: 4, fontSize: 16 }}
            clickable
            onDelete={() => handleRemove(genre)}
            size="small"
            color="secondary"
            key={genre.id}
          />
        ))}

      {genres &&
        genres.map((genre) => (
          <Chip
            label={genre.name}
            style={{ margin: 4, fontSize: 16 }}
            clickable
            onClick={() => handleAdd(genre)}
            size="small"
            key={genre.id}
          />
        ))}
    </div>
  );
};

export default Genres;
