import Link from "next/link";

const Header = () => {
  return (
    <header>
      <div className="flex flex-row justify-between">
        <Link href="/" className="font-bold">
          saitoxu.io
        </Link>
        <div>
          <Link href="/">🇯🇵JA</Link> / <Link href="/en">🇺🇸EN</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
