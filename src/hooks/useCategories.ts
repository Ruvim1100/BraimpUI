import { useState, useEffect } from "react";
import type { Category } from "../models/categories/category";
import { getCategories } from "../api/categoryApi";
import useAxiosPrivate from "./useAxiosPrivate";

export const useCategories = () => {
  const axiosPrivate = useAxiosPrivate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const data = await getCategories(axiosPrivate);
        if (isMounted) setCategories(data);
      } catch (err: any) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [axiosPrivate]);

  return { categories, loading, error };
};
