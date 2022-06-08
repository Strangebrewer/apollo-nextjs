import { useQueryWithAuth } from "../../hooks/auth";
import { GET_ACCOUNTS } from "../queries/accounts";


export const useQueryAccounts = () => {
  const { data, loading, error, refetch } = useQueryWithAuth(GET_ACCOUNTS);
  return { data, loading, error, refetch };
};
