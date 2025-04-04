describe("Logged in activities", () => {
  // Login before each test
  beforeEach(() => {
    cy.visit("http://localhost:5173/login");
    // Intercept the login request and force it to resolve
    cy.intercept(
      {
        method: "POST",
        url: "http://192.168.1.12:3000/auth/login",
      },
      {
        statusCode: 200,
        body: {
          email: "testuser@email.com",
        },
      }
    );
    // Fill in form and submit
    cy.get("input[name='email']").type("testuser");
    cy.get("input[name='password']").type("testpassword");
    cy.get("button[type='submit']").click();
  });
  it("Goes to recipes, likes a recipe, sees animation, favourite's number is 1, goes to the next one's recipe details, scrolls to the previous, previous is liked", () => {
    cy.visit("http://localhost:5173");
    // Click like button
    cy.get("button.like").first().click();
    // Click on the second "Read recipe" button
    cy.get("button.read-recipe-button").eq(1).click();
    // Sees animation
    cy.get("button.like").first().should("have.class", "animate");
    // Sees 1 favorite in the nav
    cy.get("span.badge").contains("1");
    // Click on the previous recipe
    cy.wait(1000);
    cy.get("div.outside").eq(1).click();
    // Check if the 3rd recipe is liked
    cy.get("button.like").eq(2).find("svg").should("have.class", "liked");
    // Make the window to phone size
    cy.viewport("iphone-x");
    // Refresh page
    cy.reload();
    // Check if the <strong> contains "Loading"
    cy.get("strong").contains("Loading");
  });
  it.only("Logs out, backs to login page, sees notification, 'hi' message changes, localstorage is clean", () => {
    // Click on the logout link
    cy.get("a").contains("Logout").click();
    // Check if the URL is the login page
    cy.url().should("include", "/login");
    // Check if the notification is visible
    cy.get("span.notification").contains("Logout successful");
    // Check if "Hi, guest!" is visible
    cy.get("p.current-user").contains("Hi, guest!");
    // Check if the user object is removed from localStorage
    cy.window().then((window) => {
      const user = window.localStorage.getItem("user");
      expect(user).to.be.null; // Ensure user is null
    });
    // Check if the favorites badge has zero it it
    cy.get("span.badge").contains("0");
  });
});
