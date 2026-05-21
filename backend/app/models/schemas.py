from pydantic import BaseModel, Field
from typing import List

class CurrencySchema(BaseModel):
    code: str
    codein: str
    name: str
    high: float
    low: float
    bid: float
    pct_change: float = Field(alias="pctChange")
    create_date: str

    class Config:
        populate_by_name = True

class CurrencyListResponse(BaseModel):
    currencies: List[CurrencySchema]
    updated_at: str