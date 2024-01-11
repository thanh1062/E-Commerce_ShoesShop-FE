import Favorite from "@/models/Favorite";
import type { UpdateParams } from "@/types/favorite";
import type { FavoriteType, CreationParams } from "@/types/favorite";
import { ref, computed } from "vue";

const useFavoriteStore = () => {
  // State
  const favorites = ref<FavoriteType[]>([]);
  const favorite = ref<FavoriteType>({});

  // Getters
  const getFavorites = computed(() => favorite.value);
  const getFavorite = computed(() => favorite.value);
  const getAllFavorites = computed(() => favorite.value);

  // Actions
  const fetchFavorites = async () => {
    const { data } = await new Favorite().list();
    setFavorites(data);
  };

  const addFavorite = async (favorite: CreationParams) => {
    const { data } = await new Favorite().create(favorite);
    favorites.value.push(data);
  };

  const updateFavorite = async (id: number, review: UpdateParams) => {
    await new Favorite().update(id, review);
    setReview({});
    fetchFavorites();
  };

  const deleteFavorite = async (id: number) => {
    await new Favorite().delete(id);
    setReview({});
    fetchFavorites();
  };

  // Mutations
  const setFavorites = (newReviews: FavoriteType[]) => {
    favorites.value = newReviews;
  };

  const setReview = (newReview: FavoriteType) => {
    favorite.value = newReview;
  };

  return {
    getFavorite,
    getFavorites,
    getAllFavorites,
    fetchFavorites,
    addFavorite,
    updateFavorite,
    deleteFavorite,
  };
};

export default useFavoriteStore;