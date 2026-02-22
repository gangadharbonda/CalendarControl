import './globals.css';

export const metadata = {
  title: 'Junk or No',
  description: 'Type a food and find out if it is junk food or not.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
