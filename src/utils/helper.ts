import { ResponseError } from "../interface/data";

/**
 * Type predicate to narrow an error of type `any` to `ResponseError`
 */
export function isResponseError(error: any): error is ResponseError {
  return (
    typeof error === "object" &&
    error != null &&
    error instanceof Error &&
    "status" in error &&
    "info" in error &&
    typeof error.info === "string" &&
    typeof error.status === "number"
  );
}

/**
 * Type predicate to narrow an error of type `any` to an object with a string 'message' property
 */
export function isErrorWithMessage(
  error: unknown
): error is { message: string } {
  return (
    typeof error === "object" &&
    error != null &&
    "message" in error &&
    typeof error.message === "string"
  );
}
