<?php

namespace App\Providers;

use App\Hashing\Md5Hasher;
use Illuminate\Support\ServiceProvider;
use Illuminate\Hashing\HashManager;

class Md5HashServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->extend('hash', function ($hash, $app) {
            if (!$hash instanceof HashManager) {
                $hash = new HashManager($app);
            }

            $hash->extend('md5', function () {
                return new Md5Hasher();
            });

            return $hash;
        });
    }
} 