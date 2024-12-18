from string import ascii_lowercase, ascii_uppercase, punctuation, digits
import random
import scrypt
from secrets import token_bytes

def generate_password_hash(password):
    salt = token_bytes(16)
    hash = scrypt.hash(password, salt, N=16384, r=8, p=1)
    return f"{salt.hex()}:{hash.hex()}"

usable_chars = ascii_lowercase + ascii_uppercase + digits
usable_password_chars = ascii_lowercase + ascii_uppercase + punctuation + digits

with open("users.txt", "r", encoding="utf-8") as f:
    users = []
    for line in f.readlines():
        users.append(line[:-1])

with open("users.sql", "w", encoding="utf-8") as f:
    header_str = "INSERT INTO users(username, name, email, password, verified, permission_level) VALUES"
    values = []
    for name in users:
        email = f"{"".join(random.choices(usable_chars, k=random.randint(6, 12)))}@example.edu.vn"
        username = "".join(random.choices(usable_chars, k=random.randint(6, 32)))
        password = "".join(random.choices(usable_password_chars, k=random.randint(8, 24)))
        hashed_password = generate_password_hash(password)
        values.append(f'("{username}", "{name}", "{email}", "{hashed_password}", 1, 1)')
    f.write("\n".join([header_str, ",\n".join(values)]))