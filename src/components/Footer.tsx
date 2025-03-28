export default function Footer() {
  return (
    <footer className="w-full py-4 bg-blue-50 text-center text-sm text-gray-600 border-t border-blue-100">
      © {new Date().getFullYear()} OCR App. 
      <span className="ml-2 hidden sm:inline">
        Secure Document Processing
      </span>
    </footer>
  );
}