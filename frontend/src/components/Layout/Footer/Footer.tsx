import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 FashionFusion. All rights reserved.</p>
        <div className="mt-4 space-x-4">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-of-service">Terms of Service</Link>
        </div>
      </div>
    </footer> 
  );
}
