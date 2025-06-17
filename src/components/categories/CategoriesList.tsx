import { useCategories } from "../../hooks/useCategories";

const CategoriesList = () => {
  const { categories, loading, error } = useCategories();

  if (loading) return <p>Loading categories…</p>;
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