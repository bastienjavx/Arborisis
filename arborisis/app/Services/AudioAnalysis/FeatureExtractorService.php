<?php

declare(strict_types=1);

namespace App\Services\AudioAnalysis;

use App\Models\SoundAnalysis;

class FeatureExtractorService
{
    public function getTemporalFeatures(SoundAnalysis $analysis): array
    {
        return $analysis->features_json['temporal'] ?? [];
    }

    public function getSpectralFeatures(SoundAnalysis $analysis): array
    {
        return $analysis->features_json['spectral'] ?? [];
    }

    public function getCepstralFeatures(SoundAnalysis $analysis): array
    {
        return $analysis->features_json['cepstral'] ?? [];
    }

    public function getAllFeatures(SoundAnalysis $analysis): array
    {
        return $analysis->features_json ?? [];
    }

    /**
     * Retourne un résumé public des features pour l'aperçu visiteur.
     */
    public function getPublicSummary(SoundAnalysis $analysis): array
    {
        $features = $analysis->features_json ?? [];
        $temporal = $features['temporal'] ?? [];
        $spectral = $features['spectral'] ?? [];

        return [
            'duration_seconds' => $temporal['duration_seconds'] ?? null,
            'rms_mean' => $temporal['rms']['stats']['mean'] ?? null,
            'zcr_mean' => $temporal['zcr']['stats']['mean'] ?? null,
            'centroid_mean' => $spectral['centroid']['stats']['mean'] ?? null,
            'bandwidth_mean' => $spectral['bandwidth']['stats']['mean'] ?? null,
            'rolloff_mean' => $spectral['rolloff']['stats']['mean'] ?? null,
        ];
    }
}
