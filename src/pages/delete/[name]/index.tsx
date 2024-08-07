import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";

interface PageProps {
  name: string;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  const { name } = context.params as { name: string };

  return {
    props: {
      name,
    },
  };
};

const Page: NextPage<PageProps> = ({ name }) => {
  const router = useRouter();

  return <h1>Hello, {router.query.name}!</h1>;
};

export default Page;
