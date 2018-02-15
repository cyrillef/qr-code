//
// Copyright (c) Autodesk, Inc. All rights reserved
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
//
// Forge ARKit
// by Cyrille Fauvel - Autodesk Developer Network (ADN)
//
'use strict'; // http://www.w3schools.com/js/js_strict.asp

var express =require ('express') ;
var request =require ('request') ;

var router =express.Router () ;


// QR code decoder
var request =require ('request') ;
var bodyParser =require ('body-parser') ;
var bp =bodyParser.raw ({ type: 'application/octet-stream', limit: '10mb' }) ;
router.put ('/qrcode', bp, function (req, res) {
	//var result =kxing.getReader ().decode (imageData) ;
	var formData = {
		f: req.body
	} ;

	request.post (
		{
			url: 'http://zxing.org/w/decode',
			formData: formData
		},
		function (err, httpResponse, bodyResponse) {
			if ( err || bodyResponse.indexOf ('<title>Decode Succeeded</title>') == -1 ) {
				console.error ('upload failed:', err) ;
				res.status (500).end () ;
				return ;
			}
			//console.log ('Upload successful!  Server responded with:', body) ;
			var pattern =/<td>Parsed Result<\/td><td><pre>(.*)<\/pre><\/td>/g ;
			var sts =pattern.exec (bodyResponse) ;
			var json =sts [1] ;
			try {
				json =JSON.parse (json) ;
			} catch ( ex ) {
				json ={} ;
			}

			res.json (json) ;
		}
	) ;
}) ;

module.exports =router ;
