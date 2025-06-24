import React, { useState } from "react";
import {
  Box,
  Button,
  InputBase,
  Paper,
  CircularProgress,
  MenuItem,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import { useCategories } from "../../../../hooks/useCategories";

type SortField = "createdAt" | "title";
type SortOption = {
  label: string;
  value: SortField;
  ascending: boolean;
};

interface SearchBarProps {
  onSearch: (
    query: string,
    categoryId: string | null,
    sortBy: SortField | null,
    ascending: boolean
  ) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const { categories, loading, error } = useCategories();
  const { t } = useTranslation();

  const [query, setQuery] = useState("");
const [selectedCategoryId, setSelectedCategoryId] = useState<string>(""); 
  const [sortBy, setSortBy] = useState<SortField | null>(null);
  const [ascending, setAscending] = useState(false);

  const sortOptions: SortOption[] = [
    { label: t("learning.newest"), value: "createdAt", ascending: false },
    { label: t("learning.oldest"), value: "createdAt", ascending: true },
    { label: t("learning.titleAsc"), value: "title", ascending: true },
    { label: t("learning.titleDesc"), value: "title", ascending: false },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim(), selectedCategoryId || null, sortBy, ascending);
  };

  const handleSortChange = (value: string) => {
    if (!value) {
      setSortBy(null);
      setAscending(false);
      return;
    }

    const [field, dir] = value.split("_");
    setSortBy(field as SortField);
    setAscending(dir === "asc");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      gap={1}
      flexWrap="wrap"
    >
      <TextField
        select
        label={t("learning.category")}
        value={selectedCategoryId}
        onChange={(e) => setSelectedCategoryId(e.target.value)}
        size="small"
        sx={{ flex: 1 }}
        disabled={loading || !!error}
      >
        <MenuItem value="">{t("learning.all")}</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </TextField>

      <Paper
        elevation={0}
        sx={{
          flex: 4,
          display: "flex",
          alignItems: "center",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          px: 1,
        }}
      >
        <SearchIcon sx={{ color: "text.disabled", mr: 1 }} />
        <InputBase
          placeholder={t("learning.searchPlaceholder")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ flex: 1 }}
        />
      </Paper>

      <TextField
        select
        size="small"
        label={t("learning.sorting")}
        value={sortBy ? `${sortBy}_${ascending ? "asc" : "desc"}` : ""}
        onChange={(e) => handleSortChange(e.target.value)}
        sx={{ flex: 1 }}
      >
        <MenuItem value="">{t("learning.none")}</MenuItem>
        {sortOptions.map((opt) => (
          <MenuItem
            key={`${opt.value}_${opt.ascending ? "asc" : "desc"}`}
            value={`${opt.value}_${opt.ascending ? "asc" : "desc"}`}
          >
            {opt.label}
          </MenuItem>
        ))}
      </TextField>

      <Button
        type="submit"
        variant="contained"
        sx={{ flex: 1, borderRadius: 1 }}
      >
        {t("learning.search")}
      </Button>

      {loading && <CircularProgress size={24} />}
      {error && (
        <Box color="error.main">{t("learning.failedToLoadCategories")}</Box>
      )}
    </Box>
  );
};

export default SearchBar;
