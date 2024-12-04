import Link from "next/link";
import "@/styles/not-found.scss";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-card">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-message">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link href="/" passHref>
          <button className="not-found-button">Go back</button>
        </Link>
      </div>
    </div>
  );
}
