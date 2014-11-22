/*
 * Copyright (c) 2014 DataTorrent, Inc. ALL Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var BaseView = require('./UploadFilesView');
var Notifier = require('./Notifier');

/**
 * UploadLicenseView
 *
 * View in License Step for uploading license file.
 *
 */
var UploadLicenseView = BaseView.extend({

    multiple: false,

    uploadBtnConfirm: 'upload',

    uploadBtnCancel: 'cancel',

    uploadTitle: 'Drag and drop the License file here',

    uploadText: '(or click to select it)',

    fileChangeCheck: function(file) {
        return true;
    }

});

exports = module.exports = UploadLicenseView;