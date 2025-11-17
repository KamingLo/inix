import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma"; // Menggunakan instance prisma terpusat

// GET - Mendapatkan satu produk berdasarkan ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const product = await prisma.product.findUnique({
      where: { id: resolvedParams.id },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Produk tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data produk" },
      { status: 500 }
    );
  }
}

// PATCH - Memperbarui satu produk berdasarkan ID
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const body = await request.json();
    const { productName, price, quantity } = body;

    // Validasi sederhana
    if (!productName || price === undefined || quantity === undefined) {
      return NextResponse.json(
        { error: "Data yang dikirim tidak lengkap" },
        { status: 400 }
      );
    }

    const updatedProduct = await prisma.product.update({
      where: { id: resolvedParams.id },
      data: {
        productName: productName,
        price: Number(price),
        quantity: Number(quantity),
      },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error: unknown) {
    // Tangani jika produk tidak ditemukan saat update
    if (error instanceof Error && (error as any).code === "P2025") {
      return NextResponse.json(
        { error: "Produk tidak ditemukan untuk diperbarui" },
        { status: 404 }
      );
    }
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui produk" },
      { status: 500 }
    );
  }
}

// DELETE - Menghapus satu produk berdasarkan ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    await prisma.product.delete({
      where: { id: resolvedParams.id },
    });

    return NextResponse.json(
      { message: "Produk berhasil dihapus" },
      { status: 200 }
    );
  } catch (error: unknown) {
    // Tangani jika produk tidak ditemukan saat delete
    if (error instanceof Error && (error as any).code === "P2025") {
      return NextResponse.json(
        { error: "Produk tidak ditemukan untuk dihapus" },
        { status: 404 }
      );
    }
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Gagal menghapus produk" },
      { status: 500 }
    );
  }
}