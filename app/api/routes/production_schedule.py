import logging
import pathlib
from typing import Annotated

from fastapi import APIRouter, Request, Query, Form
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel, ConfigDict, Field, Json
from app.schemas.credentials import CredentialsFormSchema


router = APIRouter(
    prefix="/production-schedule",
    tags=["Smartprocess Graphics Production"],
)

templates = Jinja2Templates(directory="app/templates/production_schedule")


pathlib.Path("logs").mkdir(parents=True, exist_ok=True)
logging.basicConfig(level=logging.INFO, filename="logs/production_schedule.log",
                    format="%(asctime)s %(levelname)s %(message)s")


@router.post("/update-stages")
async def update_stages(
    request: Request,
    PLACEMENT_OPTIONS: Annotated[Json[dict], Form()],
):
    element_id = PLACEMENT_OPTIONS.get("ID")

    return templates.TemplateResponse(
        request=request,
        name="update_stages.html",
        context={
            "element_id": element_id
        }
    )
    

# @router.get("/run-bp-update-stages")
# async def run_bp(request: Request, data: Form) -> HTMLResponse:
#     content_type = request.headers.get("content-type", "")
#     if content_type == 'application/json':
#         pass
#     elif  content_type == '' or content_type == 'multipart/form-data':
#         pass

#     logging.info({
#         'headers': request.headers,
#         'get_params': dict(request.query_params),
#         'body': ''
#     })

#     return templates.TemplateResponse(request=request, name="update_stages.html")

# @router.post("/run-bp-update-stages")
# async def run_bp(request: Request) -> HTMLResponse:
#     return templates.TemplateResponse(request=request, name="update_stages.html")

