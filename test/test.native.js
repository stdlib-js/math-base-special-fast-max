/**
* @license Apache-2.0
*
* Copyright (c) 2024 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var resolve = require( 'path' ).resolve;
var tape = require( 'tape' );
var isnan = require( '@stdlib/math-base-assert-is-nan' );
var isNegativeZero = require( '@stdlib/math-base-assert-is-negative-zero' );
var isPositiveZero = require( '@stdlib/math-base-assert-is-positive-zero' );
var PINF = require( '@stdlib/constants-float64-pinf' );
var tryRequire = require( '@stdlib/utils-try-require' );


// VARIABLES //

var max = tryRequire( resolve( __dirname, './../lib/native.js' ) );
var opts = {
	'skip': ( max instanceof Error )
};


// TESTS //

tape( 'main export is a function', opts, function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof max, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function has an arity of 2', opts, function test( t ) {
	t.strictEqual( max.length, 2, 'accepts two arguments' );
	t.end();
});

tape( 'the function may not return `NaN` if provided a `NaN`', opts, function test( t ) {
	var v;

	v = max( NaN, 3.14 );
	t.strictEqual( v, 3.14, 'returns expected value' );

	v = max( 3.14, NaN );
	t.strictEqual( isnan( v ), true, 'returns expected value' );

	t.end();
});

tape( 'the function returns `+infinity` if provided `+infinity`', opts, function test( t ) {
	var v;

	v = max( PINF, 3.14 );
	t.strictEqual( v, PINF, 'returns expected value' );

	v = max( 3.14, PINF );
	t.strictEqual( v, PINF, 'returns expected value' );

	t.end();
});

tape( 'the function may not return a correctly signed zero', opts, function test( t ) {
	var v;

	v = max( +0.0, -0.0 );
	t.strictEqual( isNegativeZero( v ), true, 'returns expected value' );

	v = max( -0.0, +0.0 );
	t.strictEqual( isNegativeZero( v ), false, 'returns expected value' );

	v = max( -0.0, -0.0 );
	t.strictEqual( isNegativeZero( v ), true, 'returns expected value' );

	v = max( +0.0, +0.0 );
	t.strictEqual( isPositiveZero( v ), true, 'returns expected value' );

	t.end();
});

tape( 'the function returns the maximum value', opts, function test( t ) {
	var v;

	v = max( 4.2, 3.14 );
	t.strictEqual( v, 4.2, 'returns expected value' );

	v = max( -4.2, 3.14 );
	t.strictEqual( v, 3.14, 'returns expected value' );

	t.end();
});
