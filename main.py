from typing import Optional
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from starlette.templating import Jinja2Templates
from starlette.staticfiles import StaticFiles
from pydantic import BaseModel 
from loguru import logger


app = FastAPI()

templates = Jinja2Templates(directory="templates")

app.mount("/static", StaticFiles(directory="static"), name="static")


class App:
    """App's main class"""

    def __init__(self, *, static_dir: Optional[str] = None) -> None:
        self._fast_api_app = FastAPI()
        self._templates = Jinja2Templates(directory="templates")

        if static_dir:
            if static_dir.startswith("/"):
                # NOTE: Maybe name could be an arbitrary name
                static_dir = static_dir.removeprefix("/")
            self._fast_api_app.mount("/" + static_dir, StaticFiles(directory=static_dir), name=static_dir)


class Item(BaseModel):
    name: str
    desc: str | None = None
    price: float
    tax: float | None = None


@app.get("/")
async def read_root() -> dict[str, str]:
    """_summary_
    Returns:
        dict[str, str]: _description_
    """
    return {"hello": "world"} 


@app.get("/html", response_class=HTMLResponse)
async def read_html(request: Request):
    """_summary_
    Args:
        request (Request): _description_
    Returns:
        _type_: _description_
    """
    return templates.TemplateResponse(
        request=request, name="index.html", context={},
    )


# NOTE: All the parameters that are not specified in route string
# are considered as query parameters
@app.get("/items/{item_id}")
async def read_item(item_id: int, query: str | None = None):
    """_summary_
    Args:
        item_id (int): _description_
        query (str | None, optional): _description_. Defaults to None.

    Returns:
        _type_: _description_
    """
    if query:
        return {"item_id": item_id, "q": query}
    else:
        return {"item_id": item_id}


@app.post("/items/post")
async def create_item(item: Item):
    logger.debug({"item": item})
    return item