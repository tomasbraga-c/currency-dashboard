from app.services.supabase_client import supabase


def get_preference(email: str) -> dict | None:
    response = (
        supabase.table("subscribers")
        .select("*")
        .eq("email", email)
        .eq("active", True)
        .execute()
    )
    if response.data:
        return response.data[0]
    return None


def get_all_preferences() -> list:
    response = (
        supabase.table("subscribers")
        .select("*")
        .eq("active", True)
        .execute()
    )
    return response.data


def upsert_preference(email: str, currencies: list, cryptos: list) -> dict:
    existing = (
        supabase.table("subscribers")
        .select("*")
        .eq("email", email)
        .execute()
    )

    if existing.data:
        response = (
            supabase.table("subscribers")
            .update({
                "currencies": currencies,
                "cryptos": cryptos,
                "active": True
            })
            .eq("email", email)
            .execute()
        )
    else:
        response = (
            supabase.table("subscribers")
            .insert({
                "email": email,
                "currencies": currencies,
                "cryptos": cryptos
            })
            .execute()
        )

    return response.data[0]


def deactivate_preference(email: str) -> bool:
    response = (
        supabase.table("subscribers")
        .update({"active": False})
        .eq("email", email)
        .execute()
    )
    return bool(response.data)