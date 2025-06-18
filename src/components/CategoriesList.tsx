import { Box, CircularProgress } from "@mui/material";
import { useCategories } from "../hooks/useCategories";

const CategoriesList = () => {
  const { categories, loading, error } = useCategories();

 if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }
  if (error)   return <p>Error: {error.message}</p>;

  return (
    <ul>
      {categories.map((cat) => (
        <li key={cat.id}>{cat.name}</li>
      ))}
    </ul>
  );
};

export default CategoriesList;