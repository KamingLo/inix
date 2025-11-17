import styles from "@/app/page.module.css";

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata = {
  title: 'Inix - Cek Penjualan',
  description: 'Aplikasi cek penjualan sederhana - Next.js + Bootstrap 5 + LocalStorage',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
      </head>
      <body className={styles.body}>
        <div className="container py-4">
          <header className="mb-4">
            <div className="card bg-dark p-3 shadow-sm">
              <h1 className="text-center text-white mb-0">Inix - Cek Penjualan</h1>
            </div>
          </header>
          <main>{children}</main>
          <footer className="text-center py-3 border-top text-white">
            &copy; {new Date().getFullYear()} Inix App
          </footer>
        </div>
      </body>
    </html>
  );
}

