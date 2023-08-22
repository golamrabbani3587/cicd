const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiAsPromised = require('chai-as-promised');
const app = require('./index'); // Replace this with the path to your Express app file

// Configure chai
chai.use(chaiHttp);
chai.use(chaiAsPromised);

chai.should();


describe('GET /', () => {
  it('should return "Hello World"', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.text.should.equal('Hello World');
        done();
      });
  });
});