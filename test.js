
const app = require('./index'); 
var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();
describe('GET /', function() {
    it('should return "Hello World"', function(done) {
        chai
            .request(app)
            .get('/')
            .end(function(error, response, body) {
                if (error) {
                    done(error);
                } else {
                  response.should.have.status(200);
                  response.text.should.equal('Hello World');
                    done();
                }
            });
    });
});

const Mocha = require('mocha');
const mocha = new Mocha();

mocha.run((failures) => {
  if (failures === 0) {
    process.exit(0); 
  } else {
    console.error(`${failures} test(s) failed.`);
    process.exit(1);
  }
});