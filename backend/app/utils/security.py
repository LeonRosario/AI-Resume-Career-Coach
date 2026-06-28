from passlib.context import CryptContext

# Use sha256_crypt as bcrypt fallback when bcrypt version mismatch occurs
try:
    from passlib.handlers.bcrypt import bcrypt
    bcrypt.using(rounds=4).hash("test")  # probe
    _schemes = ["bcrypt"]
except Exception:
    _schemes = ["sha256_crypt"]

pwd_context = CryptContext(schemes=_schemes, deprecated="auto")


def hash_password(plain: str) -> str:
    return pwd_context.hash(plain)


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)
