import requests

# Deine Zotero-API-Details
ZOTERO_USER_ID = '16288101'  # Ersetze mit deiner Zotero User-ID
ZOTERO_API_KEY = 'P6McbI9lnxpuR8A45NkSpyuQ'  # Ersetze mit deinem Zotero API-Schlüssel
LIBRARY_ID = ZOTERO_USER_ID  # Dies ist normalerweise deine User-ID
API_URL = f'https://api.zotero.org/users/{LIBRARY_ID}/items'

# Dateipfad der .txt-Datei mit den URLs
TXT_FILE_PATH = 'links.txt'  # Ersetze dies mit dem Pfad deiner Datei

# Funktion zum Hinzufügen eines Links als Webseite in Zotero
def add_link_to_zotero(url, index):
    headers = {
        'Zotero-API-Key': ZOTERO_API_KEY,
        'Content-Type': 'application/json'
    }

    # Generiere den fortlaufenden Schlüssel im Format URLNL01, URLNL02, ...
    key = f"URLNL{index:02d}"

    # Erstelle das JSON-Datenformat, das Zotero erwartet
    data = {
        "itemType": "webpage",
        "title": url,  # Optional: Du kannst hier auch eine andere Titel-Logik einbauen
        "url": url,
        "accessDate": "2025-01-30T00:00:00Z",  # Optional: Du kannst das Zugriffsdatum anpassen
        "key": key  # Setze den benutzerdefinierten Schlüssel
    }

    # POST-Anfrage an die Zotero API
    response = requests.post(API_URL, json=[data], headers=headers)

    if response.status_code == 200:
        print(f"Link erfolgreich hinzugefügt: {url} mit Schlüssel {key}")
    else:
        print(f"Fehler beim Hinzufügen des Links: {url} - {response.status_code}")

# Funktion zum Auslesen der Links aus der .txt-Datei
def read_links_from_file():
    with open(TXT_FILE_PATH, 'r') as file:
        links = file.readlines()
    return [link.strip() for link in links]

# Hauptfunktion
def main():
    links = read_links_from_file()
    for index, link in enumerate(links, start=1):
        add_link_to_zotero(link, index)

if __name__ == "__main__":
    main()