<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'key' => env('POSTMARK_API_KEY'),
    ],

    'resend' => [
        'key' => env('RESEND_API_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'stripe' => [
        'public_key' => env('STRIPE_PUBLIC_KEY'),
        'secret_key' => env('STRIPE_SECRET_KEY'),
        'webhook_secret' => env('STRIPE_WEBHOOK_SECRET'),
    ],

    'python' => [
        'path' => env('PYTHON_PATH', 'python3'),
        'timeout' => env('PYTHON_TIMEOUT', 300),
    ],

    'vapid' => [
        'subject' => env('VAPID_SUBJECT', 'mailto:contact@<redacted>.com'),
        'public_key' => env('VAPID_PUBLIC_KEY'),
        'private_key' => env('VAPID_PRIVATE_KEY'),
    ],

    'discord' => [
        'client_id' => env('DISCORD_CLIENT_ID'),
        'client_secret' => env('DISCORD_CLIENT_SECRET'),
        'redirect' => env('DISCORD_REDIRECT_URL', '/auth/discord/callback'),
        'bot_token' => env('DISCORD_BOT_TOKEN'),
        'guild_id' => env('DISCORD_GUILD_ID'),
        'bot_host' => env('DISCORD_BOT_HOST', '127.0.0.1'),
        'bot_port' => env('DISCORD_BOT_PORT', 3001),
        'internal_api_token' => env('DISCORD_INTERNAL_API_TOKEN'),
    ],

    'r2' => [
        'signing_key' => env('R2_SIGNING_KEY'),
    ],

    'analyzer' => [
        'url' => env('ANALYZER_URL'),
        'secret' => env('ANALYZER_SECRET'),
        'internal_api_token' => env('ANALYZER_INTERNAL_API_TOKEN'),
        'max_duration' => env('AUDIO_MAX_DURATION', 600),
        'max_file_size_mb' => env('AUDIO_MAX_FILE_SIZE_MB', 500),
    ],

];
