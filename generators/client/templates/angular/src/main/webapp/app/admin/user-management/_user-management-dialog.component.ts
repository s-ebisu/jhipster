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
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { UserModalService } from './user-modal.service';
import { <% if (enableTranslation) { %>JhiLanguageHelper,<% } %> User, UserService } from '../../shared';

@Component({
    selector: '<%=jhiPrefix%>-user-mgmt-dialog',
    templateUrl: './user-management-dialog.component.html'
})
export class UserMgmtDialogComponent implements OnInit {

    user: User;
    languages: any[];
    authorities: any[];
    isSaving: Boolean;

    constructor(
        public activeModal: NgbActiveModal,
        <%_ if (enableTranslation) { _%>
        private languageHelper: JhiLanguageHelper,
        <%_ } _%>
        private userService: UserService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private router: Router
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.authorities = [];
        this.userService.authorities().subscribe((authorities) => {
            this.authorities = authorities;
        });
        <%_ if (enableTranslation) { _%>
        this.languageHelper.getAll().then((languages) => {
            this.languages = languages;
        });
        <%_ } _%>
    }

    goToPreviousUrl() {
        let currentUrl: string = this.router.url;
        let previousUrl: string = currentUrl.substr(0, (currentUrl.indexOf("(")-1)); 
        this.router.navigate([previousUrl]);
    }

    clear() {
        this.goToPreviousUrl();
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.goToPreviousUrl();
        this.isSaving = true;
        if (this.user.id !== null) {
            this.userService.update(this.user).subscribe((response) => this.onSaveSuccess(response, false), () => this.onSaveError());
        } else {<% if (!enableTranslation) { %>
            this.user.langKey = 'en';<% } %>
            this.userService.create(this.user).subscribe((response) => this.onSaveSuccess(response, true), () => this.onSaveError());
        }
    }

    private onSaveSuccess(result, isCreated: boolean) {
        <%_ if (enableTranslation) { _%>
        this.alertService.success(
            isCreated ? 'userManagement.created'
            : 'userManagement.updated',
            { param : result.json.login }, null);
        <%_ } else { _%>
        this.alertService.success(
            isCreated ? `A new user is created with identifier ${result.json.login}`
            : `An user is updated with identifier ${result.json.login}`,
            null, null);
        <%_ } _%>
        this.eventManager.broadcast({ name: 'userListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: '<%=jhiPrefix%>-user-dialog',
    template: ''
})
export class UserDialogComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userModalService: UserModalService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['login'] ) {
                this.modalRef = this.userModalService.open(UserMgmtDialogComponent, params['login']);
            } else {
                this.modalRef = this.userModalService.open(UserMgmtDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
