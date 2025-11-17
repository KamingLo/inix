'use client';

import { Container, Card, Button, ListGroup, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  PersonCircle, PersonBadge, BoxSeam, ArrowRightCircle } from 'react-bootstrap-icons';

export default function LandingPage() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center vh-100"
      data-bs-theme="dark"
      fluid
    >
      <Row>
        <Col>
          <Card style={{ width: '25rem' }}>
            <Card.Header as="h3" className="text-center">
              Informasi Proyek
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex align-items-center">
                  <PersonCircle className="me-3" size={20} />
                  <strong>Nama:</strong>&nbsp; [Nama Anda]
                </ListGroup.Item>
                <ListGroup.Item className="d-flex align-items-center">
                  <PersonBadge className="me-3" size={20} />
                  <strong>NIM:</strong>&nbsp; [NIM Anda]
                </ListGroup.Item>
                <ListGroup.Item className="d-flex align-items-center">
                  <BoxSeam className="me-3" size={20} />
                  <strong>Topik:</strong>&nbsp; Aplikasi Cek Penjualan (Inix)
                </ListGroup.Item>
              </ListGroup>

              <Button
                variant="primary"
                className="w-100 mt-4 d-flex align-items-center justify-content-center"
                href="/view"
              >
                <ArrowRightCircle className="me-2" />
                Buka Aplikasi
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}