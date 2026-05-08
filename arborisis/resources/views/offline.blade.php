<!DOCTYPE html>
<html lang="fr" class="dark">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#0B1220">
    <title>Hors ligne — Arborisis</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap" rel="stylesheet">
    <style>
        :root {
            --arbor-night: #0B1220;
            --arbor-deep: #111D2E;
            --arbor-charcoal: #1A2636;
            --arbor-cream: #E8E4DC;
            --arbor-sage: #9BA8A0;
            --arbor-emerald: #34D399;
            --arbor-moss: #4A6741;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'DM Sans', sans-serif;
            background: var(--arbor-night);
            color: var(--arbor-cream);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }
        .container {
            text-align: center;
            max-width: 400px;
        }
        .icon {
            width: 80px;
            height: 80px;
            margin: 0 auto 1.5rem;
            color: var(--arbor-emerald);
        }
        h1 {
            font-family: 'Cormorant', serif;
            font-size: 2rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
        }
        p {
            color: var(--arbor-sage);
            line-height: 1.6;
            margin-bottom: 2rem;
        }
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 0.75rem 1.5rem;
            background: var(--arbor-emerald);
            color: var(--arbor-night);
            font-weight: 500;
            border-radius: 0.75rem;
            text-decoration: none;
            transition: opacity 0.2s;
        }
        .btn:hover { opacity: 0.9; }
    </style>
</head>
<body>
    <div class="container">
        <svg class="icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2C16 2 8 8 8 16C8 20.4183 11.5817 24 16 24C20.4183 24 24 20.4183 24 16C24 8 16 2 16 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <path d="M16 24V30" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M12 28H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <circle cx="16" cy="14" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/>
        </svg>
        <h1>Hors ligne</h1>
        <p>Il semble que vous n'êtes pas connecté à Internet. Vérifiez votre connexion et réessayez.</p>
        <a href="/" class="btn">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Réessayer
        </a>
    </div>
</body>
</html>
