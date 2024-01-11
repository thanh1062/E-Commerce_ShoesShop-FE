import Review from "@/models/Review";
import type { UpdateParams } from "@/types/review";
import type { ReviewType, CreationParams } from "@/types/review";
import { ref, computed } from "vue";

const useReviewStore = () => {
  // State
  const reviews = ref<ReviewType[]>([]);
  const review = ref<ReviewType>({});

  // Getters
  const getReviews = computed(() => reviews.value);
  const getReview = computed(() => review.value);
  const getAllReviews = computed(() => reviews.value);

  // Actions
  const fetchReviews = async () => {
    const { data } = await new Review().list();
    setReviews(data);
  };

  const addReview = async (review: CreationParams) => {
    const { data } = await new Review().create(review);
    reviews.value.push(data);
  };

  const updateReview = async (id: number, review: UpdateParams) => {
    await new Review().update(id, review);
    setReview({});
    fetchReviews();
  };

  const deleteReview = async (id: number) => {
    await new Review().delete(id);
    setReview({});
    fetchReviews();
  };

  // Mutations
  const setReviews = (newReviews: ReviewType[]) => {
    reviews.value = newReviews;
  };

  const setReview = (newReview: ReviewType) => {
    review.value = newReview;
  };

  return {
    getReview,
    getReviews,
    getAllReviews,
    fetchReviews,
    addReview,
    updateReview,
    deleteReview,
  };
};

export default useReviewStore;