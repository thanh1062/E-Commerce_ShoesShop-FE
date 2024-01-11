<template>
	<div class="py-10">
		<Steps :model="items" aria-label="Form Steps" />
	</div>
	<div class="flex flex-col lg:flex-row mt-8">
		<div class="w-full">
			<div class="border shadow rounded py-4 px-2 max-h-60">
				<div class="text-xl text-center">Thông tin địa chỉ</div>
				<div class="info px-4 mt-4">
					<p>{{ getAddress?.fullName, getAddress?.phoneNumber }}</p>
					<p class="inline">{{ getAddress?.phoneNumber }}</p>
					<p>{{ getAddress?.email }}</p>
					<p>{{ getAddress?.address }}</p>
					<div class="flex gap-1">
						<p>{{ getWard?.name }}</p>,
						<p>{{ getDistrict?.name }}</p>,
						<p>{{ getProvince?.name }}</p>
					</div>
				</div>
			</div>
			<div class="mt-4 border shadow rounded py-4 px-2">
				<div class="text-xl text-center">Phương thức thanh toán</div>
				<div>
					<div class="px-4">
						<div class="flex items-center gap-5">
							<Checkbox v-model="isPaypal" :binary="true" />
							<Image :src="PayPalImg" alt="Image" width="120" />
						</div>
					</div>
					<div class="px-4">
						<div class="text-right">
							<div v-if="isPaypal">
								<button class="btn-color-medium text-white font-semibold p-2 rounded w-1/3 mt-4"
									type="submit" @click="payWithPaypal">
									Thanh toán với PayPal
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<Order />
	</div>
	<div class="text-left mt-2">
		<div class="flex items-center cursor-pointer" style="font-size: 1rem" @click="back">
			<i class="pi pi-chevron-left gap-1"></i>
			<p>Quay lại</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import Image from 'primevue/image';
import Checkbox from 'primevue/checkbox';
import Steps from 'primevue/steps';
import { ref, onMounted } from 'vue';
import Order from '@/components/Checkout/Order.vue'
import { useAddressStore, useAccountStore, useWardStore, useDistrictStore, useProvinceStore, useUserAddressStore, useCartStore } from '@/store';
import PayPalImg from "@/assets/images/paypal.png";
import { useRouter } from 'vue-router';
import jwt_decode from "jwt-decode";
import Payment from "@/models/Paypal";


const { getCurrentToken } = useAccountStore();
const router = useRouter();
const { fetchWards, getWard, getWards, setWard } = useWardStore();
const { fetchDistrict, getDistrict } = useDistrictStore();
const { fetchProvince, getProvince } = useProvinceStore();
const { getAddress, fetchAddress } = useAddressStore();
const { fetchUserAddresses, getUserAddresses } = useUserAddressStore();
const { getCart } = useCartStore();

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

let isPaypal = ref();

const payWithPaypal = async () => {
	const token = getCurrentToken();
	const userDecode = jwt_decode(token!);
	if (token) {
		try {
			const paymentData = {
				userId: userDecode.user.userId,
				addressId: getAddress.value?.addressId,
				cart: getCart.value,
			};
			const redirectUrl = await new Payment().processPayment(paymentData);
			// Thực hiện chuyển hướng người dùng đến URL thanh toán
			window.location.href = redirectUrl;
		} catch (error) {
			console.error("Payment error:", error);
			// Xử lý lỗi khi không thể thực hiện thanh toán
		}
	} else {
		router.push({ name: "Login" })
	}
}

const back = () => {
	router.back();
}

onMounted(() => {
	const token = getCurrentToken();
	if (token) {
		const userDecode = jwt_decode(token);
		fetchUserAddresses({ userId: userDecode.userId, isDefault: true }).then(async () => {
			const userAddress = getUserAddresses?.value[0];
			await fetchAddress(userAddress?.addressId!);
			await Promise.all([fetchWards(), fetchDistrict(getAddress.value?.districtId!), fetchProvince(getAddress.value?.provinceId!)]);
			let ward = getWards.value.find(w => w.wardId === getAddress.value?.wardId);
			setWard(ward!);
		});
	}
})
</script>