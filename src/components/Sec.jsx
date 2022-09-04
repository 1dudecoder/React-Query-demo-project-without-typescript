import axios from "axios";
import React from "react";
import { useQueries } from "react-query";

function Sec() {
  const fetchpost = async (id) => {
    console.log(id, "this is fetch post function");
    return axios.get("http://localhost:3006/employees/" + id);
  };

  let PostId = [1, 2, 3];
  const result = useQueries(
    PostId.map((id) => {
      return {
        queryKey: ["post-list", id],
        queryFn: () => fetchpost(id),
      };
    })
  );

  if (result[0].isSuccess) {
    console.log(result);
  }

  return (
    <div>
      { result[0].isSuccess && result[1].isSuccess && result[2].isSuccess   &&
        result.map((item) => {
          return <p>{JSON.stringify(item.data.data)}</p>;
        })}
    </div>
  );
}

export default Sec;
