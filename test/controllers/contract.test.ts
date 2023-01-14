import { expect } from "chai";
import chai from "chai";
import chaiHttp = require("chai-http");
import { app } from "../../config/app";

chai.use(chaiHttp);

describe("Contract Controller Test", () => {
  it("should list contracts based on profile ID", async () => {
    const response = await chai
      .request(app)
      .get("/contracts")
      .set({"profile_id": 1})
         
    expect(response.status).eq(200)
    expect(response.body).to.deep.equal({
      data: [
        {
          id: 2,
          terms: 'bla bla bla',
          status: 'in_progress',
          createdAt: '2023-01-14T13:57:16.205Z',
          updatedAt: '2023-01-14T13:57:16.205Z',
          ContractorId: 6,
          ClientId: 1
        }
      ]
    })
  });
});