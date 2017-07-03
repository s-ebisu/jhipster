<%#
 Copyright 2013-2017 the original author or authors from the JHipster project.

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
import { JhiHttpInterceptor } from 'ng-jhipster';
import { RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injector } from '@angular/core';
<%_ if (authenticationType === 'oauth2' || authenticationType === 'jwt' || authenticationType === 'uaa') { _%>
import { LoginService } from '../../shared/login/login.service';
<%_ if (authenticationType === 'uaa') { _%>
import { Router } from '@angular/router';
<%_ } _%>
<%_ } if (authenticationType === 'session') { _%>
import { AuthServerProvider } from '../../shared/auth/auth-session.service';
import { StateStorageService } from '../../shared/auth/state-storage.service';
import { LoginModalService } from '../../shared/login/login-modal.service';
<%_ } _%>

export class AuthExpiredInterceptor extends JhiHttpInterceptor {

<%_ if (authenticationType === 'oauth2' || authenticationType === 'jwt' || authenticationType === 'uaa') { _%>
    constructor(private injector: Injector) {
        super();
    }
<%_ } if (authenticationType === 'session') { _%>
    constructor(private injector: Injector,
        private stateStorageService: StateStorageService) {
        super();
    }
<%_ } _%>

    requestIntercept(options?: RequestOptionsArgs): RequestOptionsArgs {
        return options;
    }
<%_ if (authenticationType === 'oauth2' || authenticationType === 'jwt' || authenticationType === 'uaa') { _%>

    responseIntercept(observable: Observable<Response>): Observable<Response> {
        return <Observable<Response>> observable.catch((error, source) => {
            if (error.status === 401) {
                const loginService: LoginService = this.injector.get(LoginService);
                loginService.logout();
<%_ if (authenticationType === 'uaa') { _%>
                const router = this.injector.get(Router);
                router.navigate(['/']);
<%_ } _%>
            }
            return Observable.throw(error);
        });
    }
<%_ } if (authenticationType === 'session') { _%>

    responseIntercept(observable: Observable<Response>): Observable<Response> {
        return <Observable<Response>> observable.catch((error) => {
            if (error.status === 401 && error.text() !== '' && error.json().path && error.json().path.indexOf('/api/account') === -1) {
                const authServerProvider = this.injector.get(AuthServerProvider);
                const destination = this.stateStorageService.getDestinationState();
                const to = destination.destination;
                const toParams = destination.params;
                authServerProvider.logout();

                if (to.name === 'accessdenied') {
                    this.stateStorageService.storePreviousState(to.name, toParams);
                }

                const loginServiceModal = this.injector.get(LoginModalService);
                loginServiceModal.open();

            }
            return Observable.throw(error);
        });
    }
<%_ } _%>
}
