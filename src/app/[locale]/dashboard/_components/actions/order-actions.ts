'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/libs/Prisma';

type OrderItemInput = {
  productId: string;
  quantity: number;
};

type CreateOrderInput = {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  cityLocation: string;
  message?: string;
  payment?: 'PAID' | 'COD';
  privacyAgreed: boolean;
  items: OrderItemInput[];
};

type OrderActionResult = {
  success: boolean;
  message: string;
  orderNumber?: string;
  errors?: Record<string, string>;
};

function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

// Create a new order
export async function createOrder(input: CreateOrderInput): Promise<OrderActionResult> {
  try {
    if (!input.customerName?.trim()) {
      return { success: false, message: 'Customer name is required', errors: { customerName: 'Name is required' } };
    }
    if (!input.customerPhone?.trim()) {
      return { success: false, message: 'Customer phone is required', errors: { customerPhone: 'Phone is required' } };
    }
    if (!input.customerEmail?.trim()) {
      return { success: false, message: 'Customer email is required', errors: { customerEmail: 'Email is required' } };
    }
    if (!input.cityLocation?.trim()) {
      return { success: false, message: 'City/Location is required', errors: { cityLocation: 'City is required' } };
    }
    if (!input.items || input.items.length === 0) {
      return { success: false, message: 'At least one item is required', errors: { items: 'Cart is empty' } };
    }
    if (!input.privacyAgreed) {
      return { success: false, message: 'Privacy policy must be accepted', errors: { privacy: 'Privacy agreement required' } };
    }

    const orderNumber = generateOrderNumber();

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName: input.customerName.trim(),
        customerPhone: input.customerPhone.trim(),
        customerEmail: input.customerEmail.trim(),
        cityLocation: input.cityLocation.trim(),
        message: input.message?.trim() || null,
        payment: input.payment || 'COD',
        status: 'PENDING',
        privacyAgreed: input.privacyAgreed,
        items: {
          create: input.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    revalidatePath('/dashboard/orders');

    return {
      success: true,
      message: 'Order placed successfully!',
      orderNumber: order.orderNumber,
    };
  } catch (error: any) {
    console.error('createOrder failed:', error);
    return {
      success: false,
      message: error.message || 'Failed to create order',
    };
  }
}

// Get all orders with pagination and filters
export async function getAllOrders(filters?: {
  page?: number;
  perPage?: number;
  status?: string;
  payment?: string;
  date?: string;
  search?: string;
}) {
  try {
    const page = filters?.page && filters.page > 0 ? filters.page : 1;
    const perPage = filters?.perPage && filters.perPage > 0 ? filters.perPage : 10;
    const skip = (page - 1) * perPage;

    const where: any = {};

    if (filters?.search) {
      where.OR = [
        { orderNumber: { contains: filters.search, mode: 'insensitive' } },
        { customerName: { contains: filters.search, mode: 'insensitive' } },
        { customerEmail: { contains: filters.search, mode: 'insensitive' } },
        { customerPhone: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    if (filters?.status) {
      where.status = filters.status;
    }

    if (filters?.payment) {
      where.payment = filters.payment;
    }

    if (filters?.date) {
      const start = new Date(filters.date);
      start.setHours(0, 0, 0, 0);

      const end = new Date(filters.date);
      end.setHours(23, 59, 59, 999);

      where.createdAt = {
        gte: start,
        lte: end,
      };
    }

    const [orders, totalCount] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take: perPage,
        orderBy: { createdAt: 'desc' },
        include: {
          items: {
            include: { product: true },
          },
        },
      }),
      prisma.order.count({ where }),
    ]);

    return {
      orders: orders.map(order => ({
        id: order.id,
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        customerEmail: order.customerEmail,
        cityLocation: order.cityLocation,
        message: order.message ?? '',
        payment: order.payment,
        status: order.status,
        privacyAgreed: order.privacyAgreed,
        createdAt: order.createdAt.toISOString(),
        items: order.items.map(item => ({
          id: item.id,
          productId: item.productId,
          productName: item.product.name,
          category: item.product.category,
          quantity: item.quantity,
          image: item.product.imageUrl ?? '',
        })),
      })),
      totalCount,
      totalPages: Math.ceil(totalCount / perPage),
      currentPage: page,
    };
  } catch (error) {
    console.error('getAllOrders failed:', error);
    return {
      orders: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: filters?.page ?? 1,
    };
  }
}

// Get order by ID
export async function getOrderById(orderId: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    if (!order) {
      return null;
    }

    return {
      id: order.id,
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      customerPhone: order.customerPhone,
      customerEmail: order.customerEmail,
      cityLocation: order.cityLocation,
      message: order.message ?? '',
      payment: order.payment,
      status: order.status,
      privacyAgreed: order.privacyAgreed,
      createdAt: order.createdAt.toISOString(),
      items: order.items.map(item => ({
        id: item.id,
        productId: item.productId,
        productName: item.product.name,
        category: item.product.category,
        quantity: item.quantity,
        image: item.product.imageUrl ?? '',
      })),
    };
  } catch (error) {
    console.error('getOrderById failed:', error);
    return null;
  }
}

// Update order status
export async function updateOrderStatus(orderId: string, status: 'PENDING' | 'COMPLETED' | 'CANCELLED') {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    revalidatePath('/dashboard/orders');

    return { success: true, message: 'Order status updated' };
  } catch (error: any) {
    console.error('updateOrderStatus failed:', error);
    return { success: false, message: error.message || 'Failed to update status' };
  }
}
