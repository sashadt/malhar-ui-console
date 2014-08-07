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

var httpProxy = require('http-proxy');
var config = require('./config');

// Set up the proxy that goes to the gateway
var proxy = httpProxy.createProxyServer({
  target: {
    host: config.gateway.host,
    port: config.gateway.port
  }
});

function gateway(req, res, next) {
  // proxy Gateway REST API calls
  if (req.originalUrl.indexOf('/ws/') === 0) {
    proxy.proxyRequest(req, res);
  } else {
    next();
  }
}

module.exports = gateway;
