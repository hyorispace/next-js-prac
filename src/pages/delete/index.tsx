import { useGetDeletedUserList, userQueries } from "@/services/userService";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import Head from "next/head";
import styled from "styled-components";
import { ImgComparisonSlider } from "@img-comparison-slider/react";
import { GetServerSideProps } from "next";
import apiClient from "@/api/apiClient";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export const getServerSideProps = (async (ctx) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(userQueries.deleted());

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(ctx.locale ?? "en", ["common"])),
    },
  };
}) satisfies GetServerSideProps;

const Delete = () => {
  const { data } = useGetDeletedUserList();
  console.log(data);
  const { t } = useTranslation("common");

  apiClient.get("https://user-list-server.vercel.app/users", {
    onDownloadProgress(progressEvent) {
      console.log(progressEvent);
    },
    onUploadProgress(progressEvent) {
      console.log(progressEvent);
    },
  });

  return (
    <Container>
      <Head>
        <title>delete 페이지</title>
      </Head>
      <>Delete 페이지</>
      <ImgComparisonSlider>
        <img
          slot="first"
          src="https://img-comparison-slider.sneas.io/demo/images/before.webp"
        />
        <img
          slot="second"
          src="https://img-comparison-slider.sneas.io/demo/images/after.webp"
        />
      </ImgComparisonSlider>
    </Container>
  );
};

export default Delete;

const Container = styled.div`
  background-color: pink;
`;
