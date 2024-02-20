import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(apiClient.logout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });

  const clickHandler = () => mutation.mutate();
  return (
    <button
      className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100"
      onClick={clickHandler}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
