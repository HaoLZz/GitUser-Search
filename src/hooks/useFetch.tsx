import useSWR, { Fetcher } from "swr";
import { ResponseUserSearch } from "../interface/data";

const fetcher: Fetcher<ResponseUserSearch, string> = (url) =>
  fetch(url).then((res) => res.json());

export default function useFetch(queryString: string) {
  const { data, error } = useSWR<ResponseUserSearch, Error>(
    () => (queryString ? queryString : null),
    fetcher
  );

  return {
    data,
    isLoading: !error && !data,
    isError: !!error,
    error,
  };
}
