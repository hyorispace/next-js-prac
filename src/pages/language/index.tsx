// pages/index.js
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

export default function Language() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const changeLanguage = (lang: "ko" | "en") => {
    router.push(router.pathname, router.asPath, { locale: lang });
  };

  return (
    <div>
      <h1>{t("greeting")}</h1>
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("ko")}>한국어</button>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};
