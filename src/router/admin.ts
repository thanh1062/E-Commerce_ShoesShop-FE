import Admin from "@/layout/AdminLayout.vue";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import jwt_decode from "jwt-decode";

export const admin = {
  path: "/admin",
  component: Admin,
  meta: {
    requiresAuth: true,
  },
  children: [
    {
      path: "dashboard",
      name: "DashboardAdmin",
      component: () => import("@/views/Admin/Dashboard.vue"),
    },
    {
      path: "brands",
      name: "BrandAdmin",
      component: () => import("@/views/Admin/Brand.vue"),
    },
    {
      path: "categories",
      name: "CategoryAdmin",
      component: () => import("@/views/Admin/Category.vue"),
    },
    {
      path: "products",
      name: "ProductAdmin",
      component: () => import("@/views/Admin/Product.vue"),
    },
    {
      path: "/products",
      name: "ProductsAdmin",
      component: () => import("@/views/Admin/Product.vue"),
    },
    {
      path: "/products/variation",
      name: "ProductsVariation",
      component: () => import("@/views/Admin/ProductVariation.vue"),
    },
    {
      path: "/products/variation-size",
      name: "ProductsVariationSize",
      component: () => import("@/views/Admin/ProductsVariationSizes.vue"),
    },
    {
      path: "/products/image",
      name: "ProductsImage",
      component: () => import("@/views/Admin/ProductsImages.vue"),
    },
    {
      path: "accounts",
      name: "AccountManagement",
      component: () => import("@/views/Admin/Account.vue"),
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('token');
        const valueToken = jwt_decode(token!);
        const roles = valueToken.user.roles;
        const isStaff = roles.some(role => role.authority === 'STAFF');
        if (!isStaff) {
          next(); // Cho phép truy cập nếu là vai trò admin
        } else {
          next("/403"); // Chuyển hướng đến trang lỗi 403 nếu không có quyền truy cập
        }
      },
    },
    {
      path: "orders",
      name: "OrderAdmin",
      component: () => import("@/views/Admin/Order.vue"),
    },
    {
      path: "best-selling-brand",
      name: "best-selling-brand",
      component: () => import("@/views/Admin/BestSellingBrand.vue"),
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('token');
        const valueToken = jwt_decode(token!);
        const roles = valueToken.user.roles;
        const isStaff = roles.some(role => role.authority === 'STAFF');
        if (!isStaff) {
          next(); // Cho phép truy cập nếu là vai trò admin
        } else {
          next("/403"); // Chuyển hướng đến trang lỗi 403 nếu không có quyền truy cập
        }
      },
    },
    {
      path: "report-revenue",
      name: "report-revenue",
      component: () => import("@/views/Admin/ReportRevenue.vue"),
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('token');
        const valueToken = jwt_decode(token!);
        const roles = valueToken.user.roles;
        const isStaff = roles.some(role => role.authority === 'STAFF');
        if (!isStaff) {
          next(); // Cho phép truy cập nếu là vai trò admin
        } else {
          next("/403"); // Chuyển hướng đến trang lỗi 403 nếu không có quyền truy cập
        }
      },
    },
    {
      path: "review",
      name: "ReviewAdmin",
      component: () => import("@/views/Admin/Review.vue"),
    },
  ],
  beforeEnter: (
    _to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const token = localStorage.getItem('token');
    if (token) {
      const valueToken = jwt_decode(token);
      const roles = valueToken.user.roles;
      const isAdmin = roles.some(role => role.authority === 'ADMIN');
      const isStaff = roles.some(role => role.authority === 'STAFF');
      if (_to.meta.requiresAuth && isAdmin || isStaff) {
        next();
      } else {
        next({ name: 'Home' });
      }
    } else {
      next({ name: 'Login' });
    }
  },
};
