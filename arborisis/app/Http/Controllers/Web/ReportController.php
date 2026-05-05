<?php

declare(strict_types=1);

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\Report\StoreReportRequest;
use App\Models\Comment;
use App\Models\Report;
use App\Models\Sound;
use Illuminate\Http\RedirectResponse;

class ReportController extends Controller
{
    public function store(StoreReportRequest $request): RedirectResponse
    {
        $this->authorize('create', Report::class);

        $reportableType = $request->input('reportable_type');
        $reportableId = $request->input('reportable_id');

        $reportable = match ($reportableType) {
            'sound' => Sound::findOrFail($reportableId),
            'comment' => Comment::findOrFail($reportableId),
            default => throw new \InvalidArgumentException('Type de signalement invalide.'),
        };

        Report::create([
            'reporter_id' => $request->user()->id,
            'reportable_type' => get_class($reportable),
            'reportable_id' => $reportable->id,
            'reason' => $request->input('reason'),
            'description' => $request->input('description'),
        ]);

        return back()->with('success', 'Signalement envoyé. Notre équipe de modération l\'examinera sous peu.');
    }
}
