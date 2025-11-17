import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: any}
) {
  try {
    const id = await params;
    console.log(id);
    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!product) {
      return NextResponse.json({ error: 'Produk tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error in GET /api/products/[id]:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan internal server' }, { status: 500 });
  }
}

// /**
//  * Menangani PATCH request untuk memperbarui satu produk berdasarkan ID.
//  */
// export async function PATCH(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { productName, price, quantity } = await req.json();

//     // Validasi sederhana
//     if (!productName || price === undefined || quantity === undefined) {
//       return NextResponse.json({ error: 'Data yang dikirim tidak lengkap' }, { status: 400 });
//     }

//     const updatedProduct = await prisma.product.update({
//       where: { id: params.id },
//       data: {
//         productName: productName,
//         price: Number(price),
//         quantity: Number(quantity),
//       },
//     });

//     return NextResponse.json(updatedProduct);
//   } catch (error) {
//     // Tangani jika produk tidak ditemukan saat update
//     if (error instanceof Error && (error as any).code === 'P2025') {
//       return NextResponse.json({ error: 'Produk tidak ditemukan untuk diperbarui' }, { status: 404 });
//     }
//     console.error('Error in PATCH /api/products/[id]:', error);
//     return NextResponse.json({ error: 'Terjadi kesalahan internal server' }, { status: 500 });
//   }
// }

// /**
//  * Menangani DELETE request untuk menghapus satu produk berdasarkan ID.
//  */
// export async function DELETE(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await prisma.product.delete({
//       where: { id: params.id },
//     });

//     return NextResponse.json({ message: 'Produk berhasil dihapus' });
//   } catch (error) {
//     // Tangani jika produk tidak ditemukan saat delete
//     if (error instanceof Error && (error as any).code === 'P2025') {
//       return NextResponse.json({ error: 'Produk tidak ditemukan untuk dihapus' }, { status: 404 });
//     }
//     console.error('Error in DELETE /api/products/[id]:', error);
//     return NextResponse.json({ error: 'Terjadi kesalahan internal server' }, { status: 500 });
//   }
// }