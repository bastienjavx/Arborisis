<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Wiki.js OAuth2 SSO Configuration
    |--------------------------------------------------------------------------
    */

    'oauth_redirect_uri' => env('WIKI_OAUTH_REDIRECT_URI', 'https://wiki.<redacted>.com/login/oauth2/callback'),
    'oauth_client_id' => env('WIKI_AUTH_OAUTH2_CLIENT_ID', '<redacted>-wiki'),
    'oauth_client_secret' => env('WIKI_AUTH_OAUTH2_CLIENT_SECRET'),
    'oauth_secret' => env('WIKI_OAUTH_SECRET'),
];
