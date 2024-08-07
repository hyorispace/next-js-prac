import { useGetDeletedUserList, userQueries } from "@/services/userService";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import Head from "next/head";
import styled from "styled-components";
import { ImgComparisonSlider } from "@img-comparison-slider/react";

const Delete = () => {
  const { data } = useGetDeletedUserList();

  console.log(data);

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

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(userQueries.deleted());

  return {
    props: {
      dehydrateState: dehydrate(queryClient),
    },
  };
};

export default Delete;

const Container = styled.div`
  background-color: pink;
`;
