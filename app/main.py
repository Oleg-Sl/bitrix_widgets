from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager

from app.api.routers import all_routers


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield


def get_application() -> FastAPI:
    application = FastAPI(
        title="PROJECT_NAME",
        debug=True,
        version="1.0.0",
        root_path="/widgets",
        lifespan=lifespan
    )

    application.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    return application


app = get_application()


for router in all_routers:
    app.include_router(router)


app.mount("/static", StaticFiles(directory="app/static"), name="static")


@app.get("/")
async def test():
    print('Request')
    return {"test": 111}


# python app.py
# backend\venv\Scripts\activate.bat
# uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload --log-level debug
# uvicorn app.main:app --host 0.0.0.0 --port 8888 --reload --log-level debug
