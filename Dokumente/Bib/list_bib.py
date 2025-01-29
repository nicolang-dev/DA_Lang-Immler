import re

# Funktion zum Einlesen der .bib-Datei und Extrahieren der Schlüssel
def extract_keys_from_bib(bib_file):
    keys_list = []
    
    # Öffnen der .bib-Datei zum Lesen
    with open(bib_file, 'r', encoding='utf-8') as file:
        content = file.read()
        
        # Suche nach jedem Eintrag und extrahiere den Schlüssel
        matches = re.findall(r'@\w+\{([^\}]+),', content)
        keys_list.extend(matches)
    
    return keys_list

# Funktion zum Schreiben der Schlüssel in eine .txt-Datei
def write_keys_to_txt(keys, txt_file):
    with open(txt_file, 'w', encoding='utf-8') as txt:
        for key in keys:
            txt.write(f"\\parencite[vgl.][]{{{key}}}\n")

# Beispielaufruf des Scripts
bib_file = 'zitate_pi.bib'  # Name deiner .bib-Datei
txt_file = 'schluessel_liste.txt'  # Name der Ziel-Text-Datei

# Schlüssel extrahieren und in die .txt-Datei schreiben
keys = extract_keys_from_bib(bib_file)
write_keys_to_txt(keys, txt_file)

print(f"Die Schlüssel wurden erfolgreich in {txt_file} geschrieben.")