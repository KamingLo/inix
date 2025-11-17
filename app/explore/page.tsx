'use client';

import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

type DummyProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
};

export default function ExplorePage() {
  const [products, setProducts] = useState<DummyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(() => {
        setError('Gagal memuat produk');
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="py-5" data-bs-theme="dark">
      <h2 className="mb-4 text-white">Explore Products</h2>
      <Row>
        {products.map((p) => (
          <Col md={4} lg={3} className="mb-4" key={p.id}>
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={p.thumbnail}
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{p.title}</Card.Title>
                <Card.Text className="flex-grow-1">{p.description}</Card.Text>
                <strong className="mt-2">Rp {p.price * 1000}</strong>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
