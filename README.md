# Alem-i İslam Mitgliederdatenerfassung

Webseite zur Erfassung und Verifizierung von Mitgliederdaten für EasyVerein.

## Features

✅ **Mitglied-Formular**: Name, Email, Telefon, Adresse erfassen
✅ **QR-Code**: Zum einfachen Teilen des Links
✅ **Admin-Dashboard**: Übersicht aller Mitglieder (passwortgeschützt)
✅ **EasyVerein-Sync**: Automatische Synchronisierung mit EasyVerein API
✅ **Bestätigungsmails**: Automatische Emails an Mitglieder
✅ **CSV-Export**: Daten als CSV exportieren
✅ **Responsive Design**: Mobile-freundlich

## Deployment auf Vercel

### Schritt 1: Repository erstellen

```bash
cd /home/claude
git init
git add .
git commit -m "Initial commit"
```

Oder direkt in Vercel hochladen:
1. Gehe zu https://vercel.com/new
2. Wähle "Import Git Repository"
3. Verbinde dein GitHub-Repository

### Schritt 2: Umgebungsvariablen setzen

In Vercel Dashboard unter "Settings" → "Environment Variables":

```
ADMIN_PASSWORD=DEIN_SICHERES_PASSWORT_HIER
EASYVEREIN_API_TOKEN=93967756ed917c4c0a107b4540af8f328ec4b505
SMTP_USER=egitim@alemiislam.de
SMTP_PASSWORD=DEIN_SMTP_PASSWORT_HIER
NODE_ENV=production
```

### Schritt 3: Domain verbinden

1. In Vercel: "Settings" → "Domains"
2. Subdomain `mitglieder.alemiislam.de` hinzufügen
3. DNS-Records aktualisieren

### Schritt 4: Deploy starten

```bash
vercel deploy
```

## Umgebungsvariablen erklärt

| Variable | Beschreibung | Beispiel |
|----------|-------------|---------|
| `ADMIN_PASSWORD` | Sicheres Passwort für Admin-Dashboard | `SecurePass123!` |
| `EASYVEREIN_API_TOKEN` | Bearer-Token für EasyVerein API | `93967756...` |
| `SMTP_USER` | Email-Adresse zum Versand | `egitim@alemiislam.de` |
| `SMTP_PASSWORD` | Passwort für SMTP-Server | `YourPassword` |
| `NODE_ENV` | Environment (production/development) | `production` |

## API-Endpoints

### POST `/api/members?action=save-member`
Speichert oder aktualisiert Mitgliederdaten

**Body:**
```json
{
  "firstName": "Ahmet",
  "lastName": "Kaya",
  "email": "ahmet@example.com",
  "phone": "+49 1234 567890",
  "street": "Hauptstraße 42",
  "postalCode": "67059",
  "city": "Ludwigshafen"
}
```

### GET `/api/members?action=get-members&password=PASSWORT`
Ruft alle Mitglieder ab (Authentifizierung erforderlich)

### POST `/api/members?action=sync-easyverein`
Synchronisiert mit EasyVerein API

**Body:**
```json
{
  "password": "ADMIN_PASSWORT"
}
```

## Lokale Entwicklung

```bash
npm install
npm run dev
```

Öffne http://localhost:3000

## Technologie-Stack

- **Frontend**: React 18 + Next.js 14
- **Styling**: CSS Modules
- **QR-Code**: qrcode.react
- **API**: Vercel Serverless Functions
- **EasyVerein**: REST API v1.7
- **Hosting**: Vercel

## Datenspeicherung

Aktuell: In-Memory Database (verloren nach Neustart)
Empfohlen: PostgreSQL oder MongoDB für Produktion

## Sicherheit

⚠️ **Wichtig**: 
- Admin-Passwort wird nur in Umgebungsvariablen gespeichert
- Alle API-Calls müssen über HTTPS erfolgen
- Passwort sollte regelmäßig gewechselt werden
- EasyVerein-Token sollte nur in Vercel-Secrets gespeichert sein

## Support

Bei Fragen oder Problemen: egitim@alemiislam.de
