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

var _ = require('underscore');
var Notifier = DT.lib.Notifier;
var kt = require('knights-templar');
var ListPalette = DT.lib.ListPalette;
var JarAppsPalette = ListPalette.extend({

    events: {
        'click .launchApp': 'launchApps',
        'click .inspectItem': 'inspectApp',
        'click .launchAppProps': 'launchAppProps'
    },
    
    launchApps: function(evt) {
        
        var selected = this.getSelected();

        if (!selected || !selected.length) return;
        
        $(evt.target).prop('disabled', true);
        
        _.each(selected, function(app) {
            app.launch();
        });
    },

    launchAppProps: function(evt) {

        evt.preventDefault();
        var selected = this.getSelected();
        if (!selected || selected.length !== 1) return;
        selected[0].launch(true);
    },
    
    template: kt.make(__dirname+'/JarAppsPalette.html','_')
    
});
exports = module.exports = JarAppsPalette;