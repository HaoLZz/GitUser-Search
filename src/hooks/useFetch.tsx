import useSWR, { Fetcher } from "swr";
import { ResponseUserSearch, ResponseError } from "../interface/data";

const fetcher: Fetcher<ResponseUserSearch, string> = async (url) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error(
      "An error occurred while fetching the data."
    ) as ResponseError;
    // Attach extra info to the error object.
    error.info = JSON.stringify(await res.json());
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export default function useFetch(queryString: string) {
  const { data, error, isValidating } = useSWR<
    ResponseUserSearch,
    ResponseError
  >(() => (queryString ? queryString : null), fetcher, {
    revalidateIfStale: false,
  });

  return {
    data,
    isLoading: isValidating,
    isError: !!error,
    error,
  };
}
