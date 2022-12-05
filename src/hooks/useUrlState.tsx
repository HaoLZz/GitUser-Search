import {
  useParams,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";

export default function useUrlState() {
  // React router hooks
  const params = useParams();
  const [searchParams, updateSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  // Derived states from URL
  const query = params["*"] ? params["*"]?.split("/")[0] : "";
  const pageIndexStr = searchParams.get("page");
  const totalPagesStr = searchParams.get("totalPages");
  const searchType = searchParams.get("type") || "user";
  const pageIndex = parseUrlStrToNum(pageIndexStr || "");
  const totalPages = parseUrlStrToNum(totalPagesStr || "");

  const updateUrlState = (
    query?: string,
    searchParams?: { [key: string]: string }
  ) => {
    if (query === undefined && searchParams === undefined) return;
    if (query === undefined && searchParams !== undefined) {
      updateSearchParams((prev) => {
        return mergeURLSearchParams(prev.toString(), searchParams);
      });
    }
    if (query !== undefined && searchParams === undefined) {
      const targetUrl = `/search/${query}${location.search}`;
      navigate(targetUrl);
    }
    if (query !== undefined && searchParams !== undefined) {
      const newSearchParams = mergeURLSearchParams(
        location.search,
        searchParams
      );
      const targetUrl = `/search/${query}?${newSearchParams.toString()}`;
      navigate(targetUrl);
    }
  };

  return {
    query,
    pageIndex,
    totalPages,
    searchType,
    updateUrlState,
  };
}

function parseUrlStrToNum(str: string, fallback?: number) {
  let resultNum = fallback ?? 1;
  const parsedNum = parseInt(str);
  if (!Number.isNaN(parsedNum) && parsedNum > 0) {
    resultNum = parsedNum;
  }

  return resultNum;
}

function mergeURLSearchParams(prev: string, update: { [key: string]: string }) {
  const urlSearchParams = new URLSearchParams(prev);
  Object.keys(update).forEach((key) => {
    if (update[key] === "") {
      urlSearchParams.delete(key);
    } else {
      urlSearchParams.set(key, update[key]);
    }
  });
  urlSearchParams.sort();
  return urlSearchParams;
}
