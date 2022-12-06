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

  // Derived states from URL: /search/*?page=<pageIndex>&totalPages=<totalPages>?type=<searchType>
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

/**
 * Convert string in URL to number
 * @param {string} str - A string to be converted.
 * @param {number} fallback - A number to fallback to when converted number is invalid.
 * @returns {number} Converted result as number.
 */
function parseUrlStrToNum(str: string, fallback?: number) {
  let resultNum = fallback ?? 1;
  const parsedNum = parseInt(str);
  if (!Number.isNaN(parsedNum) && parsedNum > 0) {
    resultNum = parsedNum;
  }

  return resultNum;
}

/**
 * Merge previous URLSearchParams with provided update object, will overwrite existing params and delete empty ones
 * @param {string} prev - Previous URLSearchParams in string format.
 * @param {object} update - A update object in { [key: string]: string } format.
 * @returns {URLSearchParams} A new URLSearchParams with merged update.
 */
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
