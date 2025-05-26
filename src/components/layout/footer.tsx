export default function Footer() {
  return (
    <footer id="contact" className="bg-neutral-800 text-primary-foreground/80 py-10">
      <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
        <p>&copy; {new Date().getFullYear()} Yazify. Made with ❤️ for Mubas students.</p>
      </div>
    </footer>
  );
}
