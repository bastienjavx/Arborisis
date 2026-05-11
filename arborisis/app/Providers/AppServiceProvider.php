<?php

namespace App\Providers;

use App\Events\DiscordNotification;
use App\Events\Gamification\ArborisisPointApproved;
use App\Events\Gamification\ArborisisPointSubmitted;
use App\Events\Gamification\ArborisisPointVisited;
use App\Events\Gamification\CommentPosted;
use App\Events\Gamification\PointReported;
use App\Events\Gamification\ProfileUpdated;
use App\Events\Gamification\SoundLiked;
use App\Events\Gamification\SoundListened;
use App\Events\Gamification\UserLoggedIn;
use App\Events\SoundPublished;
use App\Listeners\AwardMedals;
use App\Listeners\AwardMedalsOnPointApproved;
use App\Listeners\AwardMedalsOnSoundListened;
use App\Listeners\AwardXp;
use App\Listeners\CheckAchievements;
use App\Listeners\CheckAchievementsOnPointApproved;
use App\Listeners\CheckAchievementsOnPointSubmitted;
use App\Listeners\CheckAchievementsOnSoundListened;
use App\Listeners\CheckAchievementsOnSoundPublished;
use App\Listeners\CheckAchievementsOnProfileUpdated;
use App\Listeners\CheckAchievementsOnUserLoggedIn;
use App\Listeners\DispatchDiscordNotification;
use App\Listeners\NotifyDiscordOnRegistration;
use App\Listeners\SendNewSoundPushNotification;
use App\Listeners\UpdateQuestProgress;
use App\Listeners\UpdateQuestProgressOnCommentPosted;
use App\Listeners\UpdateQuestProgressOnPointApproved;
use App\Listeners\UpdateQuestProgressOnPointReported;
use App\Listeners\UpdateQuestProgressOnPointSubmitted;
use App\Listeners\UpdateQuestProgressOnSoundLiked;
use App\Listeners\UpdateQuestProgressOnSoundListened;
use App\Listeners\UpdateQuestProgressOnSoundPublished;
use App\Listeners\UpdateQuestProgressOnUserLoggedIn;
use Illuminate\Auth\Events\Registered;
use SocialiteProviders\Discord\DiscordExtendSocialite;
use SocialiteProviders\Manager\SocialiteWasCalled;
use App\Models\ArborisisPoint;
use App\Models\ContactTicket;
use App\Models\SoundFile;
use App\Models\User;
use App\Observers\SoundFileObserver;
use App\Observers\UserObserver;
use App\Models\ChatMessage;
use App\Models\ChatRoom;
use App\Policies\ArborisisPointPolicy;
use App\Policies\ChatMessagePolicy;
use App\Policies\ChatRoomPolicy;
use App\Policies\ContactTicketPolicy;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\RateLimiter;
use App\Services\Storage\SignedUrlService;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(SignedUrlService::class, function () {
            return new SignedUrlService(
                signingKey: config('services.r2.signing_key', ''),
                customDomain: rtrim(config('filesystems.disks.r2.url', ''), '/'),
            );
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        User::observe(UserObserver::class);
        SoundFile::observe(SoundFileObserver::class);

        Gate::policy(ArborisisPoint::class, ArborisisPointPolicy::class);
        Gate::policy(ContactTicket::class, ContactTicketPolicy::class);
        Gate::policy(ChatRoom::class, ChatRoomPolicy::class);
        Gate::policy(ChatMessage::class, ChatMessagePolicy::class);

        Event::listen(SoundPublished::class, SendNewSoundPushNotification::class);
        Event::listen(DiscordNotification::class, DispatchDiscordNotification::class);
        Event::listen(Registered::class, NotifyDiscordOnRegistration::class);
        Event::listen(SocialiteWasCalled::class, DiscordExtendSocialite::class);

        // Gamification listeners — Visits
        Event::listen(ArborisisPointVisited::class, UpdateQuestProgress::class);
        Event::listen(ArborisisPointVisited::class, CheckAchievements::class);
        Event::listen(ArborisisPointVisited::class, AwardXp::class);
        Event::listen(ArborisisPointVisited::class, AwardMedals::class);

        // Gamification listeners — Sound published
        Event::listen(SoundPublished::class, UpdateQuestProgressOnSoundPublished::class);
        Event::listen(SoundPublished::class, CheckAchievementsOnSoundPublished::class);

        // Gamification listeners — Point submitted / approved
        Event::listen(ArborisisPointSubmitted::class, UpdateQuestProgressOnPointSubmitted::class);
        Event::listen(ArborisisPointSubmitted::class, CheckAchievementsOnPointSubmitted::class);
        Event::listen(ArborisisPointApproved::class, UpdateQuestProgressOnPointApproved::class);
        Event::listen(ArborisisPointApproved::class, CheckAchievementsOnPointApproved::class);
        Event::listen(ArborisisPointApproved::class, AwardMedalsOnPointApproved::class);

        // Gamification listeners — Sound listened
        Event::listen(SoundListened::class, UpdateQuestProgressOnSoundListened::class);
        Event::listen(SoundListened::class, CheckAchievementsOnSoundListened::class);
        Event::listen(SoundListened::class, AwardMedalsOnSoundListened::class);

        // Gamification listeners — Social interactions
        Event::listen(SoundLiked::class, UpdateQuestProgressOnSoundLiked::class);
        Event::listen(CommentPosted::class, UpdateQuestProgressOnCommentPosted::class);
        Event::listen(PointReported::class, UpdateQuestProgressOnPointReported::class);

        // Gamification listeners — Login / streak
        Event::listen(UserLoggedIn::class, UpdateQuestProgressOnUserLoggedIn::class);
        Event::listen(UserLoggedIn::class, CheckAchievementsOnUserLoggedIn::class);

        // Gamification listeners — Profile
        Event::listen(ProfileUpdated::class, CheckAchievementsOnProfileUpdated::class);

        RateLimiter::for('discord', function () {
            return Limit::perMinute(60);
        });
    }
}
