import { createPinia, type Pinia } from "pinia";

const pinia: Pinia = createPinia();

export default pinia;

// Pinia Stores
import useProductStore from "./ProductStore";
import useAccountStore from "./AccountStore";
import useBrandStore from "./BrandStore";
import useCategoryStore from "./CategoryStore";
import useSizeStore from "./SizeStore";
import useCartStore from "./Cart";
import useAddressStore from "./AddressStore";
import useDistrictStore from "./DistrictStore";
import useProvinceStore from "./ProvinceStore";
import useWardStore from "./WardStore";
import useUserAddressStore from "./UserAddressStore";
import useUserStore from "./UserStore";

export {
  useBrandStore,
  useAccountStore,
  useCategoryStore,
  useProductStore,
  useSizeStore,
  useCartStore,
  useAddressStore,
  useDistrictStore,
  useProvinceStore,
  useWardStore,
  useUserAddressStore,
  useUserStore,
};
