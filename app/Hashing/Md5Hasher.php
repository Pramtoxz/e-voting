<?php

namespace App\Hashing;

use Illuminate\Contracts\Hashing\Hasher;
use RuntimeException;

class Md5Hasher implements Hasher
{
    public function info($hashedValue)
    {
        return [];
    }

    public function make($value, array $options = [])
    {
        return md5($value);
    }

    public function check($value, $hashedValue, array $options = [])
    {
        return md5($value) === $hashedValue;
    }

    public function needsRehash($hashedValue, array $options = [])
    {
        return false;
    }
} 