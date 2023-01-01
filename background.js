// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

//Sending Instagram Request Headers to API

chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    console.log(details.requestHeaders) //returns data object of Request Headers
    
    var dict = {} //empty dictionary
    for (var i = 0; i < details.requestHeaders.length; i = i + 1) {
      var list = Object.values(details.requestHeaders[i])
      dict[list[0]] = list[1] //adds each header into dictionary for appropriate key, value
    }

    fetch("http://localhost:3000/api/headers", {
      method: "POST",
      body: JSON.stringify({"data": dict}),
    }).then(res =>{
        if (res.status === 201){
        // SUCCESS
        }
        else{
        // ERROR
     }
    })
    return {requestHeaders: details.requestHeaders}    
  },
  // filters
  {urls: ['https://instagram.com/*']},
  // extraInfoSpec
  ['requestHeaders', 'extraHeaders']);

  

  