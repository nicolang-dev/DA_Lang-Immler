import os
import requests
from datetime import datetime
from bs4 import BeautifulSoup

def generate_bibtex_key(url, index):
    return f"noauthor_urlnl{index:02d}_{datetime.now().year}"

def fetch_metadata(url):
    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        
        title = soup.title.string if soup.title else "Unknown Title"
        return title
    except Exception as e:
        print(f"Fehler beim Abrufen der URL {url}: {e}")
        return "Unknown Title"

def write_bib_file(input_txt, output_bib):
    with open(input_txt, 'r', encoding='utf-8') as file:
        links = [line.strip() for line in file.readlines() if line.strip()]
    
    with open(output_bib, 'w', encoding='utf-8') as bib_file:
        for i, link in enumerate(links, start=1):
            bib_key = generate_bibtex_key(link, i)
            title = fetch_metadata(link)
            
            bib_entry = f"""
@misc{{{bib_key},
    title = {{{title}}},
    url = {{{link}}},
    language = {{de}},
    urldate = {{{datetime.now().strftime('%Y-%m-%d')}}},
    year = {{{datetime.now().year}}},
}}
"""
            bib_file.write(bib_entry)
    
if __name__ == "__main__":
    input_txt = "links.txt"  # Hier den Namen der Eingabedatei anpassen
    output_bib = "output.bib"
    write_bib_file(input_txt, output_bib)
    print(f"BibTeX-Datei '{output_bib}' wurde erfolgreich erstellt.")