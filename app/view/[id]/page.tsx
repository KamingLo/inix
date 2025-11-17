'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Save, Trash, ArrowLeft, ExclamationTriangle, HourglassSplit } from 'react-bootstrap-icons';

type Product = {
  id: string;
  productName: string;
  price: number;
  quantity: number;
};

export default function ViewProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({ productName: '', price: '', quantity: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error('Produk tidak ditemukan');
        const data: Product = await res.json();
        setProduct(data);
        setForm({
          productName: data.productName,
          price: String(data.price),
          quantity: String(data.quantity),
        });
      } catch (err: any) {
        setError(err.message || 'Gagal mengambil data produk');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: form.productName,
          price: Number(form.price),
          quantity: Number(form.quantity),
        }),
      });
      if (!res.ok) throw new Error('Gagal memperbarui produk');
      const updated: Product = await res.json();
      setProduct(updated);
      alert('Berhasil diperbarui!');
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Yakin ingin menghapus produk ini?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Gagal menghapus produk');
      alert('Produk berhasil dihapus');
      router.push('/view');
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (!id) return <Container className="py-5"><Alert variant="danger">ID tidak valid</Alert></Container>;
  if (loading) return <Container className="py-5"><Spinner animation="border" /> Loading...</Container>;
  if (error) return <Container className="py-5"><Alert variant="danger">{error}</Alert></Container>;
  if (!product) return <Container className="py-5"><Alert variant="warning">Produk tidak ditemukan</Alert></Container>;

  return (
    <Container className="py-5" data-bs-theme="dark">
      <h2 className="mb-3 text-white">Edit Produk</h2>
      <Card>
        <Card.Body>
          <Form.Group className="mb-3" controlId="productName">
            <Form.Label>Nama Produk</Form.Label>
            <Form.Control
              type="text"
              value={form.productName}
              onChange={(e) => setForm({ ...form, productName: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Harga</Form.Label>
            <Form.Control
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="quantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            />
          </Form.Group>

          <Button variant="primary" className="me-2" onClick={handleSave}>
            <Save className="me-2" />
            Simpan
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            <Trash className="me-2" />
            Hapus
          </Button>
        </Card.Body>
      </Card>

      <Button variant="secondary" className="mt-3" onClick={() => router.push('/view')}>
        <ArrowLeft className="me-2" />
        Kembali
      </Button>
    </Container>
  );
}
