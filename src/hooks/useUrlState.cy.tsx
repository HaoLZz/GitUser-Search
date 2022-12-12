import { MemoryRouter, Routes, Route } from "react-router-dom";
import useUrlState from "./useUrlState";

describe("useUrlState hook", () => {
  const MockRouter = ({
    Component,
    path,
  }: {
    Component: React.FC;
    path: string;
  }) => {
    return (
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/search/*" element={<Component />} />
        </Routes>
      </MemoryRouter>
    );
  };

  const MockComponent: React.FC = () => {
    const { query, pageIndex, searchType, totalPages, updateUrlState } =
      useUrlState();
    return (
      <>
        <div data-cy="result">
          <p data-cy="query">{query}</p>
          <p data-cy="pageIndex">{pageIndex}</p>
          <p data-cy="searchType">{searchType}</p>
          <p data-cy="totalPages">{totalPages}</p>
        </div>
        <div>
          <button
            onClick={() =>
              updateUrlState(undefined, { page: String(pageIndex + 1) })
            }
            data-cy="increase-page"
          >
            Next Page
          </button>
          <button
            onClick={() =>
              updateUrlState(undefined, { page: String(pageIndex - 1) })
            }
            data-cy="decrease-page"
          >
            Prev Page
          </button>
        </div>
      </>
    );
  };

  it("when URL is '/search',all states set to default values", () => {
    cy.mount(<MockRouter path="/search" Component={MockComponent} />).then(
      () => {
        cy.get("[data-cy=result]").should("be.visible");
        cy.get("[data-cy=query]").should("have.text", "");
        cy.get("[data-cy=pageIndex]").should("have.text", "1");
        cy.get("[data-cy=searchType]").should("have.text", "user");
        cy.get("[data-cy=totalPages]").should("have.text", "1");
      }
    );
  });

  it("when URL is '/search/susan',query param is 'susan'", () => {
    cy.mount(
      <MockRouter path="/search/susan" Component={MockComponent} />
    ).then(() => {
      cy.get("[data-cy=result]").should("be.visible");
      cy.get("[data-cy=query]").should("have.text", "susan");
    });
  });

  it("when URL is '/search/?page=34&type=organization&totalPages=50',search params are `34`, `organization`, `50`", () => {
    cy.mount(
      <MockRouter
        path="/search/?page=34&type=organization&totalPages=50"
        Component={MockComponent}
      />
    ).then(() => {
      cy.get("[data-cy=result]").should("be.visible");
      cy.get("[data-cy=pageIndex]").should("have.text", "34");
      cy.get("[data-cy=searchType]").should("have.text", "organization");
      cy.get("[data-cy=totalPages]").should("have.text", "50");
    });
  });

  it("when URL is '/search/?page=34&type=organization&totalPages=50', can call 'updateUrlState' to increase 'page' ", () => {
    cy.mount(
      <MockRouter
        path="/search/?page=34&type=organization&totalPages=50"
        Component={MockComponent}
      />
    ).then(() => {
      cy.get("[data-cy=increase-page]")
        .click()
        .then(() => {
          cy.get("[data-cy=pageIndex]").should("have.text", "35");
        });
    });
  });

  it("when URL is '/search/?page=34&type=organization&totalPages=50', can call 'updateUrlState' to decrease 'page' ", () => {
    cy.mount(
      <MockRouter
        path="/search/?page=34&type=organization&totalPages=50"
        Component={MockComponent}
      />
    ).then(() => {
      cy.get("[data-cy=decrease-page]")
        .click()
        .then(() => {
          cy.get("[data-cy=pageIndex]").should("have.text", "33");
        });
    });
  });
});
