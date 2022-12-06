import ResultListSkeleton from "./ResultListSkeleton";

describe("<ResultListSkeleton />", () => {
  it("number of skeleton items should default to 10", () => {
    cy.mount(<ResultListSkeleton />);
    cy.get("[data-cy=skeleton-item]").should("have.length", 10);
  });

  it('supports a "totalNum" prop to set the number of skeleton displayed', () => {
    cy.mount(<ResultListSkeleton totalNum={5} />);
    cy.get("[data-cy=skeleton-item]").should("have.length", 5);
  });
});
