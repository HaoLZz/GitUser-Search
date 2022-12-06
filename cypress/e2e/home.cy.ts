describe("home page", () => {
  it("redirected user to /search", () => {
    cy.visit("/");
    cy.url().should("match", /search/);
  });
});
