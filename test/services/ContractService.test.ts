import { expect } from "chai";
import { ContractRepository } from "../../src/repositories";
import { ContractService } from "../../src/services";
import sinon from "sinon";

describe("Contract Service Test", () => {
  let sandbox: any;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  
  afterEach(() => {
    sandbox.restore();
  });

  it("Should get contract by ID ", async () => {
    const contractData = {
      id: 2,
      terms: 'bla bla bla',
      status: 'in_progress',
      createdAt: '2023-01-14T13:57:16.205Z',
      updatedAt: '2023-01-14T13:57:16.205Z',
      ContractorId: 6,
      ClientId: 1
    };
    const ContractRepositoryStub = sinon.createStubInstance(ContractRepository)
    ContractRepositoryStub.getOneBy.resolves(contractData)

    const contractService = new ContractService(ContractRepositoryStub)
    const contract = await contractService.getOneBy(1, 4)

    expect(contract).to.deep.eq(contractData)
  })
});