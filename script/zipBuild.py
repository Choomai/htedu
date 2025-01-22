import os
from zipfile import ZipFile, ZIP_STORED

def zipdir(path, ziph):
    for root, _, files in os.walk(path):
        for file in files:
            file_path = os.path.join(root, file)
            zip_path = os.path.relpath(file_path, path)
            print(f"adding: {zip_path}")
            ziph.write(file_path, zip_path)

print("Archive:  build.zip")
zipf = ZipFile("build.zip", "w", ZIP_STORED)
zipdir("build/", zipf)

for file in ["package.json", "package-lock.json"]:
    print(f"adding: {file}")
    zipf.write(file)
zipf.close()