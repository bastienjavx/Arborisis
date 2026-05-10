@extends('mail.layouts.arborisis', ['subject' => 'Bienvenue dans la communauté Arborisis'])

@section('content')
<!-- Hero illustration -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
        <td style="text-align: center; padding-bottom: 24px;">
            <div style="display: inline-block; width: 64px; height: 64px; background: linear-gradient(135deg, rgba(52, 211, 153, 0.15) 0%, rgba(212, 165, 116, 0.15) 100%); border-radius: 50%; text-align: center; line-height: 64px; font-size: 28px;">🌿</div>
        </td>
    </tr>
</table>

<!-- Greeting -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
        <td style="text-align: center; padding-bottom: 24px;">
            <h1 style="margin: 0; font-family: 'Cormorant', Georgia, serif; font-size: 36px; font-weight: 600; color: #F3F0E7; line-height: 1.2; letter-spacing: -0.01em;">
                Bienvenue
            </h1>
            <p style="margin: 12px 0 0; font-family: 'DM Sans', system-ui, sans-serif; font-size: 16px; color: #8FA68E; line-height: 1.6;">
                Vous faites désormais partie de la communauté Arborisis.
            </p>
        </td>
    </tr>
</table>

<!-- Divider -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
        <td style="padding: 8px 0 24px; text-align: center;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="60" style="margin: 0 auto;">
                <tr>
                    <td style="height: 2px; background-color: #34D399; font-size: 0; line-height: 0;">&nbsp;</td>
                </tr>
            </table>
        </td>
    </tr>
</table>

<!-- Body -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
        <td style="padding-bottom: 24px;">
            <p style="margin: 0 0 16px; font-family: 'DM Sans', system-ui, sans-serif; font-size: 16px; color: #E8E4D9; line-height: 1.7;">
                Merci de votre confiance. Vous serez parmi les premiers informés des nouveaux enregistrements, des événements et des actualités de notre communauté de field recording.
            </p>
            <p style="margin: 0; font-family: 'DM Sans', system-ui, sans-serif; font-size: 16px; color: #E8E4D9; line-height: 1.7;">
                <em style="color: #8FA68E;">"Silence is not empty. It is full of answers."</em>
            </p>
        </td>
    </tr>
</table>

<!-- Features -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
        <td style="padding: 20px; background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 14px;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td style="padding-bottom: 12px;">
                        <p style="margin: 0; font-family: 'DM Sans', system-ui, sans-serif; font-size: 14px; color: #F3F0E7; font-weight: 500;">
                            <span style="color: #34D399; margin-right: 8px;">◆</span> Nouveaux sons chaque semaine
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style="padding-bottom: 12px;">
                        <p style="margin: 0; font-family: 'DM Sans', system-ui, sans-serif; font-size: 14px; color: #F3F0E7; font-weight: 500;">
                            <span style="color: #34D399; margin-right: 8px;">◆</span> Découvertes de créateurs
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p style="margin: 0; font-family: 'DM Sans', system-ui, sans-serif; font-size: 14px; color: #F3F0E7; font-weight: 500;">
                            <span style="color: #34D399; margin-right: 8px;">◆</span> Actualités de la communauté
                        </p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>

<!-- Spacer -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr><td style="height: 24px; font-size: 0; line-height: 0;">&nbsp;</td></tr>
</table>

<!-- CTA -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
        <td style="text-align: center;">
            <a href="{{ url('/sounds') }}" style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #4A6741 0%, #5a7d4f 100%); color: #ffffff; font-family: 'DM Sans', system-ui, sans-serif; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 14px; letter-spacing: 0.01em;">Explorer les sons</a>
        </td>
    </tr>
</table>

<!-- Unsubscribe note -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
        <td style="padding-top: 32px;">
            <p style="margin: 0; font-family: 'DM Sans', system-ui, sans-serif; font-size: 12px; color: #8FA68E; opacity: 0.6; line-height: 1.5; text-align: center;">
                Vous pouvez vous désinscrire à tout moment via <a href="{{ $unsubscribeUrl }}" style="color: #8FA68E; text-decoration: underline;">ce lien</a>.
            </p>
        </td>
    </tr>
</table>
@endsection
