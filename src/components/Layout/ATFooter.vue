<template>
    <div class="footer text-white text-footer-hover py-5 mt-5">
        <div class="container mx-auto px-4">
            <div class="md:flex md:justify-between md:px-5">
                <div class="md:w-1/4 mb-5 md:pr-5">
                    <h4 class="uppercase mb-4 font-semibold">{{ $t('contact') }}</h4>
                    <p class="mb-2"><i class="fa fa-map-marker-alt text-primary mr-3"></i>Công viên phần mềm Quang QTSC
                        Building 1, Trung, P Q.12, Thành phố Hồ Chí Minh, Việt Nam</p>
                    <p class="mb-2"><i class="fa fa-envelope text-primary mr-3"></i>ATSPORT@gmail.com.vn</p>
                    <p class="mb-0"><i class="fa fa-phone-alt text-primary mr-3"></i>{{ $t('phonenum') }}</p>

                </div>
                <div class="md:w-3/4">
                    <div class="md:flex">
                        <div class="md:w-2/3 mb-5">
                            <h4 class="uppercase mb-4 font-semibold">{{ $t('shop') }}</h4>
                            <div class="flex flex-col justify-start">
                                <a class="text-footer-hover mb-2" href="#"><i class="fa fa-angle-right mr-2"></i>{{
                                    $t('home') }}</a>
                                <a class="text-footer-hover mb-2" href="#"><i class="fa fa-angle-right mr-2"></i>{{
                                    $t('checkout') }}</a>
                                <a class="text-footer-hover mb-2" href="#"><i class="fa fa-angle-right mr-2"></i>{{
                                    $t('ourshop') }}</a>
                                <a class="text-footer-hover" href="#"><i class="fa fa-angle-right mr-2"></i>{{
                                    $t('contactus') }}</a>

                            </div>
                        </div>
                        <div class="md:w-1/3 mb-5">
                            <h4 class="uppercase mb-4 font-semibold">{{ $t('follow') }}</h4>
                            <!-- Map Start -->
                            <div class="container mx-auto mt-5">
                                <div class="mapouter">
                                    <div class="gmap_canvas"><iframe width="100%" height="100%" id="gmap_canvas"
                                            src="https://maps.google.com/maps?q=công viên phần mềm qquangtrung&t=&z=19&ie=UTF8&iwloc=&output=embed"
                                            frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a
                                            href="https://2yu.co"></a><br><a href="https://embedgooglemap.2yu.co/"></a>
                                    </div>
                                </div>
                            </div>
                            <!-- Map End -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="border-top border-white mx-auto py-2">
            <div class="container mx-auto px-4">
                <div class="md:flex md:justify-between">
                    <p class="mb-0 text-center md:text-left text-footer-hover">
                        &copy; <a class="text-primary" href="#">Domain</a>. All Rights Reserved
                    </p>
                    <img class="mx-auto md:mx-0" src="/assets/web/img/payments.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { translate } from '@/i18n';

const $t = translate;
</script>