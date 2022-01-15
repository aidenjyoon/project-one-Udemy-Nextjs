import { Router, useRouter } from "next/router";

const SelectedClientProjectPage = () => {
  const router = useRouter();

  return (
    <div>
      <h1>
        The chosen Project {Router.query.clientProjectId} of Specific Client
        Page
      </h1>
    </div>
  );
};

export default SelectedClientProjectPage;
