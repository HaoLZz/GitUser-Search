describe("Data fetching", () => {
  beforeEach(() => {
    cy.visit("/search");
  });

  it("when search input is empty, click search button will be prompted with an error", () => {
    cy.get("[data-cy=search-button]").click();
    cy.get("#primary-search-helper-text")
      .should("be.visible")
      .contains("Search input is empty");
  });

  it("when search input is `Oct`, click search button will trigger data fetching", () => {
    cy.get("#primary-search").type("Oct");
    cy.get("[data-cy=search-button]").click();
    cy.get("[data-cy=result-list]").should("be.visible");
    cy.get("[data-cy=result-list-item]").should("have.length", 10);
  });

  it("when search input is `eletrcon` and search type is `organization`, `no result found` message will be displayed", () => {
    cy.intercept(
      {
        url: "https://api.github.com/search/users*",
      },
      { fixture: "noResultFound" }
    ).as("search");

    cy.get("#primary-search").type("eletrcon");
    cy.get("input[type=radio][name=organization]").check();
    cy.get("[data-cy=search-button]").click();

    cy.wait("@search");
    cy.get("[data-cy=result-not-found]")
      .should("be.visible")
      .contains("Sorry, no result found");
  });

  it("when search input is `HaoLZz` and search type is `user`, display result of only two users", () => {
    cy.intercept(
      {
        url: "https://api.github.com/search/users*",
      },
      { fixture: "mockResult" }
    ).as("search");

    cy.get("#primary-search").type("HaoLZz");
    cy.get("input[type=radio][name=user]").check();
    cy.get("[data-cy=search-button]").click();

    cy.wait("@search");
    cy.get("[data-cy=result-list-item]")
      .should("be.visible")
      .eq(0)
      .contains("HaoLZz");
  });

  it("when search input is `Please create an error`, display error message", () => {
    cy.intercept(
      {
        url: "https://api.github.com/search/users*",
      },
      {
        statusCode: 403,
        body: {
          message:
            "API rate limit exceeded for 70.77.235.142. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)",
          documentation_url:
            "https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting",
        },
      }
    ).as("searchWithError");

    cy.get("#primary-search").type("Please create an error");
    cy.get("[data-cy=search-button]").click();

    cy.wait("@searchWithError");
    cy.get("[data-cy=result-error]")
      .should("be.visible")
      .contains("Oops, something went wrong");
  });
});
