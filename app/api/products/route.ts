import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma'
import { error } from 'console';

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({message: `error mengambil data: ${error}`}, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { productName, price, quantity } = await req.json();

    if (!productName || !price || !quantity) {
      return NextResponse.json({ error: `Input tidak lengkap :${error}` }, { status: 400 });
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
    return NextResponse.json({ error: `Gagal membuat produk :${error}` }, { status: 500 });
  }
}