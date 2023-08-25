export default (htmlString) => {
  // Create a DOMParser instance
  const parser = new DOMParser();

  // Parse the HTML content
  const doc = parser.parseFromString(htmlString, "text/html");

  // Find the <pre> element containing the error message
  const preElement = doc.querySelector("pre");

  // Extract the error message text
  const errorMessageWithStack = preElement.textContent.trim();

  // Extract only the error message
  const errorMessage = errorMessageWithStack.split("    at ")[0];

  return errorMessage; // Output: "Incorrect email or password"
};
