<%#
Copyright 2013-2018 the original author or authors from the JHipster project.

This file is part of the JHipster project, see http://www.jhipster.tech/
for more information.

Licensed under the Apache License, Version 2.0(the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-%>
import { SpyObject } from './spyobject';
import { StateStorageService } from 'app/core/auth/state-storage.service';
import Spy = jasmine.Spy;

export class MockStateStorageService extends SpyObject {

    getUrlSpy: Spy;
    storeUrlSpy: Spy;

    constructor() {
        super(StateStorageService);
        this.setUrlSpy({});
        this.storeUrlSpy = this.spy('storeUrl').andReturn(this);
    }

    setUrlSpy(json) {
        this.getUrlSpy = this.spy('getUrl').andReturn(json);
    }

    setResponse(json: any): void {
        this.setUrlSpy(json);
    }
}
