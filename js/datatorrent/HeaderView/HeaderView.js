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
var kt = require('knights-templar');
var BaseView = require('bassview');
var Notifier = require('../Notifier');

// modals
var LicenseModal = require('../LicenseModalView');
var GatewayInfoModal = require('../GatewayInfoModalView');
var ConsoleModal = require('../ConsoleInfoModalView');

/**
 * Header View
 * 
 * The top bar of the UI.
 * Contains platform/client logo, mode switch
 * (development/operations), sign in
*/
var Header = BaseView.extend({
    
    UIVersion: '',
    
    initialize: function(options) {
        
        this.license = options.license;
        this.user = options.user;
        this.listenTo(this.model.modes, "change:active", this.render );
        this.listenTo(this.license.get('agent'), 'sync', this.render);
        this.listenTo(this.user, 'sync', this.render);
    },
    
    events: {
        'click .displayLicenseInfo': 'displayLicenseInfo',
        'click .displayGatewayInfo': 'displayGatewayInfo',
        'click .displayConsoleInfo': 'displayConsoleInfo',
        'click .logoutUser'        : 'logoutUser'
    },

    displayGatewayInfo: function(e) {
        e.preventDefault();
        if (!this.gatewayInfoModal) {
            this.gatewayInfoModal = new GatewayInfoModal({});
            this.gatewayInfoModal.addToDOM();
        }
        this.gatewayInfoModal.launch();
    },

    displayLicenseInfo: function(e) {
        e.preventDefault();
        if (!this.licenseModal) {
            this.licenseModal = new LicenseModal({ model: this.license });
            this.licenseModal.addToDOM();
        }
        this.licenseModal.launch();
    },

    displayConsoleInfo: function(e) {
        e.preventDefault();
        if (!this.consoleModal) {
            this.consoleModal = new ConsoleModal({});
            this.consoleModal.addToDOM();
        }
        this.consoleModal.launch();  
    },

    logoutUser: function(e) {
        e.preventDefault();
        var promise = this.user.logout();
        promise.done(function() {
            window.location.reload();
        })
        .fail(function(xhr, errorThrown, responseText) {
            Notifier.error({
                title: 'An error occurred logging out',
                text: 'Response from server: (' + xhr.status + ') ' + responseText
            });
        });
    },
    
    render: function() {
        var markup = this.template({
            modes: this.model.modes.toJSON(),
            client_logo: "client_logo_hadoop.jpg",
            license: this.license.toJSON(),
            user: this.user.toJSON()
        });
        this.$el.html(markup);
        this.$el.addClass('navbar-fixed-top').addClass('navbar');
        return this;
    },

    template: kt.make(__dirname+'/HeaderView.html', '_')
});
exports = module.exports = Header