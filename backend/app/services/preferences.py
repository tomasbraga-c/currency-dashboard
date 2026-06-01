from pathlib import Path
import json

BASE_DIR = Path(__file__).parent.parent.parent
PREFERENCES_FILE = BASE_DIR / "preferences.json"

def read_preferences():
    if not PREFERENCES_FILE.exists():
        return {}
    with open(PREFERENCES_FILE, "r") as f:
        return json.load(f)
    
def save_preferences(data: dict) -> None:
    with open(PREFERENCES_FILE, "w") as f:
        json.dump(data, f, indent=4)

def get_preference(email: str) -> dict | None:
    preferences = read_preferences()
    users = preferences.get("users", [])
    for user in users:
        if user.get("email") == email:
            return user
    return None

def upsert_preference(email: str, currencies: list, cryptos: list) -> dict:
    preferences = read_preferences()
    users = preferences.get("users", [])

    for user in users:
        if user.get("email") == email:
            user["currencies"] = currencies
            user["cryptos"] = cryptos
            save_preferences(preferences)
            return user
    new_user = {
        "email": email,
        "currencies": currencies,
        "cryptos": cryptos
    }
    users.append(new_user)
    preferences["users"] = users
    save_preferences(preferences)
    return new_user

def get_all_preferences() -> list:
    preferences = read_preferences()
    return preferences.get("users", [])