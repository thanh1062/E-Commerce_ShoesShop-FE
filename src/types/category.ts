export interface CategoryType {
  categoryId?: number;
  parentCategory?: CategoryType | null;
  name?: string;
  code?: string;
}

export interface CreationParams {
  name?: string;
  code?: string;
  parentCategoryId?: number | null;
}

export type UpdateParams = Omit<CategoryType, "categoryId">;

export interface CreationResponse {
  status: boolean;
  data: CategoryType;
  message?: string;
}

export interface CategoryResponse {
  status: boolean;
  data?: CategoryType;
  message?: string;
}

export interface ListResponse {
  status: boolean;
  data: CategoryType[];
  message?: string;
}
