import { useRouter } from "next/router";

const PortfolioProjectPage = () => {
  const router = useRouter();
  return (
    <div>
      <h1>The Portfolio {router.pathname} Page</h1>
    </div>
  );
};

export default PortfolioProjectPage;
