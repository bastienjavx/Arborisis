@extends('mail.layouts.arborisis', ['subject' => "Confirmation de réception — {$ticket->ticket_number}"])

@section('content')
<!-- Greeting -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
        <td style="padding-bottom: 24px;">
            <h1 style="margin: 0; font-family: 'Cormorant', Georgia, serif; font-size: 32px; font-weight: 600; color: #F3F0E7; line-height: 1.2; letter-spacing: -0.01em;">
                Votre demande est bien arrivée
            </h1>
            <p style="margin: 12px 0 0; font-family: 'DM Sans', system-ui, sans-serif; font-size: 16px; color: #8FA68E; line-height: 1.6;">
                Bonjour {{ $ticket->name }}, nous avons bien reçu votre message. Notre équipe vous répondra dans les plus brefs délais.
            </p>
        </td>
    </tr>
</table>

<!-- Ticket number highlight -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
        <td style="padding: 20px 24px; background-color: rgba(52, 211, 153, 0.08); border: 1px solid rgba(52, 211, 153, 0.15); border-radius: 14px;">
            <p style="margin: 0 0 4px; font-family: 'DM Sans', system-ui, sans-serif; font-size: 11px; font-weight: 500; color: #34D399; letter-spacing: 0.1em; text-transform: uppercase;">Numéro de suivi</p>
            <p style="margin: 0; font-family: 'JetBrains Mono', monospace; font-size: 20px; font-weight: 500; color: #34D399; letter-spacing: 0.02em;">{{ $ticket->ticket_number }}</p>
        </td>
    </tr>
</table>

<!-- Spacer -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr><td style="height: 24px; font-size: 0; line-height: 0;">&nbsp;</td></tr>
</table>

<!-- Details -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
        <td style="padding: 24px; background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 14px;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td style="padding-bottom: 16px;">
                        <p style="margin: 0 0 4px; font-family: 'DM Sans', system-ui, sans-serif; font-size: 11px; font-weight: 500; color: #8FA68E; letter-spacing: 0.08em; text-transform: uppercase;">Type de demande</p>
                        <p style="margin: 0; font-family: 'DM Sans', system-ui, sans-serif; font-size: 15px; color: #F3F0E7; font-weight: 500;">{{ $ticket->type->label() }}</p>
                    </td>
                </tr>
                <tr>
                    <td style="padding-bottom: 16px; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 16px;">
                        <p style="margin: 0 0 4px; font-family: 'DM Sans', system-ui, sans-serif; font-size: 11px; font-weight: 500; color: #8FA68E; letter-spacing: 0.08em; text-transform: uppercase;">Sujet</p>
                        <p style="margin: 0; font-family: 'DM Sans', system-ui, sans-serif; font-size: 15px; color: #F3F0E7;">{{ $ticket->subject }}</p>
                    </td>
                </tr>
                <tr>
                    <td style="border-top: 1px solid rgba(255,255,255,0.06); padding-top: 16px;">
                        <p style="margin: 0 0 4px; font-family: 'DM Sans', system-ui, sans-serif; font-size: 11px; font-weight: 500; color: #8FA68E; letter-spacing: 0.08em; text-transform: uppercase;">Votre message</p>
                        <p style="margin: 0; font-family: 'DM Sans', system-ui, sans-serif; font-size: 15px; color: #E8E4D9; line-height: 1.6; white-space: pre-line;">{{ $ticket->message }}</p>
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
            <a href="{{ url('/contact') }}" style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #4A6741 0%, #5a7d4f 100%); color: #ffffff; font-family: 'DM Sans', system-ui, sans-serif; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 14px; letter-spacing: 0.01em;">Retour au site</a>
        </td>
    </tr>
</table>

<!-- Closing note -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
        <td style="padding-top: 24px;">
            <p style="margin: 0; font-family: 'DM Sans', system-ui, sans-serif; font-size: 13px; color: #8FA68E; line-height: 1.6; font-style: italic;">
                Merci de ne pas répondre directement à cet e-mail. Pour toute question, contactez-nous via notre formulaire avec votre numéro de suivi.
            </p>
        </td>
    </tr>
</table>
@endsection
