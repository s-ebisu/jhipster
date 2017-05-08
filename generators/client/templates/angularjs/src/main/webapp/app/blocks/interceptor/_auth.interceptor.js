<%#
 Copyright 2013-2017 the original author or authors.

 This file is part of the JHipster project, see https://jhipster.github.io/
 for more information.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-%>
(function() {
    'use strict';

    angular
        .module('<%=angularAppName%>')
        .factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['$rootScope', '$q', '$location', '$localStorage', '$sessionStorage'];

    function authInterceptor ($rootScope, $q, $location, $localStorage, $sessionStorage) {
        var service = {
            <%_ if (authenticationType === 'uaa') { _%>
            response: response
            <%_ } else { _%>
            request: request
            <%_ } _%>
        };

        return service;

        <%_ if (authenticationType === 'uaa') { _%>
            function response (response) {
                var jwt = response.headers()['authorization'];
                if(angular.isDefined(jwt)) {
                    $sessionStorage.authenticationToken = jwt;
                }
                return response;
            }
        <%_ } else { _%>
        function request (config) {
            /*jshint camelcase: false */
            config.headers = config.headers || {};
            var token = $localStorage.authenticationToken || $sessionStorage.authenticationToken;
            <%_ if (authenticationType === 'oauth2') { _%>
            if (token && token.expires_at && token.expires_at > new Date().getTime()) {
                config.headers.Authorization = 'Bearer ' + token.access_token;
            }
            <%_ } _%>
            <%_ if (authenticationType === 'jwt') { _%>
            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
            }
            <%_ } _%>
            return config;
        }
        <%_ } _%>
    }
})();
