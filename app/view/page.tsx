'use client';

import { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Alert,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  PlusCircleFill,
  PencilSquare,
  Trash,
  CashCoin,
  Archive,
} from 'react-bootstrap-icons';

type Product = {
  id: string;
  productName: string;
  price: number;
  quantity: number;
};

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({
    productName: '',
    price: '',
    quantity: '',
  });

  // Fetch produk untuk dipanggil kapan saja (POST/DELETE)
  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  // Load awal menggunakan effect dengan async wrapper
  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      const res = await fetch('/api/products');
      const data = await res.json();

      if (isMounted) {
        setProducts(data);
      }
    };

    loadProducts();

    // Cleanup untuk mencegah race condition
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productName: form.productName,
        price: Number(form.price),
        quantity: Number(form.quantity),
      }),
    });

    setForm({ productName: '', price: '', quantity: '' });
    fetchProducts();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus produk ini?')) {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    }
  };

  const totalKeseluruhan = products.reduce(
    (acc, p) => acc + p.price * p.quantity,
    0
  );

  return (
    <Container className="py-5" data-bs-theme="dark">
      <h2 className="mb-4 text-white">Inix — Cek Penjualan</h2>

      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title className="mb-3 d-flex align-items-center">
                <PlusCircleFill className="me-2" />
                Tambah Produk Baru
              </Card.Title>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="productName">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={form.productName}
                    onChange={(e) =>
                      setForm({ ...form, productName: e.target.value })
                    }
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="quantity">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    value={form.quantity}
                    onChange={(e) =>
                      setForm({ ...form, quantity: e.target.value })
                    }
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  <PlusCircleFill className="me-2" />
                  Tambah Produk
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Produk</th>
                <th>Harga</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center">
                    <Archive className="me-2" />
                    Tidak ada produk
                  </td>
                </tr>
              )}

              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.productName}</td>
                  <td>{p.price}</td>
                  <td>{p.quantity}</td>
                  <td>{p.price * p.quantity}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      href={`/view/${p.id}`}
                      className="me-2"
                    >
                      <PencilSquare className="me-1" />
                      View/Edit
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(p.id)}
                    >
                      <Trash className="me-1" />
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Alert variant="info" className="mt-3">
            <h4 className="alert-heading mb-0 d-flex align-items-center">
              <CashCoin className="me-2" />
              Total Keseluruhan:{' '}
              <strong>{totalKeseluruhan}</strong>
            </h4>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
}
