import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgJhipsterModule } from 'ng-jhipster';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';

@NgModule({
    imports: [
        NgbModule.forRoot(),
        // TODO uncomment the code below and make it works with AOT
        NgJhipsterModule/*.forRoot({
            <%_ if (enableTranslation) { _%>
            i18nEnabled: true,
            defaultI18nLang: '<%= nativeLanguage %>'
            <%_ } _%>
        })*/,
        InfiniteScrollModule
    ],
    exports: [
        FormsModule,
        HttpModule,
        CommonModule,
        NgbModule,
        NgJhipsterModule,
        InfiniteScrollModule
    ]
})
export class <%=angular2AppName%>SharedLibsModule {}
