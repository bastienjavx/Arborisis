<?php

declare(strict_types=1);

return [
    'icy_metaint' => env('RADIO_ICY_METAINT', 8192),
    'chunk_size' => env('RADIO_CHUNK_SIZE', 8192),
    'crossfade_enabled' => env('RADIO_CROSSFADE_ENABLED', false),
    'fallback_sounds' => array_filter(explode(',', env('RADIO_FALLBACK_SOUNDS', ''))),
    'history_limit' => env('RADIO_HISTORY_LIMIT', 20),
    'playlist_shuffle' => env('RADIO_PLAYLIST_SHUFFLE', true),
    'temp_url_ttl_minutes' => env('RADIO_TEMP_URL_TTL', 60),
    'silence_file' => env('RADIO_SILENCE_FILE', null),
    'loop' => env('RADIO_LOOP', true),
    'gap_ms' => env('RADIO_GAP_MS', 500),
];
