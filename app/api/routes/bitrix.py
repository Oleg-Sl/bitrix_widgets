import logging
import pathlib
from typing import Annotated
from fastapi import APIRouter, Request, Query, Form
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel, ConfigDict, Field

from app.schemas.credentials import CredentialsFormSchema


router = APIRouter(
    prefix="/bitrix",
    tags=["Bitrix"],
)

templates = Jinja2Templates(directory="app/templates")

pathlib.Path("logs").mkdir(parents=True, exist_ok=True)
logging.basicConfig(level=logging.INFO, filename="logs/bitrix.log",
                    format="%(asctime)s %(levelname)s %(message)s")


@router.post("/index", response_class=HTMLResponse)
async def index(request: Request) -> HTMLResponse:
    return templates.TemplateResponse(request=request, name="index.html")


@router.post("/install", response_class=HTMLResponse)
async def install(
    request: Request,
    DOMAIN: Annotated[str, Query()],
    data: Annotated[CredentialsFormSchema, Form()]
) -> HTMLResponse:
    return templates.TemplateResponse(request=request, name="install.html")
