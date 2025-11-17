'use client';

import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PlusCircleFill, PencilSquare, Trash, CashCoin, Archive } from 'react-bootstrap-icons';

type Product = {
  id: string;
  productName: string;
  price: number;
  quantity: number;
};

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({ productName: '', price: '', quantity: '' });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem('inix_products_v1');
      const storedProducts: Product[] = raw ? JSON.parse(raw) : [];
      setProducts(storedProducts);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct: Product = {
      id: crypto.randomUUID(),
      productName: form.productName,
      price: Number(form.price),
      quantity: Number(form.quantity),
    };

    const raw = localStorage.getItem('inix_products_v1');
    const currentProducts: Product[] = raw ? JSON.parse(raw) : [];
    const newProducts = [...currentProducts, newProduct];

    localStorage.setItem('inix_products_v1', JSON.stringify(newProducts));
    setProducts(newProducts);
    setForm({ productName: '', price: '', quantity: '' });
  };

  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus produk ini?')) {
      const raw = localStorage.getItem('inix_products_v1');
      const currentProducts: Product[] = raw ? JSON.parse(raw) : [];
      const newProducts = currentProducts.filter((p) => p.id !== id);

      localStorage.setItem('inix_products_v1', JSON.stringify(newProducts));
      setProducts(newProducts);
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
              Total Keseluruhan: <strong>{totalKeseluruhan}</strong>
            </h4>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
}