var chai = require('chai');
chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;

jest.useFakeTimers();

describe('Account', () => {
  it("test1", () => {
    chai.request('http://localhost:8080')
    .get('/healthz')
    .end(function(err,res){
      expect(err).to.be.null
      expect(res).to.have.status(200);
    })

  })

})