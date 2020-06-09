<?php

use Faker\Generator as Faker;

$factory->define(App\Post::class, function (Faker $faker) {
    return [
        'user_id' => App\User::find(random_int(1 , 15))->id,
        'title' => $faker->sentence($nbWords = 6, $variableNbWords = true),
        'description' => $faker->sentences($nb = 3, $asText = true),
        'content' => $faker->realText($maxNbChars = 200, $indexSize = 2)
    ];
});
