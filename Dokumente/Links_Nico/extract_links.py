import fitz  # PyMuPDF
import re  # Reguläre Ausdrücke, um nach URLs zu suchen

def extract_links_from_pdf(pdf_path, output_txt_path):
    # Öffnen des PDF-Dokuments
    document = fitz.open(pdf_path)

    # Regulärer Ausdruck, um URLs zu erkennen
    url_pattern = re.compile(r'https?://[^\s]+')

    links = []

    # Schleife durch jede Seite im PDF
    for page_num in range(len(document)):
        page = document.load_page(page_num)

        # Extrahiere den gesamten Text der Seite (inklusive Leerzeichen und Zeilenumbrüche)
        text = page.get_text("text")

        # Die Zeichenkette durchgehen und nach URLs suchen
        # Alle Zeilen zusammenführen, da Links über mehrere Zeilen gehen können
        lines = text.split("\n")  # Text in Zeilen aufteilen

        full_text = ""
        for line in lines:
            full_text += line.strip() + " "  # Entferne führende/folgenden Leerzeichen und füge Leerzeichen hinzu

        # Suche nach URLs im zusammengeführten Text
        found_links = re.findall(url_pattern, full_text)

        # Füge gefundene Links der Liste hinzu
        links.extend(found_links)

    # Entferne Duplikate (falls nötig)
    unique_links = set(links)

    # Schreibe die Links in eine Textdatei
    with open(output_txt_path, 'w') as output_file:
        for link in unique_links:
            output_file.write(f"{link}\n")

# Beispiel: Pfad zum PDF-Dokument und zum Output-TXT-File
pdf_path = 'da.pdf'  # Dein PDF-Dateipfad
output_txt_path = 'links.txt'  # Ausgabedatei für Links

# Rufe die Funktion auf
extract_links_from_pdf(pdf_path, output_txt_path)