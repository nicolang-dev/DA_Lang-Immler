import fitz  # PyMuPDF
import requests

# Funktion, um alle Links aus einem PDF zu extrahieren und zu überprüfen, ob sie erreichbar sind
def extract_links_from_pdf(pdf_path, txt_output_path):
    # Öffne das PDF-Dokument
    document = fitz.open(pdf_path)
    
    # Set, um alle einzigartigen Links zu speichern (Duplikate werden automatisch entfernt)
    links = set()
    unreachable_links = set()

    # Iteriere über jede Seite im Dokument
    for page_num in range(len(document)):
        page = document.load_page(page_num)
        
        # Extrahiere Links von der Seite
        page_links = page.get_links()
        
        # Füge alle gefundenen Links zur Set hinzu
        for link in page_links:
            uri = link.get('uri', None)
            if uri:
                links.add(uri)

    # Prüfe, ob die Links erreichbar sind
    for link in links:
        try:
            response = requests.get(link, timeout=5)
            if response.status_code != 200:
                unreachable_links.add(link)
        except requests.exceptions.RequestException:
            # Falls eine Ausnahme (z.B. Verbindungsfehler) auftritt, als unerreichbar markieren
            unreachable_links.add(link)

    # Schreibe die einzigartigen Links und die unerreichbaren Links in eine Textdatei
    with open(txt_output_path, 'w') as file:
        file.write("Erreichbare Links:\n")
        for link in sorted(links - unreachable_links):  # Links, die erreichbar sind
            file.write(link + '\n')
        
        file.write("\nUnerreichbare Links:\n")
        for link in sorted(unreachable_links):  # Links, die nicht erreichbar sind
            file.write(link + '\n')

    print(f'Links wurden überprüft und in die Datei {txt_output_path} geschrieben.')

# Beispielaufruf
pdf_path = "DA-Main.pdf"  # Pfad zum PDF
txt_output_path = "links.txt"  # Pfad zur Ausgabedatei

extract_links_from_pdf(pdf_path, txt_output_path)
