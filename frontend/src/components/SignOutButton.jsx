import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client.js";
import { toast } from "sonner";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      console.log("Signed Out");
      toast.success("Signed Out!");
    },
    onError: (error) => {
      console.log(error.toString());
      toast.success(error.message);
    },
  });
  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100 "
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
