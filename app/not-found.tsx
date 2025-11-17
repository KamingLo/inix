'use client';

import { Container, Card, Button } from 'react-bootstrap';
import { House, ExclamationTriangle } from 'react-bootstrap-icons';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NotFound() {
  const router = useRouter();

  return (
    <Container className="py-5" data-bs-theme="dark">
      <Card className="shadow-lg">
        <Card.Body className="p-5 text-center">
          <ExclamationTriangle size={60} className="mb-3 text-warning" />
          <Card.Title as="h1" className="mb-3 fw-bold">404</Card.Title>
          <Card.Title as="h2" className="mb-3">Halaman Tidak Ditemukan</Card.Title>
          <Card.Text className="lead text-white-50">
            Maaf, halaman yang Anda cari tidak ada atau mungkin telah dipindahkan.
          </Card.Text>
          <Button variant="primary" size="lg" onClick={() => router.push('/')} className="mt-4">
            <House className="me-2" />
            Kembali ke Beranda
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}