<?php

declare(strict_types=1);

namespace App\Enums;

enum MetricType: string
{
    case BiodiversityScore = 'biodiversity_score';
    case AcousticActivityScore = 'acoustic_activity_score';
    case TemporalChangeScore = 'temporal_change_score';
    case SpeciesPresenceTrend = 'species_presence_trend';
    case HabitatSoundProfile = 'habitat_sound_profile';
    case SeasonalComparison = 'seasonal_comparison';
    case TimeOfDayModel = 'time_of_day_model';
    case AnomalyDetection = 'anomaly_detection';

    public function label(): string
    {
        return match ($this) {
            self::BiodiversityScore => 'Score de biodiversité sonore',
            self::AcousticActivityScore => 'Score d\'activité acoustique',
            self::TemporalChangeScore => 'Score de changement temporel',
            self::SpeciesPresenceTrend => 'Tendance de présence d\'espèce',
            self::HabitatSoundProfile => 'Profil sonore d\'habitat',
            self::SeasonalComparison => 'Comparaison saisonnière',
            self::TimeOfDayModel => 'Modèle horaire',
            self::AnomalyDetection => 'Détection d\'anomalie',
        };
    }
}
