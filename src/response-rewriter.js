/**
 * ONLY TO MAKE $RESPONSE EASY TO USE
 *  in some case, Backend will respond every request with a 200 http status code
 *  and [error_or_not, data] array.
 *  It's very difficult to use when writing front-end code with angular.
 *
 *  The purpose of this module is to transform it to legal one
 */

/**
 *  typeof response.data === 'string' 不解析
 *  其他的解析
 */
(function(){
  'use strict';
  angular.module('response-rewriter', [])
  .config(['$httpProvider', function($httpProvider){
    $httpProvider.interceptors.push(['$q', function($q){
      return {
        // we don't care legal response like 401
        // we only care [0, xxx]
        response: function(response){
          var data = response.data;
          if (typeof data === 'string') return response;
          if (Number(data[0]) === 1) {
            response.status = 400;
          }
            response.data = data[1];
            return $q.when(response);
        }
      }
    }]);
  }]);

})();
