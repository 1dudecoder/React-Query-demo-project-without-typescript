import axios from "axios";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

function Third() {

  const [state, SetState] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
  });

  const fetchemployee = () => {
    return axios.get("http://localhost:3006/employees");
  };

  const addDatatoBackend = (pdata) => {
    return axios.post("http://localhost:3006/employees/", pdata);
  };

  const queryclient = useQueryClient();

  const { data, isLoading, error, isError, isFetching } = useQuery(
    "fetch-third",
    fetchemployee
  );

  const { mutate } = useMutation(addDatatoBackend, {
    onSuccess: () => {
      console.log("data posted succesfully");
      queryclient.invalidateQueries("fetch-third");
      //this query will auto updata data in ui after data posted in backend server
      SetState({id:'',last_name:'',first_name:'',email:''})
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {data.data.map((item) => {
        return <p key={item.id}>{JSON.stringify(item)}</p>;
      })}

      <input
        type="text"
        placeholder="Enter id"
        value={state.id}
        onChange={(e) => {
          SetState({ ...state, id: e.target.value });
        }}
      />

      <input
        type="text"
        placeholder="First name"
        onChange={(e) => {
          SetState({ ...state, first_name: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="Last name"
        onChange={(e) => {
          SetState({ ...state, last_name: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="Email"
        onChange={(e) => {
          SetState({ ...state, email: e.target.value });
        }}
      />

      <button
        onClick={() => {
          console.log(state, "this is your state status");
          mutate(state);
        }}
      >
        submit
      </button>
    </div>
  );
}

export default Third;
