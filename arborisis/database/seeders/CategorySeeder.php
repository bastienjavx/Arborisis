<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Forêt', 'slug' => 'foret', 'description' => 'Sons de forêts, bois et sous-bois', 'color' => '#4A6741', 'icon' => 'tree', 'order' => 1],
            ['name' => 'Océan', 'slug' => 'ocean', 'description' => 'Vagues, marées et ambiances marines', 'color' => '#3B82F6', 'icon' => 'wave', 'order' => 2],
            ['name' => 'Montagne', 'slug' => 'montagne', 'description' => 'Cimes, échos et ambiances alpines', 'color' => '#78716C', 'icon' => 'mountain', 'order' => 3],
            ['name' => 'Rivière', 'slug' => 'riviere', 'description' => 'Cours d\'eau, cascades et ruisseaux', 'color' => '#06B6D4', 'icon' => 'water', 'order' => 4],
            ['name' => 'Pluie', 'slug' => 'pluie', 'description' => 'Averses, orages et gouttes', 'color' => '#6366F1', 'icon' => 'cloud-rain', 'order' => 5],
            ['name' => 'Aube', 'slug' => 'aube', 'description' => 'Le réveil de la nature au petit matin', 'color' => '#F59E0B', 'icon' => 'sunrise', 'order' => 6],
            ['name' => 'Crépuscule', 'slug' => 'crepuscule', 'description' => 'Ambiances du soir et crépuscule', 'color' => '#D97706', 'icon' => 'sunset', 'order' => 7],
            ['name' => 'Nuit', 'slug' => 'nuit', 'description' => 'Chants nocturnes et silence de la nuit', 'color' => '#1E1B4B', 'icon' => 'moon', 'order' => 8],
            ['name' => 'Nature urbaine', 'slug' => 'nature-urbaine', 'description' => 'Parcs, jardins et espaces verts en ville', 'color' => '#10B981', 'icon' => 'building', 'order' => 9],
            ['name' => 'Zone humide', 'slug' => 'zone-humide', 'description' => 'Marais, étangs et milieux humides', 'color' => '#0D9488', 'icon' => 'droplet', 'order' => 10],
            ['name' => 'Désert', 'slug' => 'desert', 'description' => 'Silences, vents et ambiances arides', 'color' => '#D4A373', 'icon' => 'sun', 'order' => 11],
            ['name' => 'Prairie', 'slug' => 'prairie', 'description' => 'Champs, steppes et plaines herbeuses', 'color' => '#84CC16', 'icon' => 'wind', 'order' => 12],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
