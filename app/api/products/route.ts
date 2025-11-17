import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { productName, price, quantity } = await req.json();

    if (!productName || !price || !quantity) {
      return NextResponse.json({ error: 'Input tidak lengkap' }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        productName,
        price: Number(price),
        quantity: Number(quantity),
      },
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal membuat produk' }, { status: 500 });
  }
}