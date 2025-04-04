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
    // Sees animation
    cy.get("button.like").first().should("have.class", "animate");
    // Sees 1 favorite in the nav
    cy.get("span.badge").contains("1");
    // Click on the second "Read recipe" button
    cy.get("button.read-recipe-button").eq(1).click();
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
  it("Logs out, backs to login page, sees notification, 'hi' message changes, localstorage is clean", () => {
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
  describe("Add recipe", () => {
    it("Ingredients loader shows then disappears, ingredients appear", () => {
      cy.intercept("GET", "/ingredients").as("getIngredients");
      cy.visit("http://localhost:5173/addRecipe");
      cy.get(".ingredients-loader").should("exist");
      cy.wait("@getIngredients");
      cy.get(".ingredients-loader").should("not.exist");
      cy.get("label[for='spaghetti']").should("exist");
    });
    it("Ingredients error shows", () => {
      cy.intercept("GET", "/ingredients", {
        statusCode: 500,
        body: { error: "Internal Server Error" },
      }).as("getIngredientsError");
      cy.visit("http://localhost:5173/addRecipe");
      cy.get(".ingredients-error").should("exist");
      cy.get(".ingredients-error").contains(
        "Error fetching the ingredients..."
      );
    });
    it("Blurs name input and error appears", () => {
      cy.visit("http://localhost:5173/addRecipe");
      cy.get("input[name='name']").focus().blur();
      cy.get("p.error").contains("Name is required");
    });
    it("Types invalid image url, shows loader, shows error, types valid image url, image appears", () => {
      cy.visit("http://localhost:5173/addRecipe");
      cy.get("input[name='name']").type("Test Recipe");
      cy.get("input[name='image']").type("invalid-url");
      cy.get("div.loader").should("exist");
      cy.get("p.error").contains("Invalid image URL");
      cy.get("input[name='image']")
        .clear()
        .type(
          "https://canto-wp-media.s3.amazonaws.com/app/uploads/2019/08/19194138/image-url-3.jpg"
        );
      cy.get(".image-loader").should("not.exist");
      cy.get("img").should(
        "have.attr",
        "src",
        "https://canto-wp-media.s3.amazonaws.com/app/uploads/2019/08/19194138/image-url-3.jpg"
      );
    });
    it("Writes a name, writes a valid img url, writes instructions, submit button is disabled, chooses 2 ingredients, submits, 'Recipe added' notification, navigates to home page, goes to last page, recipe is there", () => {
      const url =
        "https://canto-wp-media.s3.amazonaws.com/app/uploads/2019/08/19194138/image-url-3.jpg";
      // Visit the add recipe page
      cy.visit("http://localhost:5173/addRecipe");
      // Fill the form
      cy.get("input[name='name']").type("Test Recipe");
      cy.get("input[name='image']").type(url);
      cy.get("textarea[name='instructions']").type("Test instructions");
      // Check if the submit button is disabled
      cy.get("button[type='submit']").should("be.disabled");
      // Select 2 ingredients
      cy.get("input[name='ingredients[]']").first().check();
      cy.get("input[name='ingredients[]']").eq(3).check();
      // Check if the submit button is enabled
      cy.get("button[type='submit']").should("not.be.disabled");
      // Submit
      cy.get("button[type='submit']").click();

      // Check if the notification is visible
      cy.get("span.notification").contains("Recipe added");
      // Check if the URL is the home page
      cy.url().should("include", "/");
      // Click complex pagination button
      cy.get("button.swap").click();
      // Click on the last page button
      cy.get("div.page-item.number").last().click();
      // Check if the recipe is on the last page
      cy.get("h2").contains("Test Recipe");
    });
  });
});
