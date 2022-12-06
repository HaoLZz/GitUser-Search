describe("Search page", () => {
  beforeEach(() => {
    cy.visit("/search");
  });

  it("Header section renders correctly", () => {
    cy.get("[data-cy=header-text]").contains("GitUser Search");

    cy.get("[data-cy=header-logo]")
      .should("be.visible")
      .and(($img) => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        //@ts-ignore
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
  });

  it("Search form renders correctly", () => {
    cy.get("[data-cy=search-form]").should("be.visible");
    cy.get("#primary-search").should("be.visible").should("have.value", "");
    cy.get("[data-cy=search-radio-group]").should("be.visible");
    cy.get("input[type=radio][name=user]").should("be.checked");
    cy.get("[data-cy=search-button]").should("be.visible");
  });

  it("Result section renders correctly", () => {
    cy.get("[data-cy=result-list]").should("not.exist");

    cy.get("[data-cy=placeholder-image]")
      .should("be.visible")
      .and(($img) => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        //@ts-ignore
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
  });

  it("Footer section renders correctly", () => {
    cy.get("[data-cy=search-footer]").should("be.visible");
  });
});
