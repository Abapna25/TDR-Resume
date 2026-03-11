export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo">
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--text-muted)', margin: 0 }}>
        &copy; {year} Tyler Reid. All rights reserved.
      </p>
    </footer>
  )
}
