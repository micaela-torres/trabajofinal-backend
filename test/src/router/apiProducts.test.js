import assert from "assert";
import supertest from "supertest";
import { pmg } from "../../../src/dao/mongoose/product.dao.mg.js";
import { Uid } from "../../../src/utils/UiD.js";

const httpClient = supertest("https://localhost:8080");

describe("api rest", () => {
  describe("/api/products", () => {
    beforeEach(async () => {
      await pmg.deleteMany({});
    });

    afterEach(async () => {
      await pmg.deleteMany({});
    });

    describe("POST", () => {
      describe("when sending a request with correct data", () => {
        it("creates a product and returns 200", async () => {
          const productData = {
            title: "Sample Product",
            description: "This is a sample product",
            price: 9.99,
            thumbnail: "thumbnail_url.png",
            code: Uid(),
            stock: 99,
            category: "Category 1",
            owner: "admin",
          };

          const response = await httpClient
            .post("/api/products")
            .send(productData);
          assert.strictEqual(response.statusCode, 200);
        });
      });
    });

    describe("GET", () => {
      describe("when sending a request and there are products", () => {
        it("returns the collection of products and status code 200", async () => {
          const response = await httpClient.get("/api/products");
          assert.strictEqual(response.statusCode, 200);
        });
      });
    });
  });

  describe("GET /api/products/:pcd", () => {
    describe("when sending a request with a valid product code", () => {
      it("returns the product with the specified code", async () => {
        const response = await httpClient.get("/api/products/0000");
        assert.strictEqual(response.statusCode, 200);
      });
    });

    describe("when sending a request with an invalid product code", () => {
      it("returns an error", async () => {
        const response = await httpClient.get(
          "/api/products/code/invalid-code"
        );
        assert.strictEqual(response.statusCode, 404);
      });
    });
  });

  describe("GET /api/products/:pid", () => {
    describe("when sending a request with a valid product ID", () => {
      it("returns the product with the specified ID", async () => {
        const response = await httpClient.get("/api/products/0000");
        assert.strictEqual(response.statusCode, 200);
      });
    });

    describe("when sending a request with an invalid product ID", () => {
      it("returns an error", async () => {
        const response = await httpClient.get("/api/products/invalid-code");
        assert.strictEqual(response.statusCode, 404);
      });
    });
  });


});

