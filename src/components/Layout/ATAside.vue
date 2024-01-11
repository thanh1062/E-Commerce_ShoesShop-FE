<template>
    <div class="flex flex-col h-full p-4">
        <aside class="p-4  flex-grow rounded-lg md:w-64 lg:w-60">
            <div class="mb-4">
                <button class="text-xl font-bold mx-auto block" @click="toggleSection('brand')">
                    <span v-if="showBrandSection">
                        <i class="pi pi-chevron-down"></i>
                    </span>
                    <span v-else>
                        <i class="pi pi-chevron-up"></i>
                    </span>
                    Thương hiệu
                </button>
            </div>
            <div v-show="showBrandSection">
                <div class="mb-2 flex justify-end">
                    <label for="puma" class="mr-2 text-base md:text-lg cursor-pointer">Puma</label>
                    <input type="checkbox" id="puma" v-model="selectedBrands" value="puma"
                        class="w-4 h-4 md:w-6 md:h-6 cursor-pointer" />
                </div>
                <div class="mb-2 flex justify-end">
                    <label for="adidas" class="mr-2 text-base md:text-lg cursor-pointer">Adidas</label>
                    <input type="checkbox" id="adidas" v-model="selectedBrands" value="adidas"
                        class="w-4 h-4 md:w-6 md:h-6 cursor-pointer " />
                </div>
                <!-- Thêm các checkbox thương hiệu khác nếu cần -->
            </div>

            <div class="mb-4">
                <button class="text-xl font-bold mx-auto block" @click="toggleSection('price')">
                    <span v-if="showPriceSection">
                        <i class="pi pi-chevron-down"></i>
                    </span>
                    <span v-else>
                        <i class="pi pi-chevron-up"></i>
                    </span>
                    Khoảng giá
                </button>
            </div>
            <div v-show="showPriceSection">
                <div class="flex flex-col">
                    <div class="mb-2 flex justify-end items-end">
                        <label for="price-0-100" class="mr-2 text-base md:text-lg cursor-pointer">$0 - $100</label>
                        <input type="checkbox" id="price-0-100" v-model="selectedPriceRanges" value="0-100"
                            class="w-4 h-4 md:w-6 md:h-6 cursor-pointer" />
                    </div>
                    <div class=" mb-2 flex justify-end items-end">
                        <label for="price-100-200" class="mr-2 text-base md:text-lg cursor-pointer">$100 - $200</label>
                        <input type="checkbox" id="price-100-200" v-model="selectedPriceRanges" value="100-200"
                            class="w-4 h-4 md:w-6 md:h-6 cursor-pointer " />
                    </div>
                    <div class="mb-2 flex justify-end items-end">
                        <label for="price-200-300" class="mr-2 text-base md:text-lg cursor-pointer">$200 - $300</label>
                        <input type="checkbox" id="price-200-300" v-model="selectedPriceRanges" value="200-300"
                            class="w-4 h-4 md:w-6 md:h-6 cursor-pointer " />
                    </div>
                    <div class="mb-2 flex justify-end items-end">
                        <label for="price-300-400" class="mr-2 text-base md:text-lg cursor-pointer">$300 - $400</label>
                        <input type="checkbox" id="price-300-400" v-model="selectedPriceRanges" value="300-400"
                            class="w-4 h-4 md:w-6 md:h-6 cursor-pointer " />
                    </div>
                    <!-- Thêm các checkbox khoảng giá khác nếu cần -->
                </div>
            </div>

            <div class="mb-4">
                <button class="text-xl font-bold mx-auto block" @click="toggleSection('size')">
                    <span v-if="showSizeSection">
                        <i class="pi pi-chevron-down"></i>
                    </span>
                    <span v-else>
                        <i class="pi pi-chevron-up"></i>
                    </span>
                    Kích cỡ
                </button>
            </div>
            <div class="mb-2" v-show="showSizeSection" v-for="size in sizes" :key="size">
                <div class="flex justify-end">
                    <label class="mr-2 text-base md:text-lg cursor-pointer" :for="'size-' + size">Kích cỡ {{ size }}</label>
                    <input type="checkbox" :id="'size-' + size" v-model="selectedSizes" :value="size"
                        class="w-4 h-4 md:w-6 md:h-6 cursor-pointer " />
                </div>
                <!-- Thêm các checkbox kích cỡ khác nếu cần -->
            </div>
        </aside>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selectedBrands = ref<string[]>([]);
const selectedPriceRanges = ref<string[]>([]);
const selectedSizes = ref<string[]>([]);
const sizes = ['7', '8', '9', '10'];
const showBrandSection = ref(true);
const showPriceSection = ref(true);
const showSizeSection = ref(true);

const toggleSection = (section: string) => {
    if (section === 'brand') {
        showBrandSection.value = !showBrandSection.value;
    } else if (section === 'price') {
        showPriceSection.value = !showPriceSection.value;
    } else if (section === 'size') {
        showSizeSection.value = !showSizeSection.value;
    }
};
</script>