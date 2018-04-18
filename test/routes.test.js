const chai = require('chai');
const chaiHttp = require('chai-http');
const {expect} = require('chai');
const {
  truncateTable,
  resetTable,
  resetAndCount,
  countRows
} = require('./helpers');

const app = require('../src/app');

chai.use(chaiHttp);

describe.only('routes', () => {
  beforeEach(() => {
    return resetTable();
  });
  describe('/GET index', () => {
    context('when sending GET request to /', () => {
      it('should render the `index` view', () => {
        return chai.request(app)
          .get('/')
          .then(res => {
            // console.log(res)
            expect(res).to.be.html;
            expect(res).to.have.status(200);
            // expect(res.text).to.contain('<title>SimpleBookStore | SimpleBookStore Home Page<title>');
            
          });
      });
    });
  });


}); //the most outer describe
