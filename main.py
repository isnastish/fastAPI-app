import time
# import sqlite3
# from pathlib import Path
from typing import Optional, TypedDict, TYPE_CHECKING

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from starlette.templating import Jinja2Templates
from starlette.staticfiles import StaticFiles
from pydantic import BaseModel 

# unused import
from sqlmodel import Field

from loguru import logger

# if TYPE_CHECKING:
#     from sqlite3 import Connection, Cursor

app = FastAPI(
    debug=True,
    title="TestApplication",
)

templates = Jinja2Templates(directory="templates")

app.mount("/static", StaticFiles(directory="static"), name="static")

# app.mount("/static/assets", StaticFiles(directory="static"), name="static")
# TODO(al): Group assignments into its own blueprint and lessons as well, 
# then bind those blueprints to the main class 

@app.middleware("http")
async def app_middleware(request: Request, call_next):
    logger.debug("middleware function is executed")

    start_time = time.perf_counter()
    response = await call_next(request)
    elapsed_time = time.perf_counter() - start_time
    # return response header prefixed with x- (to signify a custom header)
    response.headers["x-elapsed-time"] = str(elapsed_time)
    return response

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
        
        @self._fast_api_app.get("/")
        async def root():
            return {"hello": "root"}

        # the rest could be done the same way
            

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

@app.get("/project", response_class=HTMLResponse)
async def read_project(request: Request):
    logger.debug({"method": request.method, "base_url": request.base_url})

    return templates.TemplateResponse(
        request=request, name="project_index.html", context={},
        headers={
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0",
            "content-type": "text/html",
        }
    )

###########################################################
# Render assignment
###########################################################
@app.get("/project/index", )
async def render_project_home_page(request: Request):
    return templates.TemplateResponse(
        request=request, name="app/index.html", context={},
        headers={
            'Content-Type': 'text/html',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    )


@app.get("/lessons/create-element", response_class=HTMLResponse)
async def lessons_create_or_insert_element(req: Request):
    logger.debug({"method": req.method, "base_url": req.base_url})
    title: str = "Creating or Inserting HTML elements"

    return templates.TemplateResponse(
        request=req, name="create_or_insert_element.html",
        context={
            "Title": title, 
            "H1Tag": title, 
        }
    )
     
@app.get("/assignments/add-element", response_class=HTMLResponse)
async def assignments_add_element(req: Request):
    logger.debug({"method": req.method, "base_url": req.base_url})

    return templates.TemplateResponse(
        request=req, name="assignment_adding_elements.html",
        context={}
    )

    
@app.get("/assignments/dom-selection", response_class=HTMLResponse)
async def parse_dom_endpoint(request: Request):
    logger.debug({"method": request.method, "base_url": request.base_url})
    return templates.TemplateResponse(
        request=request, name="selecting_dom_elements.html", context={
            "Title": "Exercise for selecting DOM elements"
        }
    )

@app.get("/assignments/dom-manipulation", response_class=HTMLResponse)
async def dom_manipulation_assignment_endpoint(request: Request):
    logger.debug({"method": request.method, "base_url": request.base_url}) 

    title = "Assignment - DOM Querying & Manipulation"

    return templates.TemplateResponse(
        request=request, name="dom_index.html", 
        context={
            "Title": title,
        },
    )


@app.get("/assignments/adding-elements", response_class=HTMLResponse)
async def assignment_add_elements(req: Request):
    logger.debug({"method": req.method, "base_url": req.base_url}) 

    return templates.TemplateResponse(
        request=req, name="adding_elements.html", 
        context={
            "Title": "Adding Elements",
            "SectionHeading": "My custom section heading",
        },
    )


@app.get("/html/{id}", response_class=HTMLResponse)
async def read_html(request: Request, id: str):
    """_summary_
    Args:
        request (Request): _description_
    Returns:
        _type_: _description_
    """
    # NOTE: Experimenting with Request class 
    logger.debug({"method": request.method, "base_url": request.base_url, 
                  "scope": request.scope})

    return templates.TemplateResponse(
        request=request, name="index.html", context={"id": id},
        headers={
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0",
            "content-type": "text/html",
        }
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