import os

# Funktion, die den Inhalt aller Dateien in einem Ordner und dessen Unterordnern ausgibt
def save_files_content_to_output_dir(input_dir, output_file):
    with open(output_file, 'w', encoding='utf-8') as output:
        # Durchlaufe alle Dateien und Ordner im angegebenen Verzeichnis
        for root, dirs, files in os.walk(input_dir):
            for file in files:
                # Nur Textdateien oder spezifische Dateitypen können verarbeitet werden
                file_path = os.path.join(root, file)
                
                # Nur den Dateinamen (ohne Pfad) ausgeben
                file_name = os.path.basename(file_path)
                
                # Dateiname und Inhalt in die Ausgabedatei schreiben
                output.write(f"\\textbf{{{file_name}:}}\n")
                output.write("\\begin{lstlisting} \n")
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    output.write(f.read())
                output.write("\n\\end{lstlisting}")
                output.write("\n\n")  # Füge einen Abstand zwischen den Dateien hinzu

# Beispiel: Verzeichnis und Ausgabedatei definieren
input_directory = 'C:\\Users\pippo\OneDrive\Dokumente\GitHub\DA_Lang-Immler\Dokumente\Code_Anhang\MSA'  # Pfad zum Ordner
output_file = 'C:\\Users\pippo\OneDrive\Dokumente\GitHub\DA_Lang-Immler\Dokumente\Code_Anhang\msa_extracted_code.txt'  # Pfad zur Ausgabedatei

# Funktion aufrufen
save_files_content_to_output_dir(input_directory, output_file)