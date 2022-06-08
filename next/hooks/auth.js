import { useMutation, useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';

export const useAuthHeader = (token) => {
  if (!token) {
    const { data } = useSession();
    token = data?.user?.token;
  }
  return { authorization: token ? `Bearer ${token}` : '' };
}

export const useQueryWithAuth = (query, options) => {
  return useQuery(query, {
    context: { headers: useAuthHeader() },
    ...options
  });
};

export const useMutationWithAuth = (mutation, options) => {
  return useMutation(mutation, {
    context: { headers: useAuthHeader() },
    ...options
  });
};
