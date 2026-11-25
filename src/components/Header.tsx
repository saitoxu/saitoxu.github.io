import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-center justify-between pb-6 text-sm">
      <Link href="/" className="font-bold tracking-tight text-fg">
        saitoxu.io
      </Link>
      <nav className="flex gap-3 text-muted">
        <Link href="/" className="hover:text-fg">
          🇯🇵 JA
        </Link>
        <span aria-hidden>/</span>
        <Link href="/en" className="hover:text-fg">
          🇺🇸 EN
        </Link>
      </nav>
    </header>
  );
};

export default Header;
