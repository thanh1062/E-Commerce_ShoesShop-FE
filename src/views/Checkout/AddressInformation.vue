<template>
	<div class="py-10">
		<Steps :model="items" aria-label="Form Steps" />
	</div>
	<div class="flex flex-col lg:flex-row mt-6">
		<div class="w-full lg:w-8/12 mb-4 border shadow rounded">
			<div class="mb-4">
				<div class="text-2xl m-4">Thông tin và địa chỉ</div>
				<div class="border-b mx-4 mb-2"></div>
				<div class="px-4">
					<form @submit="onSubmit">
						<div class="flex flex-wrap -mx-2">
							<div class="w-full lg:w-1/2 p-3">
								<label for="Name" class="text-gray-600">Họ và Tên</label>
								<InputText v-bind="fullName" class="w-full mt-4" />
								<span class="errorMessage">{{ errors.fullName }}</span>
							</div>
							<div class="w-full lg:w-1/2 p-3">
								<label for="Phone" class="text-gray-600 mb-1">Số điện thoại</label>
								<InputText v-bind="phoneNumber" class="w-full" placeholder="0909436072" />
								<span class="errorMessage">{{ errors.phoneNumber }}</span>
							</div>
							<div class="w-full p-3">
								<label for="Email" class="text-gray-600 mb-1">Email</label>
								<InputText v-bind="email" class="w-full" placeholder="example@gmail.com" />
								<span class="errorMessage">{{ errors.email }}</span>
							</div>
							<div class="w-full p-3">
								<label for="Address" class="text-gray-600 mb-1">Địa chỉ</label>
								<InputText v-bind="address" class="w-full" placeholder="e.g. 138 Quang Trung" />
								<span class="errorMessage">{{ errors.address }}</span>
							</div>
							<div class="w-full p-3">
								<label for="State" class="text-gray-600 mb-1">Phường (Xã)</label>
								<Dropdown v-bind="ward" :options="wardFilterByDistrict" optionLabel="name" placeholder="Chọn Xã(Phường)"
									class="w-full" :disabled="province.modelValue == undefined" />
								<span class="errorMessage">{{ errors.ward }}</span>
							</div>
							<div class="w-full lg:w-1/2 p-3">
								<label for="district" class="text-gray-600 mb-1">Quận(Huyện)</label>
								<Dropdown v-bind="district" :options="districtFilterByProvince" optionLabel="name"
									placeholder="Chọn Quận(Huyện)" class="w-full"
									:disabled="province.modelValue == undefined" />
								<span class="errorMessage">{{ errors.district }}</span>
							</div>
							<div class="w-full lg:w-1/2 p-3">
								<label for="City" class="text-gray-600 mb-1">Tỉnh(Thành Phố)</label>
								<Dropdown v-bind="province" :options="getProvinces" optionLabel="name"
									placeholder="Chọn Tỉnh(Thành Phố)" class="w-full" />
								<span class="errorMessage">{{ errors.province }}</span>
							</div>
						</div>
						<div class="flex items-center justify-between mt-5">
							<div class="flex items-center cursor-pointer" @click="backToCart">
								<i class="pi pi-chevron-left gap-1" style="font-size: 0.9rem"></i>
								<p>Quay lại giỏ hàng</p>
							</div>
							<button class="btn-color-medium text-white font-semibold p-2 rounded w-1/3 mt-4" type="submit">
								Tiếp tục thanh toán
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
		<Order />
	</div>
</template>

<script setup lang="ts">
import Steps from 'primevue/steps';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import Order from '@/components/Checkout/Order.vue'
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import { useDistrictStore, useWardStore, useProvinceStore, useAddressStore, useAccountStore, useUserAddressStore, useCartStore } from '@/store';
import { onMounted } from 'vue';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import jwt_decode from "jwt-decode";

const items = ref([
	{
		label: 'Thông tin và địa chỉ',
		to: "/checkout/address"
	},
	{
		label: 'Phương thức thanh toán',
		to: "/checkout/payment",
	},
	{
		label: 'Xác nhận đơn hàng',
		to: "/checkout/confirmation",
	},
]);

