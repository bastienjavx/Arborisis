@extends('mail.layouts.<redacted>', ['subject' => "Nouveau ticket — {$ticket->ticket_number}"])

@section('content')
<!-- Alert banner -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
        <td style="padding: 12px 20px; background: linear-gradient(135deg, rgba(212, 165, 116, 0.12) 0%, rgba(212, 165, 116, 0.04) 100%); border: 1px solid rgba(212, 165, 116, 0.2); border-radius: 12px; margin-bottom: 24px;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td width="28" valign="middle" style="padding-right: 12px;">
                        <div style="width: 28px; height: 28px; background-color: rgba(212, 165, 116, 0.15); border-radius: 50%; text-align: center; line-height: 28px; font-size: 14px;">🔔</div>
                    </td>
                    <td valign="middle">
                        <p style="margin: 0; font-family: 'DM Sans', system-ui, sans-serif; font-size: 13px; color: #D4A574; font-weight: 600;">Nouveau ticket de contact reçu</p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>

<!-- Spacer -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr><td style="height: 16px; font-size: 0; line-height: 0;">&nbsp;</td></tr>
</table>

<!-- Ticket number -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
        <td style="padding-bottom: 24px;">
            <h1 style="margin: 0; font-family: 'Cormorant', Georgia, serif; font-size: 32px; font-weight: 600; color: #F3F0E7; line-height: 1.2; letter-spacing: -0.01em;">
                Ticket {{ $ticket->ticket_number }}
            </h1>
            <p style="margin: 8px 0 0; font-family: 'DM Sans', system-ui, sans-serif; font-size: 14px; color: #8FA68E;">
                Créé le {{ $ticket->created_at->format('d/m/Y à H:i') }}
            </p>
        </td>
    </tr>
</table>

<!-- Details -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
        <td style="padding: 24px; background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 14px;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td style="padding-bottom: 16px;">
                        <p style="margin: 0 0 4px; font-family: 'DM Sans', system-ui, sans-serif; font-size: 11px; font-weight: 500; color: #8FA68E; letter-spacing: 0.08em; text-transform: uppercase;">Type</p>
                        <p style="margin: 0; font-family: 'DM Sans', system-ui, sans-serif; font-size: 15px; color: #F3F0E7; font-weight: 500;">
                            <span style="display: inline-block; padding: 4px 12px; background-color: rgba(52, 211, 153, 0.1); color: #34D399; border-radius: 9999px; font-size: 13px; font-weight: 500;">{{ $ticket->type->label() }}</span>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style="padding-bottom: 16px; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 16px;">
                        <p style="margin: 0 0 4px; font-family: 'DM Sans', system-ui, sans-serif; font-size: 11px; font-weight: 500; color: #8FA68E; letter-spacing: 0.08em; text-transform: uppercase;">De</p>
                        <p style="margin: 0; font-family: 'DM Sans', system-ui, sans-serif; font-size: 15px; color: #F3F0E7;">{{ $ticket->name }} &lt;{{ $ticket->email }}&gt;</p>
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
                        <p style="margin: 0 0 4px; font-family: 'DM Sans', system-ui, sans-serif; font-size: 11px; font-weight: 500; color: #8FA68E; letter-spacing: 0.08em; text-transform: uppercase;">Message</p>
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
            <a href="{{ url('/admin/contact-tickets/' . $ticket->id . '/edit') }}" style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #4A6741 0%, #5a7d4f 100%); color: #ffffff; font-family: 'DM Sans', system-ui, sans-serif; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 14px; letter-spacing: 0.01em;">Gérer le ticket</a>
        </td>
    </tr>
    </tr>
</table>
@endsection
