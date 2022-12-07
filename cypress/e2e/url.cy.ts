describe("URL states", () => {
  it("when visit `/search/susan`, search input is populated automatically", () => {
    cy.visit("/search/susan");
    cy.get("#primary-search").should("have.value", "susan");
  });

  it("when visit `/search/susan?type=organization`, search input and radio buttons are populated automatically", () => {
    cy.visit("/search/susan?type=organization");
    cy.get("#primary-search").should("have.value", "susan");
    cy.get("input[type=radio][name=organization]").should("be.checked");
  });
});
