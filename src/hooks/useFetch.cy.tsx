import { getContainerEl } from "cypress/react18";
import ReactDom from "react-dom";
import useFetch from "./useFetch";

describe("useFetch hook", () => {
  const MockComponent = ({ query }: { query: string }) => {
    const { data, isError, isLoading, error } = useFetch(query);
    console.log(data, isError, isLoading, error);
    return (
      <>
        <div data-cy="result">
          {isLoading && "Data fetching in progress"}
          {isError && `${error?.status} ${error?.info} ${error?.message}`}
          {!isError && !isLoading && (JSON.stringify(data) || "No data")}
        </div>
      </>
    );
  };

  beforeEach(() => {
    cy.then(() => ReactDom.unmountComponentAtNode(getContainerEl()));
  });

  it("fetching is disabled if query is empty", () => {
    cy.mount(<MockComponent query={""} />).then(() => {
      cy.get("[data-cy=result]").contains("No data");
    });
  });

  it("fetching data from GitHub search API", () => {
    cy.mount(
      <MockComponent
        query={
          "https://api.github.com/search/users?q=oct+type:user&page=1&per_page=10"
        }
      />
    ).then(() => {
      cy.get("[data-cy=result]").contains("total_count");
    });
  });

  it("when data fetching failed, isError is set to `true` and error info is stored in `error` object", () => {
    cy.intercept(
      {
        url: "https://api.github.com/search/users*",
      },
      {
        statusCode: 503,
        body: {
          message: "GitHub search is not available right",
        },
      }
    ).as("searchWithError");

    cy.mount(
      <MockComponent query={"https://api.github.com/search/users?q=search"} />
    ).then(() => {
      cy.wait("@searchWithError");
      cy.get("[data-cy=result]").contains("503");
    });
  });
});
