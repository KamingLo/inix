'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Save, Trash, ArrowLeft, ExclamationTriangle, ExclamationOctagon, HourglassSplit} from 'react-bootstrap-icons';

type Product = {
  id: string;
  productName: string;
  price: number;
  quantity: number;
};

export default function ViewPage() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id;

  if (!id || Array.isArray(id)) {
    return (
      <Container className="py-5" data-bs-theme="dark">
        <Alert variant="danger">
          <ExclamationOctagon size={24} className="me-2" />
          ID tidak valid
        </Alert>
        <Button variant="secondary" onClick={() => router.push('/view')}>
          <ArrowLeft className="me-2" />
          Kembali
        </Button>
      </Container>
    );
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({ productName: '', price: '', quantity: '' });
  const [loading, setLoading] = useState(true);
  const [productFound, setProductFound] = useState(false);

  useEffect(() => {
    const loadProducts = () => {
      if (typeof window === 'undefined') return;

      const raw = localStorage.getItem('inix_products_v1');
      const storedProducts: Product[] = raw ? JSON.parse(raw) : [];
      setProducts(storedProducts);

      const found = storedProducts.find((p) => p.id === id);
      if (found) {
        setForm({
          productName: found.productName,
          price: String(found.price),
          quantity: String(found.quantity),
        });
        setProductFound(true);
      } else {
        setProductFound(false);
      }
      setLoading(false);
    };
    setTimeout(loadProducts, 0);
  }, [id]);

  const updateProduct = (id: string, updated: Partial<Product>) => {
    const raw = localStorage.getItem('inix_products_v1');
    const currentProducts: Product[] = raw ? JSON.parse(raw) : [];
    const newProducts = currentProducts.map((p) =>
      p.id === id ? { ...p, ...updated } : p
    );
    localStorage.setItem('inix_products_v1', JSON.stringify(newProducts));
    setProducts(newProducts);
  };

  const deleteProduct = (id: string) => {
    const raw = localStorage.getItem('inix_products_v1');
    const currentProducts: Product[] = raw ? JSON.parse(raw) : [];
    const newProducts = currentProducts.filter((p) => p.id !== id);
    localStorage.setItem('inix_products_v1', JSON.stringify(newProducts));
    setProducts(newProducts);
  };

  const handleSave = () => {
    updateProduct(id, {
      productName: form.productName,
      price: Number(form.price),
      quantity: Number(form.quantity),
    });
    alert('Berhasil disimpan!');
  };

  const handleDelete = () => {
    if (confirm('Yakin ingin menghapus produk ini?')) {
      deleteProduct(id);
      router.push('/view');
    }
  };

  if (loading)
    return (
      <Container className="py-5" data-bs-theme="dark">
        <p>
          <HourglassSplit className="me-2" />
          Loading...
        </p>
      </Container>
    );

  if (!productFound)
    return (
      <Container className="py-5" data-bs-theme="dark">
        <Alert variant="warning">
          <ExclamationTriangle size={24} className="me-2" />
          <h2>Produk Tidak Ditemukan</h2>
        </Alert>
        <Button variant="secondary" onClick={() => router.push('/view')}>
          <ArrowLeft className="me-2" />
          Kembali
        </Button>
      </Container>
    );

  return (
    <Container className="py-5" data-bs-theme="dark">
      <h2 className="mb-3 text-white">Edit Produk</h2>

      <Card>
        <Card.Body>
          <Form.Group className="mb-3" controlId="productName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              value={form.productName}
              onChange={(e) => setForm({ ...form, productName: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price</Form.Label>
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

      <Button
        variant="secondary"
        className="mt-3"
        onClick={() => router.push('/view')}
      >
        <ArrowLeft className="me-2" />
        Kembali
      </Button>
    </Container>
  );
}