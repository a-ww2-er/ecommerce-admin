import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DeleteItemPage({ endpoint, itemName }) {
  const router = useRouter();
  const [itemInfo, setItemInfo] = useState();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`${endpoint}?id=${id}`).then(response => {
      setItemInfo(response.data);
    });
  }, [id, endpoint]);

  function goBack() {
    router.push('/');
  }

  async function deleteItem() {
    await axios.delete(`${endpoint}?id=${id}`);
    goBack();
  }

  return (
    <Layout>
      <h1 className="text-center">
        Do you really want to delete &nbsp;&quot;{itemInfo?.title}&quot;?
      </h1>
      <div className="flex gap-2 justify-center">
        <button onClick={deleteItem} className="btn-red">
          Yes
        </button>
        <button className="btn-default" onClick={goBack}>
          No
        </button>
      </div>
    </Layout>
  );
}