const router = useRouter();
const { hideSidebarCart } = useCartStore();
const { fetchWards, fetchWard, getWards, getWard, setWard } = useWardStore();
const { fetchDistricts, fetchDistrict, getDistricts, getDistrict } = useDistrictStore();
const { fetchProvinces, fetchProvince, getProvinces, getProvince } = useProvinceStore();
const { getAddress, fetchAddress, addAddress, updateAddress } = useAddressStore();
const { getCurrentToken } = useAccountStore();
const { fetchUserAddresses, getUserAddresses, addUserAddress } = useUserAddressStore();
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = toTypedSchema(
	yup.object({
		fullName: yup.string().required("Họ và tên không được bỏ trống"),
		email: yup.string().required("Email không được bỏ trống").email("Email không đúng định dạng"),
		phoneNumber: yup.string().required("Số điện thoại không được bỏ trống").matches(phoneRegExp, "Số điện thoại không đúng dịnh dạng").min(10, "Số điện thoại không được dưới 10 chữ số").max(10, "Số điện thoại không được quá 10 chữ số"),
		address: yup.string().required("Địa chỉ không được để trống"),
		ward: yup.object().required("Xã (phường) không được để trống"),
		district: yup.object().required("Quận (huyện) không được để trống"),
		province: yup.object().required("Tỉnh (thành phố) không được để trống"),
	}),
);
const { errors, values, defineInputBinds, handleSubmit, defineComponentBinds, setValues } = useForm({
	validationSchema: schema,
});

let fullName = defineInputBinds("fullName");
let phoneNumber = defineInputBinds("phoneNumber");
let email = defineInputBinds("email");
let address = defineInputBinds("address");
let ward = defineComponentBinds("ward");
let district = defineComponentBinds("district");
let province = defineComponentBinds("province");

const districtFilterByProvince = computed(() => getDistricts.value.filter(district => district.provinceId === province.value.modelValue?.provinceId));
const wardFilterByDistrict = computed(() => getWards.value.filter(ward => ward.districtId == district.value.modelValue?.districtId));


const onSubmit = handleSubmit(values => {
	const token = getCurrentToken();
	if (!token) {
		router.push({ name: "Login" })
	} else {
		const { fullName, phoneNumber, email, address, ward, district, province } = values;
		let wardId = ward.wardId;
		let districtId = district.districtId;
		let provinceId = province.provinceId;

		if (getUserAddresses?.value[0]?.userAddressId) {
			updateAddress(getUserAddresses.value[0].addressId!, {
				fullName,
				phoneNumber,
				email,
				address,
				wardId,
				districtId,
				provinceId,
			}).then(() => {
				router.push("/checkout/payment");
			});
		} else {
			const userDecode = jwt_decode(token);
			addAddress({
				fullName,
				phoneNumber,
				email,
				address,
				wardId,
				districtId,
				provinceId,
			}).then(async () => {
				await addUserAddress({
					userId: userDecode.user.userId,
					addressId: getAddress.value?.addressId,
					isDefault: true,
				});
				router.push("/checkout/payment");
			});
		}
	}
});

const backToCart = () => {
	router.push({ name: "Cart" });

}

const fetchData = () => {
	hideSidebarCart();
	Promise.all([fetchWards(), fetchDistricts(), fetchProvinces()]).then(() => {
		const token = getCurrentToken();
		if (token) {
			const userDecode = jwt_decode(token);
			fetchUserAddresses({ userId: userDecode.userId, isDefault: true }).then(async () => {
				const userAddress = getUserAddresses?.value[0];
				await fetchAddress(userAddress?.addressId!);
				let ward = getWards.value.find(w => w.wardId === getAddress.value?.wardId);
				setWard(ward!);
				Promise.all([fetchDistrict(getAddress.value?.districtId!), fetchProvince(getAddress.value?.provinceId!)]).then(() => {
					setValues({
						fullName: getAddress.value?.fullName,
						phoneNumber: getAddress.value?.phoneNumber,
						email: getAddress.value?.email,
						address: getAddress.value?.address,
						ward: getWard.value,
						district: getDistrict.value,
						province: getProvince.value,
					});
				});
			});
		}
	});
}

onMounted(fetchData)
</script>
