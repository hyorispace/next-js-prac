import Link from "next/link";

const Header = () => {
  return (
    <header>
      <h1>헤더</h1>
      <Link href={"/"}>홈</Link>
      <Link href={"/delete"}>삭제</Link>
      <Link href={"/language"}>언어 선택</Link>
    </header>
  );
};

export default Header;
