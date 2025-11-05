const postmanToOpenApi = require("postman-to-openapi");
const input = "./Shari Mohol.postman_collection.json";
const output = "openapi.yml";

postmanToOpenApi(input, output, {
  defaultTag: "General",
  outputFormat: "yaml",
})
  .then((result) => {
    console.log("OpenAPI YAML generated at", result);
  })
  .catch((err) => {
    console.error("Conversion failed:", err);
  });
