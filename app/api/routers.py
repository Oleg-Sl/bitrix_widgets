from app.api.routes.bitrix import router as router_bitrix
from app.api.routes.production_schedule import router as router_production_schedule


all_routers = [
    router_bitrix,
    router_production_schedule,
]
