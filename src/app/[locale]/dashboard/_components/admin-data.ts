import { prisma } from '@/libs/Prisma';

export type AdminProduct = {
  id: string;
  name: string;
  sku: string;
  category: string;
  brand: string;
  status: string;
  image: string;
};

export type AdminOrderItem = {
  id: string;
  productName: string;
  category: string;
  quantity: number;
  image: string;
};

export type AdminOrder = {
  id: string;
  orderNumber: string;
  customerInitials: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  cityLocation: string;
  message: string;
  date: string;
  total?: number;
  payment: string;
  status: string;
  privacyAgreed: boolean;
  items: AdminOrderItem[];
};

const categoryLabels = {
  en: {
    ACCESSORY: 'Accessories',
    BATTERY: 'Batteries',
    INVERTER: 'Inverters',
    SOLAR_PANEL: 'Solar Panels',
  },
  fa: {
    ACCESSORY: 'لوازم جانبی',
    BATTERY: 'باتری‌ها',
    INVERTER: 'انورترها',
    SOLAR_PANEL: 'پنل‌های خورشیدی',
  },
  ps: {
    ACCESSORY: 'لوازم',
    BATTERY: 'بیټرۍ',
    INVERTER: 'انورټرونه',
    SOLAR_PANEL: 'لمریز پنلونه',
  },
};

const statusLabels = {
  en: {
    ACTIVE: 'Active',
    ARCHIVED: 'Archived',
    CANCELLED: 'Cancelled',
    COMPLETED: 'Completed',
    DRAFT: 'Draft',
    PENDING: 'Pending',
  },
  fa: {
    ACTIVE: 'فعال',
    ARCHIVED: 'آرشیف',
    CANCELLED: 'لغو شده',
    COMPLETED: 'تکمیل شده',
    DRAFT: 'پیش‌نویس',
    PENDING: 'در انتظار',
  },
  ps: {
    ACTIVE: 'فعال',
    ARCHIVED: 'آرشیف',
    CANCELLED: 'لغوه شوی',
    COMPLETED: 'بشپړ شوی',
    DRAFT: 'مسوده',
    PENDING: 'په تمه',
  },
};

const paymentLabels = {
  en: {
    COD: 'COD',
    PAID: 'Paid',
  },
  fa: {
    COD: 'پرداخت هنگام تحویل',
    PAID: 'پرداخت شده',
  },
  ps: {
    COD: 'د تحویل پر وخت تادیه',
    PAID: 'تادیه شوی',
  },
};

function initials(name: string) {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export async function getAdminProducts(locale: 'fa' | 'ps' | 'en' = 'en'): Promise<AdminProduct[]> {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    take: 48,
  });

  return products.map(product => ({
    id: product.id,
    name: product.name,
    sku: product.sku,
    category: categoryLabels[locale][product.category] ?? product.category,
    brand: product.brand,
    status: statusLabels[locale][product.status] ?? product.status,
    image: product.imageUrl ?? 'panel',
  }));
}

export async function getAdminOrders(locale: 'en' | 'fa' | 'ps' = 'en'): Promise<AdminOrder[]> {
  const orders = await prisma.order.findMany({
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 48,
  });

  return orders.map(order => ({
    id: order.id,
    orderNumber: order.orderNumber,
    customerInitials: initials(order.customerName),
    customerName: order.customerName,
    customerPhone: order.customerPhone,
    customerEmail: order.customerEmail,
    cityLocation: order.cityLocation,
    message: order.message ?? '',
    date: formatDate(order.createdAt),
    payment: paymentLabels[locale][order.payment] ?? order.payment,
    status: statusLabels[locale][order.status] ?? order.status,
    privacyAgreed: order.privacyAgreed,
    items: order.items.map(item => ({
      id: item.id,
      productName: item.product.name,
      category: categoryLabels[locale][item.product.category] ?? item.product.category,
      quantity: item.quantity,
      image: item.product.imageUrl ?? 'panel',
    })),
  }));
}
