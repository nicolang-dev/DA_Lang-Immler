import re
import requests
from bs4 import BeautifulSoup
from datetime import date

# Funktion zum Extrahieren des Jahres aus einer URL
def extract_year_from_url(url):
    try:
        # HTTP-Anfrage an die URL senden und den HTML-Inhalt abrufen
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')

        # Versuch, das Jahr aus den Meta-Tags oder dem Text zu extrahieren
        # Beispielsweise, viele Seiten haben ein Veröffentlichungsjahr im Title-Tag
        title_text = soup.title.text if soup.title else ""
        year_match = re.search(r'\b(\d{4})\b', title_text)

        if year_match:
            return year_match.group(1)  # Gibt das gefundene Jahr zurück
        else:
            return str(date.today().year)  # Fallback: aktuelles Jahr, wenn kein Jahr gefunden
    except Exception as e:
        print(f"Fehler beim Abrufen des Jahres für {url}: {e}")
        return str(date.today().year)  # Fallback auf das aktuelle Jahr

# Funktion zum Erstellen eines BibTeX-Eintrags
def create_bibtex_entry(url, index, title="URLPI03", journal="REST API Tutorial", month="dec", language="en-US"):
    year = extract_year_from_url(url)
    bibtex_entry = f"""
@misc{{noauthor_{title.lower().replace(" ", "")}{index}_{year},
    title = {{{title}}},
    url = {{{url}}},
    abstract = {{REST is an acronym for REpresentational State Transfer. It is an architectural style for hypermedia systems and was first presented by Roy Fielding.}},
    language = {{{language}}},
    urldate = {{{date.today().strftime('%Y-%m-%d')}}},
    journal = {{{journal}}},
    month = {month},
    year = {{{year}}},
    file = {{Snapshot:C:\\\\Users\\\\pippo\\\\Zotero\\\\storage\\\\R8AQE67N\\\\{url.split('//')[1]}.html:text/html}},
}}
"""
    return bibtex_entry

# Funktion zum Erstellen einer BibTeX-Datei aus den Links
def generate_bibtex_from_links(input_txt_path, output_bibtex_path):
    with open(input_txt_path, 'r') as file:
        links = file.readlines()

    with open(output_bibtex_path, 'w') as bibtex_file:
        for index, url in enumerate(links, start=1):
            url = url.strip()  # Entfernen von Leerzeichen und Zeilenumbrüchen
            if url:  # Falls der Link nicht leer ist
                bibtex_entry = create_bibtex_entry(url, index)
                bibtex_file.write(bibtex_entry)
                bibtex_file.write("\n\n")  # Leerzeile zwischen den Einträgen

# Beispiel: Pfad zu der TXT-Datei und zum Output-BibTeX-File
input_txt_path = 'links.txt'  # Dein TXT-Dateipfad
output_bibtex_path = 'output.bib'  # Ausgabedatei für BibTeX

# Rufe die Funktion auf
generate_bibtex_from_links(input_txt_path, output_bibtex_path)