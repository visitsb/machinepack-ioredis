/**
 * Module dependencies
 */

var Pack = require('../');

/**
 * Note: These tests should ideally not be redis-specific.
 * (that way we can reuse them for any driver implementing the "cache" interface layer)
 */

describe('getConnection()', () => {

  //  ╔╗ ╔═╗╔═╗╦╔═╗  ╦ ╦╔═╗╔═╗╔═╗╔═╗
  //  ╠╩╗╠═╣╚═╗║║    ║ ║╚═╗╠═╣║ ╦║╣
  //  ╚═╝╩ ╩╚═╝╩╚═╝  ╚═╝╚═╝╩ ╩╚═╝╚═╝
  describe('with basic usage', () => {

    it('should connect with a password', (done) => {
      Pack.createManager({
        connectionString: 'redis://127.0.0.1:6379'
      }).switch({
        error: done,
        success: function (result){
          // Save reference to manager.
          var manager = result.manager;
          Pack.getConnection({
            manager: manager
          }).switch({
            error: done,
            success: function (){
              done();
            }
          });
        }
      });
    }); //</should connect with a password>

    it('should connect with options instead of url', (done) => {
      Pack.createManager({
        meta: {
          host: '127.0.0.1',
          port: 6379
        }
      }).switch({
        error: done,
        success: function (result){
          // Save reference to manager.
          var manager = result.manager;
          Pack.getConnection({
            manager: manager
          }).switch({
            error: done,
            success: function (){
              done();
            }
          });
        }
      });
    }); //</should connect with options instead of url>

    it('should fail to connect to an invalid port', (done) => {
      Pack.createManager({
        connectionString: 'redis://127.0.0.1:9999',
        meta: {
          connectTimeout: 1000,//eslint-disable-line camelcase
          retryStrategy: function (){//eslint-disable-line camelcase
            return null;
          }
        }
      }).switch({
        error: done,
        success: function (result){
          Pack.getConnection({
            manager: result.manager
          }).switch({
            error: done,
            failed: function (){
              done();
            },
            success: function (){
              done(new Error('should fail to connect to an invalid port'));
            }
          });
        }
      });
    }); //</should connect with a password>


  }); //</with basic usage>

});


