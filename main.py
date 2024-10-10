import time
import sqlite3
from pathlib import Path
from typing import Optional, TypedDict, TYPE_CHECKING

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from starlette.templating import Jinja2Templates
from starlette.staticfiles import StaticFiles
from pydantic import BaseModel 

from loguru import logger

if TYPE_CHECKING:
    from sqlite3 import Connection, Cursor


app = FastAPI(
    debug=True,
    title="TestApplication",
)

templates = Jinja2Templates(directory="templates")

app.mount("/static", StaticFiles(directory="static"), name="static")


class HttpCacheDict(TypedDict):
    path: str
    method: str 
    timestamp: int

    
# NOTE: This class has to be moved to the server
class HTTPCache:
    """Cache for http requests"""

    def __init__(self) -> None:
        cache_file = Path("storage-cache.sqlite")
        self.conn: "Connection" = sqlite3.connect(
            cache_file.as_posix(), 
            isolation_level=None,
        )

        # Create an sql file locally, on disc
        self.conn.execute(
            """CREATE TABLE IF NOT EXISTS http_cache (
                id INTEGER PRIMARY KEY,
                path TEXT,
                method VARCHAR(32),
                timestamp INTEGER
            )
            """
        )

        # TODO: Figure out why do we have to create an index
        # CREATE INDEX IF NOT EXISTS idx_timestamp ON cache (timestamp)
    
    def add(self, path: str, method: str) -> None:
        timestamp = int(time.time())
        self.conn.execute(
            "INSERT OR REPLACE INTO http_cache (path, method, timestamp) VALUES (?, ?, ?)", (path, method, timestamp),
        )
    
    def get_all(self) -> HttpCacheDict: 
        cursor: "Cursor" = self.conn.execute(
            "SELECT path, method, timestamp FROM http_cache"
        )
        row = cursor.fetchone()
        _ = row

        return HttpCacheDict()


cache = HTTPCache()

@app.middleware("http")
async def app_middleware(request: Request, call_next):
    logger.debug("middleware function is executed")

    # cache HTTP request
    cache.add(str(request.url), request.method)
    # cache.get_all()

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