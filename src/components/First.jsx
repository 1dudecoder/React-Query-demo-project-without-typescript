import React from "react";
import axios from "axios";
import { useQuery } from "react-query";


//NORMAL USAGE OF REACT-QUERY
function First() {
  const fetchemployee = () => {
    return axios.get("http://localhost:3006/employees");
  };

  const onSuccess = () => {
    // console.log("request fetch sucessfull");
  };

  const onError = () => {
    // console.log("found error bro");
  };

  const { data, isLoading, error, isError, isFetching } = useQuery(
    "fetch-employes",
    fetchemployee,
    {
      cacheTime: 30000,
      staleTime: 3000,
      refetchOnWindowFocus: true,

      refetchInterval: 5000,
      refetchIntervalInBackground: true,
      enabled: true,

      onSuccess: onSuccess,
      onError,

      select: (data) => {
        let newdata = data?.data.map((item) => {
          let { first_name, id, last_name } = item;
          let obj = {
            first_name,
            id,
            last_name,
          };
          return obj;
        });
        // console.log(newdata, "newdata");
        return { data: newdata };
      },
    }
  );

  if (isLoading) {
    return <p> loading...</p>;
  }

  if (isError) {
    return <p>found an error {error.message}</p>;
  }

  if (isFetching) {
    console.log("fetching data", isFetching, data);
  }

  return (
    <div>
      {data?.data.map((item) => {
        return <p key={item.id}>{item.first_name}</p>;
      })}
    </div>
  );
}

export default First;
