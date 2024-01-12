describe("Test user data", () => {
  it("getData", () => {
    cy.request("https://jsonplaceholder.typicode.com/users").then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.length(10);
      }
    );
  });
});
