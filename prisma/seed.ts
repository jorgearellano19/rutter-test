import fetch, {Headers} from 'node-fetch';
import {PrismaClient, Prisma} from '@prisma/client';
import {v4 as uuidv4} from 'uuid';

import {APIResponse, OrdersResponse, ProductsResponse} from './types';


const LIMIT_PER_PAGE = 50;
const LINK_SEPARATOR = ',';
const REGEXP_LINK = /.+(rel="?next=?)/;
const REGEXP_LINK_FORMATTER = /(<)(.*)(>)(; .*)/;

const prisma = new PrismaClient();

async function apiRequest<T>(URL: string): Promise<APIResponse<T>> {
  console.log('Making request to: ', URL);
  const headers = new Headers({
    'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN as string,
  });
  const response = await fetch(URL, {
    headers,
  });

  const data = await response.json() as T;

  const nextLink = (response.headers.get('Link') ?? '')
    .split(LINK_SEPARATOR)
    .find((link) => REGEXP_LINK.test(link))
    ?.replace(REGEXP_LINK_FORMATTER, (_match, _link, formattedLink) => formattedLink) || '';
  return {
    data,
    nextLink,
  };
}

async function getProductsFromShopify() {
  const fields = 'id,title';
  let url = `${process.env.SHOPIFY_URL}/products.json?limit=${LIMIT_PER_PAGE}&fields=${fields}`;
  const productsToStore = [];
  try {
    while (url) {
      const {nextLink, data: {products, errors }} = await apiRequest<ProductsResponse>(url);
      if (errors) {
        throw new Error(errors);
      }
      console.log(products);
      productsToStore.push(...products);
      url = nextLink;
    }
    console.log(`${productsToStore.length} products fetched correctly`);
    return productsToStore;
  } catch (err) {
    console.error('Error fetching products: ', err);
    process.exit(1);
  }
}

async function getOrdersFromShopify() {
  const fields = 'id,line_items';
  let url = `${process.env.SHOPIFY_URL}/orders.json?limit=${LIMIT_PER_PAGE}&fields=${fields}`;
  const ordersToStore = [];
  try {
    while (url) {
      const {nextLink, data: {orders, errors}} = await apiRequest<OrdersResponse>(url);
      if (errors) {
        throw new Error(errors);
      }
      ordersToStore.push(...orders);
      url = nextLink;
    }
    console.log(`${ordersToStore.length} products fetched correctly`);
    return ordersToStore;
  } catch (err) {
    console.error('Error fetching products: ', err);
    process.exit(1);
  }
}

async function seed() {
  const products = await getProductsFromShopify();
  const orders = await getOrdersFromShopify();

  const formattedProducts: Prisma.ProductCreateInput[] = products.map((product) => ({
    name: product.title,
    platform_id: product.id.toString(),
    id: uuidv4(),
  }));

  const ordersWithID = orders.map(({id, line_items}) => {
    return {
      platform_id: id.toString(),
      id: uuidv4(),
      line_items,
    };
  });

  const formattedOrders: Prisma.OrderCreateInput[] = ordersWithID.map(({id, platform_id}) => ({
    platform_id,
    id,
  }));


  const productOrders = ordersWithID.map((order) => {
    const lineItems = order.line_items.map((item) => ({
      product_id: formattedProducts.find((product) => product.platform_id === item.product_id?.toString())?.id || null,
      order_id: order.id,
    }));

    return lineItems;
  }).flat();

  await prisma.order.createMany({
    data: formattedOrders,
  });

  await prisma.product.createMany({
    data: formattedProducts,
  });

  await prisma.productOrder.createMany({
    data: productOrders,
  });


}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })