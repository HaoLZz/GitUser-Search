import useFetch from "./useFetch";

describe("useFetch hook", () => {
  const MockComponent = ({ query }: { query: string }) => {
    const { data, isError, isLoading, error } = useFetch(query);
    return (
      <>
        <div data-cy="result">
          {isLoading && "Data fetching in progress"}
          {isError && JSON.stringify(error)}
          {!isError && !isLoading && (JSON.stringify(data) || "No data")}
        </div>
      </>
    );
  };

  it("fetching is disabled if query is empty", () => {
    cy.mount(<MockComponent query={""} />);
    cy.wait(100);
    cy.get("[data-cy=result]").contains("No data");
  });

  it("fetching data from GitHub search API", () => {
    cy.mount(
      <MockComponent
        query={
          "https://api.github.com/search/users?q=oct+type:user&page=1&per_page=10"
        }
      />
    );
    cy.wait(100);
    cy.get("[data-cy=result]").contains("total_count");
  });
});
