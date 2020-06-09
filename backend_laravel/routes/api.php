<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Posts API
Route::get('/posts','PostController@index');
Route::get('/posts/{post}','PostController@show');
Route::post('/posts','PostController@store');
Route::put('/posts/{post}','PostController@update');
Route::delete('/posts/{post}','PostController@destroy');

// Test
Route::post('requestAndresponse', function(Request $request) {
    return response(['name'=>$request->username], 200)->header('Content-Type', 'application/json');
});