import { ref, computed } from 'vue';
import Order from '@/models/Paypal';
import type { , CreationParams, UpdateParams } from '@/types/order';
import { UserType } from '@/types/user';
import { PaymentRequestType } from '@/types/paymentRequest';

const usePaypalStore = () => {
  // State
  const payments = ref<PaymentRequestType[]>([]);
  const payment = ref<PaymentRequestType>({});
  const cart: Ref<CartType> = ref({});
  
  // Getters
  const getPayments = computed(() => payments.value);
  const getPayment = computed(() => payment.value);
  const getCart = computed(() => cart);
  // Actions
  const fetchPayment = async (userId: number) => {
    const { data } = await new Payment().list({
      user: user as UserType
    });
    setOrders(data);
  };

  const fetchPaymentByCartId = async (cartId?: number) => {
    const { data } = await new Order().listbyid({ cartId });
    setOrders(data);
  };

  const addOrder = async (order: CreationParams) => {
    const { data } = await new Order().create(order);
    orders.value.push(data);
  };

  const updateOrder = async (orderId: string, order: UpdateParams) => {
    await new Order().update(orderId, order);
    setOrder({});
    fetchOrders();
  };

  const deleteOrder = async (orderId: string) => {
    await new Order().delete(orderId);
    setOrder({});
    fetchOrders();
  };

  const setOrder = (newOrder: OrderType) => {
    order.value = newOrder;
  };

  const setOrders = (newOrders: OrderType[]) => {
    orders.value = newOrders;
  };

  return {
    getOrder,
    getOrders,
    fetchOrders,
    addOrder,
    updateOrder,
    deleteOrder,
    setOrder,
    fetchOrdersById
  };
};

export default useOrderStore;
