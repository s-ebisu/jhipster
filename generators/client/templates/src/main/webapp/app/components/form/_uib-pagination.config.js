(function() {
    'use strict';

    angular
        .module('<%=angularAppName%>')
        .config(function (uibPaginationConfig, paginationConstants) {
            uibPaginationConfig.itemsPerPage = paginationConstants.itemsPerPage;
            uibPaginationConfig.maxSize = 5;
            uibPaginationConfig.boundaryLinks = true;
            uibPaginationConfig.firstText = '«';
            uibPaginationConfig.previousText = '‹';
            uibPaginationConfig.nextText = '›';
            uibPaginationConfig.lastText = '»';
        });
})();
